import {AxiosInstance} from "axios";
import {AuthCredential} from "./auth";

export class FamisClient {
    http: AxiosInstance;
    credentials: AuthCredential;

    constructor(credentials: AuthCredential, http: AxiosInstance) {
        this.credentials = credentials;
        this.http = http;
        this.http.interceptors.request.use(async (config) => {
            let token = await this.credentials.getToken();
            config.headers = {"Authorization": token}
            return config;
        })
    }
}