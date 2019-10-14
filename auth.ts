import {FamisClient} from "./famis_client";
import {AxiosInstance} from "axios";
import {LoginResponse} from "./model/login_response";

export interface AuthCredential {
    getToken(): Promise<string>
}

export class UsernamePasswordCredential implements AuthCredential {
    username: string;
    password: string;
    token?: string;
    refreshToken?: string;
    expires?: Date;
    http: AxiosInstance;
    tokenType: string = "bearer";

    constructor(username: string, password: string, http: AxiosInstance) {
        this.username = username;
        this.password = password;
        this.http = http;
    }

    async getToken(): Promise<string> {
        if (!this.token) {
            await this.login();
        } else if (this.expires && this.expires <= new Date()) {
            await this.refresh();
        }
        if (!this.token) {
            throw Error("not authorized");
        }
        return `${this.tokenType} ${this.token}`;
    }

    async login() {
        const resp = await this.http.post('MobileWebServices/api/Login', {
            username: this.username,
            password: this.password
        });
        const loginResponse = resp.data as LoginResponse;
        if (!loginResponse.Result) {
            throw Error("not authorized");
        }
        this.updateFromLoginResponse(loginResponse);
    }

    async refresh() {
        const resp = await this.http.post('MobileWebServices/api/refreshtoken', {
            grant_type: this.tokenType,
            refresh_token: this.refreshToken
        });
        const loginResponse = resp.data as LoginResponse;
        if (!loginResponse.Result) {
            throw Error("not authorized");
        }
        this.updateFromLoginResponse(loginResponse);
    }

    updateFromLoginResponse(response: LoginResponse) {
        let expires = new Date()
        expires.setSeconds(expires.getSeconds() + response.Item.expires_in);
        this.expires = expires;
        this.refreshToken = response.Item.refresh_token;
        this.token = response.Item.access_token;
        this.tokenType = response.Item.token_type;
    }
}

export class TokenCredential implements AuthCredential {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    async getToken(): Promise<string> {
        return this.token;
    }
}