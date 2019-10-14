import axios from "axios";
import {LoginResponse} from "./model/login_response";

export interface AuthCredential {
    refresh(): Promise<AuthCredential>;
    accessToken: string;
}

export class BaseCredential {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }
}

export class OAuthCredential extends BaseCredential implements AuthCredential {
    token: string;
    expires: Date;
    refreshToken: string;
    tokenType: string;

    accessToken: string = `${this.tokenType} ${this.token}`;

    constructor(resp: LoginResponse, baseUrl: string) {
        super(baseUrl);
        let expires = new Date()
        expires.setSeconds(expires.getSeconds() + resp.Item.expires_in);
        this.expires = expires;
        this.refreshToken = resp.Item.refresh_token;
        this.token = resp.Item.access_token;
        this.tokenType = resp.Item.token_type;
    }

    async refresh(): Promise<AuthCredential> {
        const http = axios.create({
            baseURL: this.baseUrl,
        });
        const resp = await http.post('MobileWebServices/api/refreshtoken', {
            grant_type: this.tokenType,
            refresh_token: this.refreshToken
        });
        const loginResponse = resp.data as LoginResponse;
        if (!loginResponse.Result) {
            throw Error("not authorized");
        }
        this.updateFromLoginResponse(loginResponse);
        return this;
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

export class UsernamePasswordCredential extends BaseCredential implements AuthCredential {
    username: string;
    password: string;
    accessToken: string = "";

    constructor(username: string, password: string, baseUrl: string) {
        super(baseUrl);
        this.username = username;
        this.password = password;
    }

    async refresh(): Promise<AuthCredential> {
        const http = axios.create({
            baseURL: this.baseUrl,
        });
        const resp = await http.post('MobileWebServices/api/Login', {
            username: this.username,
            password: this.password
        });
        const loginResponse = resp.data as LoginResponse;
        if (!loginResponse.Result) {
            throw Error("not authorized");
        }
        return new OAuthCredential(loginResponse, this.baseUrl);
    }
}

export class TokenCredential implements AuthCredential {
    accessToken: string;

    constructor(token: string) {
        this.accessToken = token;
    }

    async refresh(): Promise<AuthCredential> {
        return this;
    }
}