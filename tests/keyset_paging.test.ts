import { QueryContext } from '../model/request_context';
import { FamisClient } from '../famis_client';

function params(url: string) {
  return new URL(`http://example.com/${url}`).searchParams;
}

describe('QueryContext.buildKeysetUrl', () => {
  it('forces $orderby=Id and appends the half-open Id bounds to the base filter', () => {
    const ctx = new QueryContext()
      .setSelect('Id,Name')
      .setExpand('Space')
      .setFilter('ActiveFlag eq true');
    const p = params(ctx.buildKeysetUrl('assets', 1000, 100, 200));
    expect(p.get('$top')).toEqual('1000');
    expect(p.get('$orderby')).toEqual('Id');
    expect(p.get('$select')).toEqual('Id,Name');
    expect(p.get('$expand')).toEqual('Space');
    expect(p.get('$filter')).toEqual('(ActiveFlag eq true) and Id gt 100 and Id le 200');
    expect(p.get('$skip')).toBeNull();
  });

  it('uses only the Id bounds when no base filter is set', () => {
    const p = params(new QueryContext().buildKeysetUrl('assets', 500, 0, 50));
    expect(p.get('$filter')).toEqual('Id gt 0 and Id le 50');
  });

  it('parenthesizes an `or` base filter so the Id bounds bind to the whole filter', () => {
    // Without the parens this would be `A or B and Id gt.. and Id le..`, which OData
    // parses as `A or (B and ..)` — rows matching A would ignore the Id range.
    const ctx = new QueryContext().setFilter('PropertyId eq 1 or PropertyId eq 2');
    const p = params(ctx.buildKeysetUrl('assets', 1000, 100, 200));
    expect(p.get('$filter')).toEqual(
      '(PropertyId eq 1 or PropertyId eq 2) and Id gt 100 and Id le 200',
    );
  });
});

describe('QueryContext.buildKeysetBoundUrl', () => {
  it('builds a 1-row Id probe (asc = min, desc = max) carrying the base filter', () => {
    const ctx = new QueryContext().setFilter('ActiveFlag eq true');
    const min = params(ctx.buildKeysetBoundUrl('assets', false));
    expect(min.get('$top')).toEqual('1');
    expect(min.get('$orderby')).toEqual('Id');
    expect(min.get('$select')).toEqual('Id');
    expect(min.get('$filter')).toEqual('ActiveFlag eq true');
    const max = params(ctx.buildKeysetBoundUrl('assets', true));
    expect(max.get('$orderby')).toEqual('Id desc');
  });
});

// Adapter that answers keyset + bound probes from an in-memory Id list. Mirrors the real
// server contract: a page returns up to $top matching rows; getAllBatchKeyset's cursor loop
// (famis_client.ts) only continues within a range when a response comes back exactly $top long,
// so genuinely exercising that loop requires a partition that holds more than $top (1000) ids —
// not an artificial per-call cap unrelated to $top (which would just truncate results and drop
// data, since the client has no independent knowledge of such a cap).
function installKeysetAdapter(client: FamisClient, ids: number[]) {
  const sorted = [...ids].sort((a, b) => a - b);
  let maxInFlight = 0, inFlight = 0;
  (client.http.defaults as any).adapter = async (config: any) => {
    inFlight++; maxInFlight = Math.max(maxInFlight, inFlight);
    await new Promise((r) => setTimeout(r, 5)); // force overlap so the cap is observable
    const sp = new URL(`http://h/${config.url}`).searchParams;
    const top = Number(sp.get('$top'));
    const filter = sp.get('$filter') ?? '';
    const desc = (sp.get('$orderby') ?? '') === 'Id desc';
    let rows: { Id: number }[];
    if (top === 1) {
      rows = [{ Id: desc ? sorted[sorted.length - 1] : sorted[0] }];
    } else {
      const gt = Number(/Id gt (\d+)/.exec(filter)?.[1]);
      const le = Number(/Id le (\d+)/.exec(filter)?.[1]);
      rows = sorted.filter((id) => id > gt && id <= le).slice(0, top).map((Id) => ({ Id }));
    }
    inFlight--;
    return { data: { value: rows }, status: 200, statusText: 'OK', headers: {}, config, request: {} };
  };
  return { getMaxInFlight: () => maxInFlight };
}

describe('FamisClient.getAllBatchKeyset', () => {
  const HOST = 'https://h.example.com';
  const make = () => FamisClient.withAccessToken({ token: 't', host: HOST });

  it('delivers every row exactly once across ranges (parity), with sparse gaps', async () => {
    const client = make();
    const sparse = [1, 2, 3, 50, 51, 900, 901, 5000, 9999]; // gaps + clustering
    // A dense cluster of 1500 consecutive ids, placed high enough (30001..31500) that it lands
    // entirely inside a single keyset partition. Since $top is 1000, the first page for that
    // partition fills exactly 1000 rows (a "full page"), which is the only condition under
    // which getAllBatchKeyset's cursor loop continues (famis_client.ts: `if (rows.length < top)
    // break`) — so this genuinely drives a 2-page fetch (1000 then 500) for that range, unlike
    // the sparse ids alone which each resolve in a single under-$top page.
    const dense = Array.from({ length: 1500 }, (_, i) => 30001 + i);
    const ids = [...sparse, ...dense];
    installKeysetAdapter(client, ids);
    const got: number[] = [];
    await client.getAllBatchKeyset(
      new QueryContext().setSelect('Id'),
      'assets',
      (resp) => got.push(...resp.value.map((r: any) => r.Id)),
    );
    expect(got.sort((a, b) => a - b)).toEqual([...ids].sort((a, b) => a - b));
  });

  it('never exceeds 4 concurrent requests', async () => {
    const client = make();
    const ids = Array.from({ length: 2000 }, (_, i) => i + 1);
    const { getMaxInFlight } = installKeysetAdapter(client, ids);
    await client.getAllBatchKeyset(new QueryContext().setSelect('Id'), 'assets', () => {});
    expect(getMaxInFlight()).toBeLessThanOrEqual(4);
  });

  it('returns without calling back on an empty set', async () => {
    const client = make();
    installKeysetAdapter(client, []);
    const cb = jest.fn();
    await client.getAllBatchKeyset(new QueryContext().setSelect('Id'), 'assets', cb);
    expect(cb).not.toHaveBeenCalled();
  });
});

describe('getAllAssetsBatch paging opt-in', () => {
  const HOST = 'https://h.example.com';
  function recordUrls(client: FamisClient, count = 0) {
    const urls: string[] = [];
    (client.http.defaults as any).adapter = async (config: any) => {
      urls.push(config.url);
      const sp = new URL(`http://h/${config.url}`).searchParams;
      const rows = Number(sp.get('$top')) === 1 ? [{ Id: 1 }] : [];
      return { data: { value: rows, '@odata.count': count }, status: 200, statusText: 'OK', headers: {}, config, request: {} };
    };
    return urls;
  }

  it('defaults to the $skip path (unchanged behavior)', async () => {
    const client = FamisClient.withAccessToken({ token: 't', host: HOST });
    const urls = recordUrls(client, 0);
    await client.getAllAssetsBatch(new QueryContext().setSelect('Id'), () => {});
    expect(urls[0]).toContain('$skip=0');
    expect(urls.join()).not.toContain('Id gt');
  });

  it('uses keyset when paging: "keyset"', async () => {
    const client = FamisClient.withAccessToken({ token: 't', host: HOST });
    const urls = recordUrls(client, 0);
    await client.getAllAssetsBatch(new QueryContext().setSelect('Id'), () => {}, { paging: 'keyset' });
    expect(urls.some((u) => u.includes('$orderby=Id') && u.includes('$top=1'))).toBe(true); // bound probe
    expect(urls.join()).not.toContain('$skip=');
  });
});
