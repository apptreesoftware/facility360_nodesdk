import { AxiosResponse } from 'axios';

export class ApiError extends Error {
  private resp: AxiosResponse;

  constructor(resp: AxiosResponse) {
    super();

    this.resp = resp;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get isAuthorizationError(): boolean {
    // Null-safe: a network error (e.g. ECONNRESET) produces an ApiError with no response,
    // so `this.resp` may be undefined. Reading `.status` unguarded threw
    // "Cannot read properties of undefined (reading 'status')".
    return this.resp?.status === 401 || this.resp?.status === 403;
  }

  get message(): string {
    try {
      if (this.resp.data.Message) {
        return this.resp.data.Message;
      }
    } catch (e) {}
    return this.resp.statusText;
  }

  toString() {
    const message = this.message;
    if (this.isAuthorizationError && !message) {
      return 'Authorization Failed';
    }
    let str = message;
    if (this.resp?.request) {
      str = `${message}
METHOD: ${this.resp.request.method}
HOST: ${this.resp.config?.baseURL}
URL: ${this.resp.request.path}
`;
    }
    return str;
  }
}

export const AuthorizationError = new ApiError({
  config: {},
  headers: {},
  data: null,
  statusText: 'Authorization Failed',
  status: 401,
});
