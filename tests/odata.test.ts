import { odataString, odataValue, Filter } from '../model/odata';

describe('odataString', () => {
  it('wraps a plain string in single quotes', () => {
    expect(odataString('Joe')).toEqual("'Joe'");
  });
  it('doubles a single quote', () => {
    expect(odataString("O'Brien")).toEqual("'O''Brien'");
  });
  it('doubles multiple embedded quotes', () => {
    expect(odataString("a'b'c")).toEqual("'a''b''c'");
  });
  it('handles an empty string', () => {
    expect(odataString('')).toEqual("''");
  });
});

describe('odataValue', () => {
  it('quotes and escapes strings', () => {
    expect(odataValue("O'Brien")).toEqual("'O''Brien'");
  });
  it('leaves numbers bare', () => {
    expect(odataValue(42)).toEqual('42');
  });
  it('leaves booleans bare', () => {
    expect(odataValue(true)).toEqual('true');
  });
  it('leaves false bare', () => {
    expect(odataValue(false)).toEqual('false');
  });
});

describe('Filter', () => {
  it('eq with a string value escapes the value', () => {
    expect(Filter.eq('UserName', "O'Brien").toString()).toEqual("UserName eq 'O''Brien'");
  });
  it('eq with a numeric value leaves it bare', () => {
    expect(Filter.eq('Id', 42).toString()).toEqual('Id eq 42');
  });
  it('raw passes the fragment through unescaped', () => {
    expect(Filter.raw('ActiveFlag eq true').toString()).toEqual('ActiveFlag eq true');
  });
  it('and joins two atomic filters without parentheses', () => {
    const f = Filter.eq('Id', 1).and(Filter.raw('ActiveFlag eq true'));
    expect(f.toString()).toEqual('Id eq 1 and ActiveFlag eq true');
  });
  it('or joins two atomic filters without parentheses', () => {
    const f = Filter.eq('Id', 1).or(Filter.eq('Id', 2));
    expect(f.toString()).toEqual('Id eq 1 or Id eq 2');
  });
  it('any joins atomic filters with " or " and no outer parens on its own', () => {
    const f = Filter.any([Filter.eq('Id', 1), Filter.eq('Id', 2), Filter.eq('Id', 3)]);
    expect(f.toString()).toEqual('Id eq 1 or Id eq 2 or Id eq 3');
  });
  it('any with a single filter returns just that filter', () => {
    expect(Filter.any([Filter.eq('Id', 1)]).toString()).toEqual('Id eq 1');
  });
  it('any with no filters returns an empty string', () => {
    expect(Filter.any([]).toString()).toEqual('');
  });
  it('parenthesizes an or-group when combined with and', () => {
    const f = Filter.eq('Id', 1).or(Filter.eq('Id', 2)).and(Filter.raw('ActiveFlag eq true'));
    expect(f.toString()).toEqual('(Id eq 1 or Id eq 2) and ActiveFlag eq true');
  });
  it('parenthesizes an any-group when combined with and', () => {
    const f = Filter.any([Filter.eq('Id', 1), Filter.eq('Id', 2)]).and(Filter.raw('ActiveFlag eq true'));
    expect(f.toString()).toEqual('(Id eq 1 or Id eq 2) and ActiveFlag eq true');
  });
  it('does not parenthesize an atomic combined with and', () => {
    const f = Filter.eq('Id', 1).and(Filter.raw('ActiveFlag eq true'));
    expect(f.toString()).toEqual('Id eq 1 and ActiveFlag eq true');
  });
});
