import axios, {AxiosInstance} from "axios";
import {AuthCredential} from "./auth";
import {FamisAttachment} from "./model/famis_attachment";
import {AuthorizationError} from "./errors";
import {JsonObject} from "./model/common";

export class FamisClient {
    host: string;
    http: AxiosInstance;
    credentials: AuthCredential;

    constructor(credentials: AuthCredential, host: string) {
        this.credentials = credentials;
        this.host = host;
        this.http = axios.create({
            baseURL: host,
        });
        this.http.interceptors.request.use(async (config) => {
            this.credentials = await this.credentials.refresh();
            config.headers.Authorization = this.credentials.accessToken;
            return config;
        });
    }

    async getAttachments(): Promise<FamisAttachment[]> {
        const startPath = 'MobileWebServices/apis/360facility/v1/attachments';
        return this.getAllUsingLink<FamisAttachment>(startPath);
    }

    async getAllUsingLink<T>(startPath: string): Promise<T[]> {
        let resp = await this.http.get(startPath);
        if (resp.status === 401) {
            throw AuthorizationError;
        } else if (resp.status !== 200) {
            throw Error(`http error: status ${resp.status}`);
        }
        let itemResponse = resp.data as JsonObject;
        let nextLink: string | undefined = itemResponse['@odata.nextLink'] as string;
        let items = itemResponse['value'] as T[];

        while (nextLink) {
            resp = await this.http.get(nextLink);
            if (resp.status !== 200) {
                if (resp.status === 401) {
                    throw AuthorizationError;
                }
                throw Error(`error: status ${resp.status}`);
            }
            let newResponse = resp.data as JsonObject;
            const itemsToAdd = newResponse['value'] as T[];
            items = items.concat(itemsToAdd);
            nextLink = newResponse['@odata.nextLink'] as string;
        }
        return items;
    }
}