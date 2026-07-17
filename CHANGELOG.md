# Changelog

All notable changes to the `facility360` SDK are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Entries before 1.2.0 were not tracked in this file; see the git history for details.

## [1.4.0] — 2026-07-17
### Added
- Opt-in **keyset (Id-range-partitioned) parallel paging** for the assets batch fetch.
  `getAllAssetsBatch(context, callback, { paging: 'keyset' })` fetches min/max `Id`, splits
  the Id space into 16 half-open ranges, and pages each with `Id gt`/`Id le` under the same
  4-way concurrency as `getAllBatch` — ~2–2.6× faster than `$skip` OFFSET paging on large
  tenants. **Default is unchanged** (`$skip`); existing callers are unaffected. New
  `FamisClient.getAllBatchKeyset` + `QueryContext.buildKeysetUrl`/`buildKeysetBoundUrl`.

## [1.3.0] — 2026-07-13
### Fixed
- `getAllBatch` / `getAllAssetsBatch` no longer crash with `Cannot read properties of
  undefined (reading 'status')` when a page fetch hits a mid-stream network error
  (e.g. `ECONNRESET`). The catch handler previously built an `ApiError` from the
  undefined `response`; it now rethrows the real error so the true cause surfaces.
- `ApiError.isAuthorizationError` / `toString` are null-safe against a response-less error.

### Changed
- **Behavior (affects all `autoRetry` clients — no API change):** the retry policy widened
  from 2 retries at a 2ms delay to **6 retries with jittered exponential backoff**
  (base 1/2/4/8/16/30s, capped, + up to 25% jitter). A transient network reset now has
  time to clear before the retry; jitter de-synchronizes the many concurrent pages of
  `getAllBatch` to avoid a thundering-herd re-hammer. Consequence: a request against a
  genuinely down endpoint fails in up to ~61s instead of ~6ms. The timeout (`ECONNABORTED`)
  one-retry cap is unchanged, and only network/idempotent errors are retried (5xx are still
  surfaced, not retried).
- Added a `[facility360] retry N/6 …` log line on each retry so absorbed transient resets
  are visible even when `debug` is off.

## [1.2.0] — 2026-07
### Added
- Configurable per-request timeouts and `AbortSignal` support on `FamisClient`
  (`requestTimeoutMs`, `QueryContext.setTimeout` / `setSignal`). (#108)
- `Filter.contains` with automatic OData value escaping. (#106)
