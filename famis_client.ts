import axios, {AxiosInstance} from "axios";
import {AuthCredential} from "./auth";
import {AuthorizationError} from "./errors";
import {
    AccountSegment,
    ActivityGroup,
    Asset,
    AssetClass,
    AssetKeyword,
    FamisAttachment,
    FamisResponse,
    Floor,
    Property,
    RequestPriority, RequestStatus,
    RequestSubType,
    RequestType,
    Space,
    WorkOrder,
    WorkOrderComment,
    WorkType
} from "./model/famis_models";
import {QueryContext} from "./model/query_context";

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

    async getAttachments(context: QueryContext): Promise<FamisAttachment[]> {
        return this.getAll<FamisAttachment>(context, "attachments");
    }

    async getAccountSegments(context: QueryContext): Promise<AccountSegment[]> {
        return this.getAll<AccountSegment>(context, "accountsegmentnpfa");
    }

    async getActivityGroups(context: QueryContext): Promise<ActivityGroup[]> {
        return this.getAll<ActivityGroup>(context, "activitygroups");
    }

    async getAssetClasses(context: QueryContext): Promise<AssetClass[]> {
        return this.getAll<AssetClass>(context, "assetclasses");
    }

    async getAssetKeywords(context: QueryContext): Promise<AssetKeyword[]> {
        return this.getAll<AssetKeyword>(context, "assetkeywords");
    }

    async getWorkTypes(context: QueryContext): Promise<WorkType[]> {
        return this.getAll<WorkType>(context, "worktypes");
    }

    async getProperties(context: QueryContext): Promise<Property[]> {
        return this.getAll<Property>(context, "properties");
    }

    async getAssets(context: QueryContext): Promise<Asset[]> {
        return this.getAll<Asset>(context, 'assets');
    }

    async getSpaces(context: QueryContext): Promise<Space[]> {
        return this.getAll<Space>(context, "spaces");
    }

    async getFloors(context: QueryContext): Promise<Floor[]> {
        return this.getAll<Floor>(context, 'floors');
    }

    async getWorkOrders(context: QueryContext): Promise<WorkOrder[]> {
        return this.getAll<WorkOrder>(context, 'workorders');
    }

    async getRequestTypes(context: QueryContext): Promise<RequestType[]> {
        return this.getAll<RequestType>(context, 'requesttypes');
    }

    async getRequestSubtypes(context: QueryContext): Promise<RequestSubType[]> {
        return this.getAll<RequestSubType>(context, 'requestsubtypes')
    }

    async getRequestPriorities(context: QueryContext): Promise<RequestPriority[]> {
        return this.getAll<RequestPriority>(context, 'requestpriorities');
    }

    async getWorkOrderComments(context: QueryContext): Promise<WorkOrderComment[]> {
        return this.getAll<WorkOrderComment>(context, 'workordercomments');
    }

    async getRequestStatuses(context: QueryContext): Promise<RequestStatus[]> {
        return this.getAll<RequestStatus>(context, 'requeststatuses');
    }

    async getAll<T>(context: QueryContext, type: string): Promise<T[]> {
        if (supportsNextLink(type)) {
            return this.getAllUsingLink<T>(context.buildUrl(type));
        } else {
            return this.getAllPaged<T>(context, type);
        }
    }

    async getAllUsingLink<T>(startPath: string): Promise<T[]> {
        let resp = await this.http.get(startPath);
        if (resp.status === 401) {
            throw AuthorizationError;
        } else if (resp.status !== 200) {
            throw Error(`http error: status ${resp.status}`);
        }
        let itemResponse = resp.data as FamisResponse<T>;
        let nextLink = itemResponse["@odata.nextLink"];
        let items = itemResponse.value;

        while (nextLink) {
            resp = await this.http.get(nextLink);
            if (resp.status !== 200) {
                if (resp.status === 401) {
                    throw AuthorizationError;
                }
                throw Error(`error: status ${resp.status}`);
            }
            let newResponse = resp.data as FamisResponse<T>;
            items = items.concat(newResponse.value);
            nextLink = newResponse['@odata.nextLink'];
        }
        return items;
    }

    async getAllPaged<T>(context: QueryContext, type: string): Promise<T[]> {
        const top = 500;
        let skip = 0;
        let count = 500;
        let items: T[] = [];

        while (count >= top) {
            let url = context.buildPagedUrl(type, top, skip);
            let resp = await this.http.get(url);
            if (resp.status === 401) {
                throw AuthorizationError;
            } else if (resp.status !== 200) {
                throw Error(`http error: status ${resp.status}`);
            }
            let famisResp = resp.data as FamisResponse<T>;
            items = items.concat(famisResp.value)
            skip += top;
            count = famisResp.value.length;
        }
        return items;
    }
}

function supportsNextLink(type: string) : boolean {
    if (type === 'workorders') {
        return false;
    }
    return true;
}