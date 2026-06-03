/** Escape a string as an OData string literal: double single quotes, wrap in quotes. */
export function odataString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

/** Format a value for an OData filter: strings are quoted+escaped; numbers/booleans are bare. */
export function odataValue(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return odataString(value);
  }
  return String(value);
}

export class Filter {
  private constructor(
    private readonly expr: string,
    private readonly composite: boolean = false,
  ) {}

  /** field eq value — value is escaped/formatted automatically. `field` must be a static identifier, never user input. */
  static eq(field: string, value: string | number | boolean): Filter {
    return new Filter(`${field} eq ${odataValue(value)}`);
  }

  /** Trusted, code-controlled fragment. Not escaped. Use only for literals you control. */
  static raw(fragment: string): Filter {
    return new Filter(fragment);
  }

  /** Join filters with " or ". Empty -> empty filter; single -> that filter unchanged; 2+ -> a composite that parenthesizes itself when later combined. */
  static any(filters: Filter[]): Filter {
    if (filters.length === 0) return new Filter('');
    if (filters.length === 1) return filters[0];
    return new Filter(filters.map((f) => f.wrapped()).join(' or '), true);
  }

  and(other: Filter): Filter {
    return new Filter(`${this.wrapped()} and ${other.wrapped()}`, true);
  }

  or(other: Filter): Filter {
    return new Filter(`${this.wrapped()} or ${other.wrapped()}`, true);
  }

  /** Parenthesize this expression when it is itself composite (top-level and/or). */
  private wrapped(): string {
    return this.composite ? `(${this.expr})` : this.expr;
  }

  toString(): string {
    return this.expr;
  }
}
