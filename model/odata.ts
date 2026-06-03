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
