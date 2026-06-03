import { odataString, odataValue } from '../model/odata';

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
});
