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
    return this.resp.status == 401 || this.resp.status === 403;
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
    if (this.isAuthorizationError) {
      return 'Authorization Failed';
    }
    let str = this.message;
    if (this.resp.request) {
      str = `${str} 
METHOD: ${this.resp.request.method}
HOST: ${this.resp.config.baseURL}
URL: ${this.resp.request.path}
`;
    }
    return str;
  }
}

export const AuthorizationError = new ApiError({
  config: {},
  data: null,
  headers: null,
  statusText: 'Authorization Failed',
  status: 401,
});
