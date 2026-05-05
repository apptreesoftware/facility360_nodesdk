import { ApiError } from '../errors';
import { FamisClient } from '../famis_client';
import { FamisOAuthCredential, LoginResponse } from '../model/request_models';

/**
 * Helper that builds a FamisOAuthCredential with a configurable token + far-future expiry
 * so the proactive request-interceptor refresh path does NOT fire (it only fires when
 * isCredentialExpired is true). This isolates the REACTIVE 401 handling we're testing.
 */
function makeCred(
  accessToken: string,
  refreshToken: string = 'refresh-' + accessToken,
): FamisOAuthCredential {
  return {
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: refreshToken,
    user_id: '42',
    first_name: 'Test',
    last_name: 'User',
    installation_id: 'inst',
    installation_name: 'Inst',
    '.expires': new Date(Date.now() + 60 * 60 * 1000).toUTCString(),
    '.issued': new Date().toUTCString(),
  };
}

function makeLoginResponse(cred: FamisOAuthCredential): LoginResponse {
  return { Item: cred, Result: true, Context: 0, Message: '' };
}

/**
 * Custom axios adapter we install on client.http to intercept GETs to a target URL pattern.
 * We track call count so the test can assert ONE retry occurred (not zero, not two).
 */
interface UsersCall {
  authHeader: string | undefined;
  url: string;
}

function installUsersAdapter(
  client: FamisClient,
  opts: {
    responsesByAuth: Record<string, { status: number; data: any }>;
  },
): { calls: UsersCall[] } {
  const calls: UsersCall[] = [];
  // Override the adapter on the existing axios instance. The interceptors stay in place;
  // only the network layer is replaced.
  (client.http.defaults as any).adapter = async (config: any) => {
    const auth = (config.headers &&
      (config.headers.Authorization || config.headers.authorization)) as string | undefined;
    calls.push({ authHeader: auth, url: config.url ?? '' });
    const key = auth ?? '';
    const match = opts.responsesByAuth[key];
    if (!match) {
      return {
        data: { error: 'no-stub-for-auth', auth: key },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config,
        request: {},
      };
    }
    return {
      data: match.data,
      status: match.status,
      statusText: match.status === 200 ? 'OK' : 'Unauthorized',
      headers: {},
      config,
      request: {},
    };
  };
  return { calls };
}

describe('FamisClient reauthOnFailure', () => {
  const HOST = 'https://famistest.example.com';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('reauthOnFailure=true: rescues a hard 401 by full re-login, swaps token, retries once', async () => {
    // Stub the static login: first call from withLoginCredential, second call from reauth fallback.
    const initialCred = makeCred('initial-access-token', 'stale-refresh');
    const reauthCred = makeCred('fresh-access-token-after-reauth', 'fresh-refresh');
    const loginSpy = jest
      .spyOn(FamisClient, 'login')
      .mockResolvedValueOnce(makeLoginResponse(initialCred))
      .mockResolvedValueOnce(makeLoginResponse(reauthCred));

    // Stub refreshCredential to FAIL (simulating expired refresh_token).
    const refreshSpy = jest
      .spyOn(FamisClient, 'refreshCredential')
      .mockRejectedValue(new Error('refresh-token expired'));

    const client = await FamisClient.withLoginCredential({
      username: 'u',
      password: 'p',
      host: HOST,
      autoRefresh: false,
      reauthOnFailure: true,
    });

    // Wire: first request with initial token -> 401. After re-login retry with fresh token -> 200.
    const { calls } = installUsersAdapter(client, {
      responsesByAuth: {
        'Bearer initial-access-token': { status: 401, data: { Message: 'Unauthorized' } },
        'Bearer fresh-access-token-after-reauth': {
          status: 200,
          data: { value: [{ Id: 42, FirstName: 'Test', LastName: 'User' }] },
        },
      },
    });

    const user = await client.getUserById(42);

    expect(user).not.toBeNull();
    expect(user!.Id).toEqual(42);

    // We hit the URL twice: first with the stale token (401), retry with fresh token (200).
    expect(calls.length).toBe(2);
    expect(calls[0].authHeader).toBe('Bearer initial-access-token');
    expect(calls[1].authHeader).toBe('Bearer fresh-access-token-after-reauth');

    // refreshCredential is attempted FIRST (refresh-token path) and must fail before fallback.
    expect(refreshSpy).toHaveBeenCalledTimes(1);

    // login: 1) initial withLoginCredential, 2) reauth fallback. Total 2.
    expect(loginSpy).toHaveBeenCalledTimes(2);

    // Client credentials should have been swapped to the fresh ones.
    expect(client.credentials.access_token).toBe('fresh-access-token-after-reauth');
  });

  it('reauthOnFailure=true: never retries more than once on persistent 401s', async () => {
    const initialCred = makeCred('initial-token');
    const reauthCred = makeCred('reauth-token-still-bad');
    const loginSpy = jest
      .spyOn(FamisClient, 'login')
      .mockResolvedValueOnce(makeLoginResponse(initialCred))
      .mockResolvedValueOnce(makeLoginResponse(reauthCred));
    jest.spyOn(FamisClient, 'refreshCredential').mockRejectedValue(new Error('refresh failed'));

    const client = await FamisClient.withLoginCredential({
      username: 'u',
      password: 'p',
      host: HOST,
      autoRefresh: false,
      reauthOnFailure: true,
    });

    // Both tokens get 401: ensures we don't loop forever and ApiError surfaces.
    const { calls } = installUsersAdapter(client, {
      responsesByAuth: {
        'Bearer initial-token': { status: 401, data: { Message: 'Unauthorized' } },
        'Bearer reauth-token-still-bad': { status: 401, data: { Message: 'Still Unauthorized' } },
      },
    });

    await expect(client.getUserById(42)).rejects.toBeInstanceOf(ApiError);

    // Exactly two physical attempts to the resource: original + ONE reauth retry.
    expect(calls.length).toBe(2);
    // login called exactly once for the reauth fallback (plus 1 from withLoginCredential = 2 total).
    expect(loginSpy).toHaveBeenCalledTimes(2);
  });

  it('reauthOnFailure=false (default): a 401 propagates as ApiError, no re-login attempted', async () => {
    const initialCred = makeCred('default-token');
    const loginSpy = jest
      .spyOn(FamisClient, 'login')
      .mockResolvedValueOnce(makeLoginResponse(initialCred));
    const refreshSpy = jest.spyOn(FamisClient, 'refreshCredential');

    const client = await FamisClient.withLoginCredential({
      username: 'u',
      password: 'p',
      host: HOST,
      autoRefresh: false,
      // reauthOnFailure intentionally omitted -> defaults to false
    });

    const { calls } = installUsersAdapter(client, {
      responsesByAuth: {
        'Bearer default-token': { status: 401, data: { Message: 'Unauthorized' } },
      },
    });

    await expect(client.getUserById(42)).rejects.toBeInstanceOf(ApiError);

    // Exactly ONE attempt. No retry.
    expect(calls.length).toBe(1);
    // login called only by withLoginCredential, NOT for reauth.
    expect(loginSpy).toHaveBeenCalledTimes(1);
    // refreshCredential NEVER called when flag is off (no reactive path engaged).
    expect(refreshSpy).not.toHaveBeenCalled();
    // Credentials remain the initial ones.
    expect(client.credentials.access_token).toBe('default-token');
  });

  it('reauthOnFailure=true: refresh-token path succeeds, no fallback re-login attempted', async () => {
    const initialCred = makeCred('initial-access-token', 'good-refresh');
    const refreshedCred = makeCred('refreshed-access-token', 'newer-refresh');
    const loginSpy = jest
      .spyOn(FamisClient, 'login')
      .mockResolvedValueOnce(makeLoginResponse(initialCred));

    // Refresh succeeds — fallback re-login MUST NOT be invoked.
    const refreshSpy = jest
      .spyOn(FamisClient, 'refreshCredential')
      .mockResolvedValueOnce(refreshedCred);

    const client = await FamisClient.withLoginCredential({
      username: 'u',
      password: 'p',
      host: HOST,
      autoRefresh: false,
      reauthOnFailure: true,
    });

    const { calls } = installUsersAdapter(client, {
      responsesByAuth: {
        'Bearer initial-access-token': { status: 401, data: { Message: 'Unauthorized' } },
        'Bearer refreshed-access-token': {
          status: 200,
          data: { value: [{ Id: 42, FirstName: 'Test', LastName: 'User' }] },
        },
      },
    });

    const user = await client.getUserById(42);

    expect(user).not.toBeNull();
    expect(user!.Id).toEqual(42);

    // Two physical attempts: 401 then refreshed-token retry.
    expect(calls.length).toBe(2);
    expect(calls[0].authHeader).toBe('Bearer initial-access-token');
    expect(calls[1].authHeader).toBe('Bearer refreshed-access-token');

    // Refresh path used exactly once. login MUST stay at 1 (only the initial withLoginCredential).
    expect(refreshSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledTimes(1);

    expect(client.credentials.access_token).toBe('refreshed-access-token');
  });

  it('reauthOnFailure=true: onComplete fires once for the 401 and once for the retry (not three times)', async () => {
    const initialCred = makeCred('initial-access-token', 'good-refresh');
    const refreshedCred = makeCred('refreshed-access-token', 'newer-refresh');
    jest.spyOn(FamisClient, 'login').mockResolvedValueOnce(makeLoginResponse(initialCred));
    jest.spyOn(FamisClient, 'refreshCredential').mockResolvedValueOnce(refreshedCred);

    const onComplete = jest.fn();
    const client = await FamisClient.withLoginCredential({
      username: 'u',
      password: 'p',
      host: HOST,
      autoRefresh: false,
      reauthOnFailure: true,
      onComplete,
    });

    installUsersAdapter(client, {
      responsesByAuth: {
        'Bearer initial-access-token': { status: 401, data: { Message: 'Unauthorized' } },
        'Bearer refreshed-access-token': {
          status: 200,
          data: { value: [{ Id: 42, FirstName: 'Test', LastName: 'User' }] },
        },
      },
    });

    await client.getUserById(42);

    // onComplete is invoked via Promise.resolve().then(...) — flush microtasks before asserting.
    await new Promise((resolve) => setImmediate(resolve));

    // Exactly two callbacks: one for the 401, one for the 200 retry. Not three (which would
    // indicate the inner-chain duplicate fire we suppress with __reauthRetryReported).
    expect(onComplete).toHaveBeenCalledTimes(2);
    const statuses = onComplete.mock.calls.map((c) => c[0].responseStatus);
    expect(statuses).toEqual([401, 200]);
  });
});
