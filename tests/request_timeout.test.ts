import {
  DEFAULT_LOGIN_TIMEOUT_MS,
  DEFAULT_REQUEST_TIMEOUT_MS,
  FamisClient,
} from '../famis_client';
import { QueryContext } from '../model/request_context';

const HOST = 'https://famistest.example.com';

/**
 * Install a stub adapter on the client's axios instance that records the request config
 * (so we can assert timeout / signal that the client threaded into it) and returns a
 * minimal single-page FamisResponse so paginated fetches terminate after one request.
 */
function installRecordingAdapter(client: FamisClient) {
  const configs: any[] = [];
  (client.http.defaults as any).adapter = async (config: any) => {
    configs.push(config);
    return {
      data: { value: [], '@odata.count': 0 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      request: {},
    };
  };
  return { configs };
}

function makeClient(opts?: { requestTimeoutMs?: number; autoRetry?: boolean }): FamisClient {
  return FamisClient.withAccessToken({
    token: 'test-token',
    host: HOST,
    autoRetry: opts?.autoRetry,
    requestTimeoutMs: opts?.requestTimeoutMs,
  });
}

describe('FamisClient request timeouts', () => {
  it('exposes generous per-request and tight login default constants', () => {
    expect(DEFAULT_REQUEST_TIMEOUT_MS).toEqual(120_000);
    expect(DEFAULT_LOGIN_TIMEOUT_MS).toEqual(30_000);
  });

  it('applies the default per-request timeout to the client axios instance', () => {
    const client = makeClient();
    expect(client.http.defaults.timeout).toEqual(DEFAULT_REQUEST_TIMEOUT_MS);
  });

  it('honors a requestTimeoutMs override on the factory', () => {
    const client = makeClient({ requestTimeoutMs: 45_000 });
    expect(client.http.defaults.timeout).toEqual(45_000);
  });

  it('applies the client default timeout when the context has no per-call override', async () => {
    const client = makeClient();
    const { configs } = installRecordingAdapter(client);
    await client.getAllPaged(new QueryContext(), 'users');
    expect(configs.length).toBeGreaterThan(0);
    // No per-call override -> axios merges the instance default (120s) into the request config.
    expect(configs[0].timeout).toEqual(DEFAULT_REQUEST_TIMEOUT_MS);
  });

  it('threads a QueryContext.setTimeout override into the per-request axios config', async () => {
    const client = makeClient();
    const { configs } = installRecordingAdapter(client);
    await client.getAllPaged(new QueryContext().setTimeout(5_000), 'users');
    expect(configs[0].timeout).toEqual(5_000);
  });

  it('bridges a QueryContext.setSignal AbortSignal to a per-request axios cancelToken', async () => {
    const client = makeClient();
    const { configs } = installRecordingAdapter(client);
    const controller = new AbortController();
    await client.getAllPaged(new QueryContext().setSignal(controller.signal), 'users');
    // axios 0.21 has no native `signal`; the SDK bridges it to a CancelToken instead.
    expect(configs[0].signal).toBeUndefined();
    expect(configs[0].cancelToken).toBeDefined();
  });

  it('cancels the request when the caller aborts the signal before dispatch', async () => {
    const client = makeClient();
    const { configs } = installRecordingAdapter(client);
    const controller = new AbortController();
    controller.abort();
    const promise = client.getAllPaged(new QueryContext().setSignal(controller.signal), 'users');
    await expect(promise).rejects.toBeTruthy();
    // Already-aborted signal cancels before the request reaches the network layer.
    expect(configs.length).toBe(0);
  });

  it('threads the override into getAllBatch requests too', async () => {
    const client = makeClient();
    const { configs } = installRecordingAdapter(client);
    await client.getAllBatch(new QueryContext().setTimeout(6_000), 'users', () => {});
    expect(configs[0].timeout).toEqual(6_000);
  });

  it('retries a timeout (ECONNABORTED) at most once when autoRetry is on', async () => {
    const client = makeClient({ autoRetry: true });
    let attempts = 0;
    (client.http.defaults as any).adapter = async (config: any) => {
      attempts++;
      const err: any = new Error('timeout of 120000ms exceeded');
      err.code = 'ECONNABORTED';
      err.config = config;
      throw err;
    };
    await expect(client.getAllPaged(new QueryContext(), 'users')).rejects.toBeTruthy();
    // Original request + at most one retry on timeout = 2 total (not the default 3).
    expect(attempts).toBe(2);
  });

  it('retries a normal network error up to the raised retry count (original + 6)', async () => {
    // Fake timers so the exponential backoff (base 1/2/4/8/16/30s) does not consume real
    // wall-clock; we drive the retry chain by flushing microtasks + firing pending timers.
    jest.useFakeTimers();
    try {
      const client = makeClient({ autoRetry: true });
      let attempts = 0;
      (client.http.defaults as any).adapter = async (config: any) => {
        attempts++;
        const err: any = new Error('socket hang up');
        err.code = 'ECONNRESET'; // network error (no response) -> retryable
        err.config = config;
        throw err;
      };
      const settled = client
        .getAllPaged(new QueryContext(), 'users')
        .then(() => 'resolved')
        .catch(() => 'rejected');
      // Each retry is scheduled via setTimeout(backoff). Flush microtasks so the rejection
      // propagates and the next timer is scheduled, then fire it — repeat until exhausted.
      for (let i = 0; i < 50; i++) {
        await Promise.resolve();
        await Promise.resolve();
        jest.runOnlyPendingTimers();
      }
      await expect(settled).resolves.toBe('rejected');
      // retries: 6 -> original request + 6 retries = 7 total.
      expect(attempts).toBe(7);
    } finally {
      jest.useRealTimers();
    }
  });
});
