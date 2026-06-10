# OData Filter Sanitization — Design

**Date:** 2026-06-02
**Status:** Approved (design)

## Problem

The SDK builds OData filter strings by interpolating values directly into
single-quoted string literals, e.g.:

```ts
new QueryContext().setFilter(`UserName eq '${username}'`)
```

OData requires a literal single quote inside a string to be **doubled**
(`O'Brien` → `'O''Brien'`). Because nothing does this, any filter value
containing a `'` produces a malformed query and the search fails. The
canonical case: searching users by an email or name that contains an
apostrophe.

Sanitizing ad hoc at each call site is error-prone — a developer has to
remember to escape every value. We want a way to escape values
automatically that the SDK exposes, adopted incrementally and **without a
breaking change** for consumers upgrading the package.

## Constraints

- **Non-breaking.** Existing `setFilter('...')` string calls must continue
  to compile and run unchanged. The package upgrade adds API; it removes
  nothing.
- **Incremental migration.** Call sites adopt the new approach one at a
  time. No big-bang rewrite.
- Once a value is interpolated into a finished filter string, the delimiter
  quote can no longer be distinguished from data. Therefore escaping must
  happen **at the point a value is placed into the filter**, not by
  inspecting the completed string.

## Current filter surface

Filters in `famis_client.ts` use only:

- `eq` over string literals (`UserName eq '...'`, `DisplayName eq '...'`)
- `eq` over numeric IDs (`Id eq 42`, `RequestTypeId eq ...`)
- the occasional boolean (`ActiveFlag eq true`)
- `and` / `or` composition, including `chunk.map(c => 'Id eq ' + c).join(' or ')`

No dates, GUID literals, or OData functions (`substringof`, `startswith`,
etc.) appear in the current filter surface. The design targets this surface
and leaves room to extend later.

## Approach: phased

### Phase 1 — Escaping primitive

New module `model/odata.ts`:

```ts
// "O'Brien" -> "'O''Brien'"
export function odataString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

// strings -> quoted + escaped; numbers/booleans -> bare
export function odataValue(value: string | number | boolean): string {
  if (typeof value === 'string') return odataString(value);
  return String(value);
}
```

- `odataString` is the actual fix for the apostrophe bug.
- `odataValue` dispatches on type so callers never have to decide whether to
  quote.
- Purely additive. These are the safety primitive every other piece builds
  on.

### Phase 2 — Structured `Filter` builder

Same module. A small composable builder that uses `odataValue` internally so
escaping is automatic and cannot be forgotten:

```ts
Filter.eq('UserName', username)     // UserName eq 'O''Brien'
Filter.eq('Id', 42)                 // Id eq 42
Filter.raw('ActiveFlag eq true')    // escape hatch for code-controlled fragments
someFilter.and(other)               // a and b
someFilter.or(other)                // (a) or (b)
Filter.any(filters)                 // joins with ' or ' — covers the chunk.map(...).join(' or ') pattern
```

Rules:

- Only **values** are escaped. Field names and operators are code-controlled
  and passed through unescaped.
- `Filter.raw(fragment)` is the explicit escape hatch for hand-written
  fragments (e.g. `ActiveFlag eq true`) — its content is trusted and not
  escaped.
- `toString()` returns the OData string.
- **Precedence-safe composition.** OData binds `and` tighter than `or`, so
  composite operands must be parenthesized when combined. Each `Filter`
  tracks whether it is composite (top-level `and`/`or`); `and`/`or`/`any`
  parenthesize an operand only when that operand is itself composite. Atomic
  terms (`eq`, `raw`) are never parenthesized. This makes
  `any([a, b]).and(c)` render as `(a or b) and c` rather than the incorrect
  `a or b and c`.
- `Filter.any([])` yields an empty filter; `Filter.any([x])` returns `x`
  unchanged.

### Phase 3 — Non-breaking integration

- Widen `QueryContext.setFilter(filter: string)` to
  `setFilter(filter: string | Filter)`, calling `.toString()` internally.
  Old string calls are unaffected.
- Export `Filter`, `odataString`, and `odataValue` from `index.ts`.
- Migrate the highest-risk call sites to `Filter` first: user-supplied
  string values such as `UserName eq '...'` and `DisplayName eq '...'`
  (email/username/name/free-text search).
- Leave numeric-ID filters as-is initially; migrate incrementally over time.

## Testing

Unit tests for `model/odata.ts` (Jest, already configured; no network):

- `odataString`: doubles a single quote; handles multiple/embedded quotes;
  handles a value with no quotes.
- `odataValue`: strings quoted+escaped; numbers bare; booleans bare.
- `Filter`: `eq` with string vs numeric value; `and` / `or` composition and
  parenthesization; `any` join behavior including the empty case;
  `raw` passthrough (no escaping).

## Non-goals

- Not a full OData expression parser.
- Not retroactively rewriting every call site in one pass.
- Not validating field names against a schema.
- Not handling date/GUID/function literals (no current usage; add when a
  real need appears).
