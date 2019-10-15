import axios, {AxiosInstance} from "axios";
import {AuthCredential} from "./auth";
import {AuthorizationError} from "./errors";
import {JsonObject} from "./model/common";
import {
    AccountSegment,
    ActivityGroup, Asset,
    AssetClass,
    AssetKeyword,
    FamisAttachment, Property,
    WorkType
} from "./model/famis_models";

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

    async getAccountSegments(): Promise<AccountSegment[]> {
        const startPath = 'MobileWebServices/apis/360facility/v1/accountsegmentnpfa';
        return this.getAllUsingLink<AccountSegment>(startPath);
    }

    async getActivityGroups(): Promise<ActivityGroup[]> {
        const startPath = 'MobileWebServices/apis/360facility/v1/activitygroups';
        return this.getAllUsingLink<ActivityGroup>(startPath);
    }

    async getAssetClasses(): Promise<AssetClass[]> {
        const startPath = 'MobileWebServices/apis/360facility/v1/assetclasses';
        return this.getAllUsingLink<AssetClass>(startPath);
    }

    async getAssetKeywords(): Promise<AssetKeyword[]> {
        return this.getAllUsingLink<AssetKeyword>('MobileWebServices/apis/360facility/v1/assetkeywords');
    }

    async getWorkTypes(): Promise<WorkType[]> {
        return this.getAllUsingLink<WorkType>('MobileWebServices/apis/360facility/v1/worktypes');
    }

    async getProperties(): Promise<Property[]> {
        return this.getAllUsingLink<Property>('MobileWebServices/apis/360facility/v1/properties');
    }

    async getAssets(): Promise<Asset[]> {
        return this.getAllUsingLink<Asset>('MobileWebServices/apis/360facility/v1/assets');
    }

    async getAssetsForFilter(filter: string): Promise<Asset[]> {
        const startPath = `MobileWebServices/apis/360facility/v1/assets?$filter=${filter}`;
        return this.getAllUsingLink<Asset>(startPath);
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