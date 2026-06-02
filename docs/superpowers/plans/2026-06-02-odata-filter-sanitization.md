# OData Filter Sanitization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a non-breaking, automatic way to sanitize OData filter values so filters containing single quotes (e.g. emails/names like `O'Brien`) no longer break searches.

**Architecture:** A new `model/odata.ts` module provides escaping primitives (`odataString`, `odataValue`) and a composable `Filter` builder that escapes values automatically. `QueryContext.setFilter` is widened to accept `string | Filter`. High-risk string call sites in `famis_client.ts` are migrated to `Filter`. Everything is additive — existing string filters keep working.

**Tech Stack:** TypeScript, Jest (ts-jest), existing 360Facility SDK.

---

## File Structure

- **Create:** `model/odata.ts` — escaping primitives + `Filter` builder. Single responsibility: turning values/fields into safe OData filter strings.
- **Create:** `tests/odata.test.ts` — unit tests for the module.
- **Modify:** `model/request_context.ts` — widen `setFilter` signature to `string | Filter`.
- **Modify:** `index.ts` — re-export the new module.
- **Modify:** `famis_client.ts` — migrate high-risk string filter call sites to `Filter`.

---

## Task 1: Escaping primitives (`odataString`, `odataValue`)

**Files:**
- Create: `model/odata.ts`
- Test: `tests/odata.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx jest tests/odata.test.ts`
Expected: FAIL — cannot find module `../model/odata`.

- [ ] **Step 3: Write minimal implementation**

```ts
// model/odata.ts

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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx jest tests/odata.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
rtk git add model/odata.ts tests/odata.test.ts
rtk git commit -m "feat: add OData value escaping primitives"
```

---

## Task 2: `Filter` builder

**Files:**
- Modify: `model/odata.ts`
- Test: `tests/odata.test.ts`

- [ ] **Step 1: Write the failing tests**

Append to `tests/odata.test.ts`:

```ts
import { Filter } from '../model/odata';

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
  it('and joins two filters', () => {
    const f = Filter.eq('Id', 1).and(Filter.raw('ActiveFlag eq true'));
    expect(f.toString()).toEqual('Id eq 1 and ActiveFlag eq true');
  });
  it('or parenthesizes both sides', () => {
    const f = Filter.eq('Id', 1).or(Filter.eq('Id', 2));
    expect(f.toString()).toEqual('(Id eq 1) or (Id eq 2)');
  });
  it('any joins filters with " or "', () => {
    const f = Filter.any([Filter.eq('Id', 1), Filter.eq('Id', 2), Filter.eq('Id', 3)]);
    expect(f.toString()).toEqual('Id eq 1 or Id eq 2 or Id eq 3');
  });
  it('any with a single filter returns just that filter', () => {
    expect(Filter.any([Filter.eq('Id', 1)]).toString()).toEqual('Id eq 1');
  });
  it('any with no filters returns an empty string', () => {
    expect(Filter.any([]).toString()).toEqual('');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx jest tests/odata.test.ts`
Expected: FAIL — `Filter` is not exported.

- [ ] **Step 3: Write minimal implementation**

Append to `model/odata.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx jest tests/odata.test.ts`
Expected: PASS (all Task 1 + Task 2 tests).

- [ ] **Step 5: Commit**

```bash
rtk git add model/odata.ts tests/odata.test.ts
rtk git commit -m "feat: add composable OData Filter builder"
```

---

## Task 3: Widen `setFilter` to accept `Filter`

**Files:**
- Modify: `model/request_context.ts:9-12`
- Test: `tests/query_context.test.ts`

- [ ] **Step 1: Write the failing test**

Append a test inside the `describe('QueryContext', ...)` block in `tests/query_context.test.ts`:

```ts
it('accepts a Filter object and renders the escaped filter', function () {
    const context = new QueryContext().setFilter(Filter.eq('UserName', "O'Brien"));
    const queryUrl = context.buildUrl('/test');
    const uri = new URL(`http://example.com/${queryUrl}`);
    expect(uri.searchParams.get('$filter')).toEqual("UserName eq 'O''Brien'");
});
```

Add the import at the top of the file:

```ts
import { Filter } from '../model/odata';
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest tests/query_context.test.ts`
Expected: FAIL — TypeScript error: `Filter` is not assignable to parameter of type `string` (compile failure in ts-jest).

- [ ] **Step 3: Update `setFilter`**

In `model/request_context.ts`, change the `setFilter` method (lines 9-12):

```ts
    setFilter(filter: string | Filter) {
        this.filter = filter.toString();
        return this;
    }
```

Add the import at the top of `model/request_context.ts`:

```ts
import { Filter } from './odata';
```

Note: `this.filter` stays typed as `string?`. `String.prototype.toString()` on a string returns itself, so existing string callers are unaffected.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest tests/query_context.test.ts`
Expected: PASS (all 4 tests, including the new one).

- [ ] **Step 5: Commit**

```bash
rtk git add model/request_context.ts tests/query_context.test.ts
rtk git commit -m "feat: allow setFilter to accept a Filter object"
```

---

## Task 4: Export the module from the package entry point

**Files:**
- Modify: `index.ts`

- [ ] **Step 1: Add the export**

Append to `index.ts`:

```ts
export * from './model/odata';
```

- [ ] **Step 2: Verify the build compiles**

Run: `rtk npm run build`
Expected: `tsc` completes with no errors; `Filter`, `odataString`, `odataValue` are present in `dist/index.d.ts`.

- [ ] **Step 3: Commit**

```bash
rtk git add index.ts
rtk git commit -m "feat: export odata module from package entry point"
```

---

## Task 5: Migrate high-risk string filter call sites

Migrate only call sites that interpolate user-supplied **string** values into a quoted literal. Numeric-ID filters are left as-is (no quote-injection risk) and migrated later.

**Files:**
- Modify: `famis_client.ts:754` (`UserName eq '${username}'`)
- Modify: `famis_client.ts:1440` (`DisplayName eq '${name}'`)
- Modify: `famis_client.ts:1450` (`names.map((name) => \`DisplayName eq '${name}'\`).join(' or ')`)

- [ ] **Step 1: Migrate `UserName eq` (around line 754)**

Before:
```ts
new QueryContext().setFilter(`UserName eq '${username}'`).setSelect(select.join(','))
```
After:
```ts
new QueryContext().setFilter(Filter.eq('UserName', username)).setSelect(select.join(','))
```

- [ ] **Step 2: Migrate `DisplayName eq` single (around line 1440)**

Before:
```ts
context.setFilter(`DisplayName eq '${name}'`);
```
After:
```ts
context.setFilter(Filter.eq('DisplayName', name));
```

- [ ] **Step 3: Migrate `DisplayName eq` list (around line 1450)**

Before:
```ts
const filterString = names.map((name) => `DisplayName eq '${name}'`).join(' or ');
const res = await this.getUdfFields(new QueryContext().setFilter(filterString));
```
After:
```ts
const filter = Filter.any(names.map((name) => Filter.eq('DisplayName', name)));
const res = await this.getUdfFields(new QueryContext().setFilter(filter));
```

- [ ] **Step 4: Add the import to `famis_client.ts`**

Ensure the top of `famis_client.ts` imports `Filter`:

```ts
import { Filter } from './model/odata';
```

(If an import block from `./model/...` already exists, add `Filter` consistent with the existing import style.)

- [ ] **Step 5: Verify the build compiles and tests pass**

Run: `rtk npm run build && npm test`
Expected: `tsc` clean; existing unit tests pass (integration tests are excluded by the `test` script's ignore pattern).

- [ ] **Step 6: Commit**

```bash
rtk git add famis_client.ts
rtk git commit -m "feat: migrate user/display name filters to escaped Filter builder"
```

---

## Self-Review Notes

- **Spec coverage:** Phase 1 → Task 1; Phase 2 → Task 2; Phase 3 (widen setFilter → Task 3, export → Task 4, migrate high-risk sites → Task 5). Testing section → tests embedded in Tasks 1-3. Non-goals respected (no parser, no full migration, no field validation).
- **Type consistency:** `odataString`/`odataValue`/`Filter.eq`/`Filter.raw`/`Filter.any`/`.and`/`.or`/`.toString()` names are consistent across all tasks and match the spec.
- **Line numbers** in Task 5 are from the current `famis_client.ts` snapshot and may drift; each step shows the exact before/after text to match, so locate by content if line numbers differ.
