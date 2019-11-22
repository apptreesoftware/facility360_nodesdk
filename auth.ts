import axios from "axios";
import {LoginResponse} from "./model/login_response";
import {AuthorizationError} from "./errors";

export interface OAuthSetting {
    token: string;
    expires: Date;
    refreshToken: string;
    tokenType: string;
}

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

    accessToken: string;

    constructor(baseUrl: string, settings?: OAuthSetting, response?: LoginResponse) {
        super(baseUrl);
        if (settings) {
            this.expires = settings.expires;
            this.refreshToken = settings.refreshToken;
            this.token = settings.refreshToken;
            this.tokenType = settings.tokenType;
        } else if (response) {
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + response.Item.expires_in);
            this.expires = expires;
            this.refreshToken = response.Item.refresh_token;
            this.token = response.Item.access_token;
            this.tokenType = response.Item.token_type;
        } else {
            throw Error("either settings or login response is required for OAuthCredential constructor");
        }
        this.accessToken = `${this.tokenType} ${this.token}`;
    }

    async refresh(): Promise<AuthCredential> {
        if (this.expires <= new Date()) {
            const http = axios.create({
                baseURL: this.baseUrl,
            });
            const resp = await http.post('MobileWebServices/api/refreshtoken', {
                grant_type: this.tokenType,
                refresh_token: this.refreshToken
            });
            const loginResponse = resp.data as LoginResponse;
            if (!loginResponse.Result) {
                throw AuthorizationError;
            }
            this.updateFromLoginResponse(loginResponse);
        }
        return this;
    }

    updateFromLoginResponse(response: LoginResponse) {
        const expires = new Date()
        expires.setSeconds(expires.getSeconds() + response.Item.expires_in);
        this.expires = expires;
        this.refreshToken = response.Item.refresh_token;
        this.token = response.Item.access_token;
        this.tokenType = response.Item.token_type;
        this.accessToken = `${this.tokenType} ${this.token}`;
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
            throw AuthorizationError;
        }
        return new OAuthCredential(this.baseUrl, undefined, loginResponse);
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