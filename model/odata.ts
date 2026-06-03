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
  private constructor(private readonly expr: string) {}

  /** field eq value — value is escaped/formatted automatically. */
  static eq(field: string, value: string | number | boolean): Filter {
    return new Filter(`${field} eq ${odataValue(value)}`);
  }

  /** Trusted, code-controlled fragment. Not escaped. Use only for literals you control. */
  static raw(fragment: string): Filter {
    return new Filter(fragment);
  }

  /** Join filters with " or " (no extra parentheses). Empty list yields an empty filter. */
  static any(filters: Filter[]): Filter {
    return new Filter(filters.map((f) => f.toString()).join(' or '));
  }

  and(other: Filter): Filter {
    return new Filter(`${this.toString()} and ${other.toString()}`);
  }

  or(other: Filter): Filter {
    return new Filter(`(${this.toString()}) or (${other.toString()})`);
  }

  toString(): string {
    return this.expr;
  }
}
