# Assets keyset parallel paging — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an opt-in keyset (Id-range-partitioned) parallel paging mode to the SDK's assets batch fetch, ~2–2.6× faster than the current `$skip` OFFSET paging on large tenants.

**Architecture:** New `QueryContext.buildKeysetUrl` / `buildKeysetBoundUrl` helpers + a new `FamisClient.getAllBatchKeyset` that fetches `min(Id)`/`max(Id)`, splits the Id space into K half-open ranges, and pages each range with `Id gt <cursor> and Id le <hi>` under the **same 4-way** Bottleneck pool. `getAllAssetsBatch` gains an optional `{ paging }` arg (default `'skip'` = today's behavior).

**Tech Stack:** TypeScript, axios 0.21, axios-retry, Bottleneck, jest. Source at repo root (`famis_client.ts`, `model/request_context.ts`); tests in `tests/`. `npm test` = jest.

## Global Constraints

- **Shared SDK — purely additive / opt-in.** `facility360` is consumed by the connector AND facility360 mobile + demoio integrations/assistants. Existing `getAllBatch` and `getAllAssetsBatch(context, callback)` behavior must be **byte-identical** for current callers. Keyset is reached ONLY via the new optional `paging: 'keyset'` arg; default is `'skip'`.
- **No concurrency increase.** The keyset worker pool uses `new Bottleneck({ maxConcurrent: 4 })` — identical to `getAllBatch`. K (partition count) is granularity for load-balancing, NOT concurrency; ≤4 requests in flight at any time.
- **Correctness:** every keyset page sets `$orderby=Id` (the cursor assumes each page's last row is the current max Id); ranges are half-open `Id gt lo and Id le hi`; `Id` is the entity PK (unique) so no drop/dup.
- **Endpoint requirement:** only needs `Id gt` in `$filter` — live on the FAMIS `assets` endpoint today (verified 2026-07-17). Reference endpoints are NOT keyset yet; out of scope.
- **Node >= 20.** Bump SDK version to **1.4.0** (minor: additive feature).

---

## File Structure

- **Modify** `model/request_context.ts` — add `buildKeysetUrl(entity, top, gt, le)` and `buildKeysetBoundUrl(entity, desc)`.
- **Modify** `famis_client.ts` — add `KEYSET_PARTITIONS` const, `getAllBatchKeyset<T>(context, type, callback)`, and an optional `opts` arg on `getAllAssetsBatch`.
- **Create** `tests/keyset_paging.test.ts` — URL-builder unit tests + a synthetic-dataset adapter test proving row parity, concurrency cap, and default-skip behavior.
- **Modify** `package.json` — version 1.3.0 → 1.4.0.
- **Follow-on (connector repo `facility360_r7`, separate)** — Task 6 notes; not built here.

---

### Task 1: QueryContext keyset URL builders

**Files:**
- Modify: `model/request_context.ts` (add two methods near `buildPagedUrl`, ~line 75)
- Test: `tests/keyset_paging.test.ts`

**Interfaces:**
- Produces:
  - `buildKeysetUrl(entity: string, top: number, gt: number, le: number): string`
  - `buildKeysetBoundUrl(entity: string, desc: boolean): string`
- Consumes: existing private `basePath`, `this.filter`, `this.select`, `this.expand`.

- [ ] **Step 1: Write the failing tests**

```typescript
// tests/keyset_paging.test.ts
import { QueryContext } from '../model/request_context';

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
    expect(p.get('$filter')).toEqual('ActiveFlag eq true and Id gt 100 and Id le 200');
    expect(p.get('$skip')).toBeNull();
  });

  it('uses only the Id bounds when no base filter is set', () => {
    const p = params(new QueryContext().buildKeysetUrl('assets', 500, 0, 50));
    expect(p.get('$filter')).toEqual('Id gt 0 and Id le 50');
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
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx jest tests/keyset_paging.test.ts -t buildKeyset`
Expected: FAIL — `buildKeysetUrl is not a function`.

- [ ] **Step 3: Implement the two methods**

Add to `model/request_context.ts` inside the `QueryContext` class (after `buildPagedUrl`). `basePath` is the module const already used by `buildPagedUrl`.

```typescript
  /**
   * Keyset page URL: forces $orderby=Id and appends half-open Id bounds to the base
   * filter (Id gt <gt> and Id le <le>). No $skip. See docs/.../assets-keyset-parallel-paging.
   */
  buildKeysetUrl(entity: string, top: number, gt: number, le: number) {
    const bounds = `Id gt ${gt} and Id le ${le}`;
    const filter = this.filter ? `${this.filter} and ${bounds}` : bounds;
    let urlPath = `${basePath}/${entity}?$top=${top}&$orderby=Id&$filter=${filter}`;
    if (this.expand) urlPath += `&$expand=${this.expand}`;
    if (this.select) urlPath += `&$select=${this.select}`;
    return urlPath;
  }

  /** One-row Id probe to find min (desc=false) / max (desc=true), carrying the base filter. */
  buildKeysetBoundUrl(entity: string, desc: boolean) {
    let urlPath = `${basePath}/${entity}?$top=1&$orderby=Id${desc ? ' desc' : ''}&$select=Id`;
    if (this.filter) urlPath += `&$filter=${this.filter}`;
    return urlPath;
  }
```

- [ ] **Step 4: Run to verify they pass**

Run: `npx jest tests/keyset_paging.test.ts -t buildKeyset`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add model/request_context.ts tests/keyset_paging.test.ts
git commit -m "feat(keyset): QueryContext.buildKeysetUrl + buildKeysetBoundUrl"
```

---

### Task 2: FamisClient.getAllBatchKeyset

**Files:**
- Modify: `famis_client.ts` (add `KEYSET_PARTITIONS` const near the other module consts; add `getAllBatchKeyset` near `getAllBatch`, ~line 1883)
- Test: `tests/keyset_paging.test.ts`

**Interfaces:**
- Consumes: `QueryContext.buildKeysetUrl`/`buildKeysetBoundUrl` (Task 1); existing `this.http`, `this.requestConfig(context)`, `this.throwResponseError`, `Bottleneck`.
- Produces: `getAllBatchKeyset<T extends { Id: number }>(context: QueryContext, type: string, callback: ResultCallback<T>): Promise<void>`

- [ ] **Step 1: Write the failing test** (synthetic dataset served by a keyset-aware stub adapter)

```typescript
// append to tests/keyset_paging.test.ts
import { FamisClient } from '../famis_client';

// Adapter that answers keyset + bound probes from an in-memory Id list.
function installKeysetAdapter(client: FamisClient, ids: number[], pageSize = 1000) {
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
    const ids = [1, 2, 3, 50, 51, 900, 901, 5000, 9999]; // gaps + clustering
    installKeysetAdapter(client, ids, 2); // tiny page size → forces multi-page ranges
    const got: number[] = [];
    await client.getAllBatchKeyset(
      new QueryContext().setSelect('Id'),
      'assets',
      (resp) => got.push(...resp.value.map((r: any) => r.Id)),
    );
    expect(got.sort((a, b) => a - b)).toEqual(ids);
  });

  it('never exceeds 4 concurrent requests', async () => {
    const client = make();
    const ids = Array.from({ length: 2000 }, (_, i) => i + 1);
    const { getMaxInFlight } = installKeysetAdapter(client, ids, 100);
    await client.getAllBatchKeyset(new QueryContext().setSelect('Id'), 'assets', () => {});
    expect(getMaxInFlight()).toBeLessThanOrEqual(4);
  });

  it('returns without calling back on an empty set', async () => {
    const client = make();
    installKeysetAdapter(client, [], 1000);
    const cb = jest.fn();
    await client.getAllBatchKeyset(new QueryContext().setSelect('Id'), 'assets', cb);
    expect(cb).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest tests/keyset_paging.test.ts -t getAllBatchKeyset`
Expected: FAIL — `getAllBatchKeyset is not a function`.

- [ ] **Step 3: Implement `KEYSET_PARTITIONS` + `getAllBatchKeyset`**

Add the const near the other top-level consts in `famis_client.ts` (e.g. beside `DEFAULT_REQUEST_TIMEOUT_MS`):

```typescript
// Keyset partition count. Granularity for load-balancing an uneven Id distribution across
// the worker pool — NOT concurrency (pool stays maxConcurrent:4). More ranges than workers
// so a worker that drains a sparse range picks up another instead of idling.
export const KEYSET_PARTITIONS = 16;
```

Add the method in the `FamisClient` class next to `getAllBatch`:

```typescript
  /**
   * Keyset (Id-range-partitioned) parallel batch fetch. Opt-in alternative to getAllBatch's
   * $count+$skip: flat page latency at depth (no OFFSET). Same 4-way concurrency. Requires
   * `Id gt` support in $filter and an ordered Id PK. See the plan doc.
   */
  async getAllBatchKeyset<T extends { Id: number }>(
    context: QueryContext,
    type: string,
    callback: ResultCallback<T>,
  ): Promise<void> {
    const minResp = await this.http.get(context.buildKeysetBoundUrl(type, false), this.requestConfig(context));
    this.throwResponseError(minResp);
    const minRows = (minResp.data as FamisResponse<T>).value;
    if (minRows.length === 0) return;
    const min = minRows[0].Id;

    const maxResp = await this.http.get(context.buildKeysetBoundUrl(type, true), this.requestConfig(context));
    this.throwResponseError(maxResp);
    const max = (maxResp.data as FamisResponse<T>).value[0].Id;

    const top = 1000;
    const width = Math.ceil((max - min + 1) / KEYSET_PARTITIONS);
    const ranges: { lo: number; hi: number }[] = [];
    for (let i = 0; i < KEYSET_PARTITIONS; i++) {
      const lo = min - 1 + i * width;
      const hi = i === KEYSET_PARTITIONS - 1 ? max : min - 1 + (i + 1) * width;
      if (lo < hi) ranges.push({ lo, hi });
    }

    const limiter = new Bottleneck({ maxConcurrent: 4 });
    const tasks = ranges.map((r) =>
      limiter.schedule(async () => {
        let cursor = r.lo;
        // sequential keyset within this range; the pool bounds concurrency across ranges
        while (true) {
          const url = context.buildKeysetUrl(type, top, cursor, r.hi);
          const resp = await this.http.get(url, this.requestConfig(context));
          this.throwResponseError(resp);
          const page = resp.data as FamisResponse<T>;
          callback(page);
          const rows = page.value;
          if (rows.length < top) break;
          cursor = rows[rows.length - 1].Id;
        }
      }),
    );
    await Promise.all(tasks);
  }
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx jest tests/keyset_paging.test.ts -t getAllBatchKeyset`
Expected: PASS (3 tests) — parity, concurrency ≤4, empty-set.

- [ ] **Step 5: Commit**

```bash
git add famis_client.ts tests/keyset_paging.test.ts
git commit -m "feat(keyset): getAllBatchKeyset — Id-range-partitioned 4-way parallel paging"
```

---

### Task 3: Route `getAllAssetsBatch` via an opt-in `paging` arg

**Files:**
- Modify: `famis_client.ts` (`getAllAssetsBatch`, ~line 680)
- Test: `tests/keyset_paging.test.ts`

**Interfaces:**
- Produces: `getAllAssetsBatch(context, callback, opts?: { paging?: 'keyset' | 'skip' }): Promise<void>` — default `'skip'` (unchanged behavior).
- Consumes: `getAllBatch` (existing), `getAllBatchKeyset` (Task 2).

- [ ] **Step 1: Write the failing test** (default = skip path; opt-in = keyset path — distinguished by URL shape)

```typescript
// append to tests/keyset_paging.test.ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest tests/keyset_paging.test.ts -t "paging opt-in"`
Expected: FAIL — keyset test fails (getAllAssetsBatch ignores opts / still uses `$skip`).

- [ ] **Step 3: Implement the routing**

Replace `getAllAssetsBatch` in `famis_client.ts`:

```typescript
  async getAllAssetsBatch(
    context: QueryContext,
    callback: ResultCallback<Asset>,
    opts?: { paging?: 'keyset' | 'skip' },
  ): Promise<void> {
    if (opts?.paging === 'keyset') {
      return this.getAllBatchKeyset<Asset>(context, 'assets', callback);
    }
    return this.getAllBatch(context, 'assets', callback);
  }
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx jest tests/keyset_paging.test.ts -t "paging opt-in"`
Expected: PASS (2 tests).

- [ ] **Step 5: Run the whole suite (no regressions)**

Run: `npm test`
Expected: all suites pass (existing `getAllBatch`/timeout/reauth tests unchanged).

- [ ] **Step 6: Commit**

```bash
git add famis_client.ts tests/keyset_paging.test.ts
git commit -m "feat(keyset): opt-in paging on getAllAssetsBatch (default skip, unchanged)"
```

---

### Task 4: Version bump + build

**Files:**
- Modify: `package.json` (version)

- [ ] **Step 1: Bump version 1.3.0 → 1.4.0**

Edit `package.json`: `"version": "1.4.0"`.

- [ ] **Step 2: Build (typecheck + emit dist)**

Run: `npm run build`
Expected: `tsc` exits 0, `dist/` updated (new methods present in `dist/famis_client.d.ts`).

- [ ] **Step 3: Full test suite**

Run: `npm test`
Expected: green.

- [ ] **Step 4: Commit**

```bash
git add package.json dist
git commit -m "chore: v1.4.0 — opt-in assets keyset paging"
```

> Publish to npm (`npm publish`) is a release step done with Matt/Alexis once reviewed — not part of this plan.

---

### Task 5: Stage integration verification (manual, not in `npm test`)

**Goal:** Confirm row-count parity + speedup against the current path on a large real tenant, on stage (no prod load).

- [ ] **Step 1:** Against `st-udst.famis360.com` (→ `udst.stage.famis360.com`, ~209k active assets, keyset-enabled), fetch all assets both ways with the full select+expand and assert equal row counts and lower keyset wall-clock. (Reference bench: `$skip` 632.7s vs keyset 241.6s = 2.62×, 209,126 rows both.) A throwaway script using `getAllAssetsBatch(ctx, cb)` vs `getAllAssetsBatch(ctx, cb, { paging: 'keyset' })` suffices; do NOT commit it.
- [ ] **Step 2:** Spot-check parity on a small tenant (row counts equal between the two modes).

---

### Task 6: Connector integration (follow-on — repo `facility360_r7`, NOT this repo)

> Separate change, gated on this SDK being published + reviewed with Matt/Alexis. Listed for continuity; build it as its own small plan in the connector repo.

- Bump `facility360` dependency to `^1.4.0` (package.json + yarn.lock).
- Add `ServerConfiguration.assetsKeysetEnabled` getter → `process.env.CACHE_ASSETS_KEYSET === 'true'` (default off), mirroring the `cacheAutoRetry` pattern.
- In the assets cache loader (`src/services/cache.loaders/assets.loader.ts`, the `getAllAssetsBatch` call), pass `{ paging: cfg.assetsKeysetEnabled ? 'keyset' : 'skip' }`.
- Validate on `famis360-dev` (set `CACHE_ASSETS_KEYSET=true`, run the assets loader, confirm row parity vs a `$skip` run + faster), then staging/main, then flip the default on after a clean nightly.

---

## Self-Review

- **Spec coverage:** buildKeysetUrl/bound (Task 1) ✔; range-partitioned parallel keyset with min/max + worker pool (Task 2) ✔; opt-in default-skip (Task 3, Global Constraints) ✔; no-concurrency-increase (Bottleneck maxConcurrent:4, Task 2) ✔; $orderby=Id + half-open ranges (Task 1/2) ✔; shared-SDK additive (Task 3) ✔; version bump (Task 4) ✔; stage parity/speedup verification (Task 5) ✔; connector rollout/opt-in toggle (Task 6) ✔. Non-goals (reference endpoints, nextLink-follow, live path) correctly excluded.
- **Placeholders:** none — every code/test step has concrete code and exact commands.
- **Type consistency:** `getAllBatchKeyset<T extends {Id:number}>`, `buildKeysetUrl(entity,top,gt,le)`, `buildKeysetBoundUrl(entity,desc)`, `getAllAssetsBatch(context,callback,opts?)`, `KEYSET_PARTITIONS` used consistently across tasks.
