import axios from "axios";
import {AuthorizationError} from "./errors";

export interface OAuthToken {
    token: string;
    expires: Date;
    refreshToken: string;
    tokenType: string;
}

function loginToOauthToken(response: LoginResponse): OAuthToken {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + response.Item.expires_in);
    return {
        expires: expires,
        refreshToken: response.Item.refresh_token,
        token: response.Item.access_token,
        tokenType: response.Item.token_type
    }
}

interface Info {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    user_id: string;
    first_name: string;
    last_name: string;
    installation_id: string;
    installation_name: string;
}

interface LoginResponse {
    Item: Info;
    Result: boolean;
    Context: number;
    Message: string;
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

    constructor(baseUrl: string, oAuthToken: OAuthToken) {
        super(baseUrl);
        this.expires = oAuthToken.expires;
        this.refreshToken = oAuthToken.refreshToken;
        this.token = oAuthToken.token;
        this.tokenType = oAuthToken.tokenType;
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
        return new OAuthCredential(this.baseUrl, loginToOauthToken(loginResponse));
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