import {AxiosInstance} from "axios";
import {AuthCredential} from "./auth";

export class FamisClient {
    http: AxiosInstance;
    credentials: AuthCredential;

    constructor(credentials: AuthCredential, http: AxiosInstance) {
        this.credentials = credentials;
        this.http = http;
        this.http.interceptors.request.use(async (config) => {
            this.credentials = await this.credentials.refresh();
            config.headers = {"Authorization": this.credentials.accessToken};
            return config;
        })
    }
}