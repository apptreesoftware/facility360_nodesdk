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
