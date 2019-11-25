import axios, {AxiosInstance} from "axios";
import {AuthCredential, AuthState} from "./auth";
import {AuthorizationError} from "./errors";
import {
    AccountSegment,
    ActivityGroup,
    FamisAttachment,
    FamisErrorResponse,
    FamisResponse,
    Floor,
    RequestPriority,
    RequestStatus,
    RequestSubType,
    RequestType,
    Space,
    WorkOrder,
    WorkOrderComment,
    WorkType
} from "./model/famis_models";
import {buildEntityUrl, QueryContext} from "./model/request_context";
import {
    Asset,
    AssetClass,
    AssetCreateRequest,
    AssetKeyword,
    AssetMake,
    AssetModel,
    AssetStatus,
    AssetType,
    CreateAssetMake,
    CreateAssetModel
} from "./model/assets";
import {Crew, CrewUserAssociation} from "./model/crews";
import {Company, CreateCompanyRequest, PatchCompanyRequest} from "./model/companies";
import {Result} from "./model/common";
import {Property, PropertyRegionAssociation, PropertyRequestTypeAssociation} from "./model/properties";
import {UserPropertyAssociation, UserRegionAssociation} from "./model/user";
import moment = require("moment");

export class FamisClient {
    host: string;
    http: AxiosInstance;
    credentials: AuthCredential;
    autoRefresh: boolean;

    constructor(credentials: AuthCredential, host: string, autoRefresh: boolean) {
        this.credentials = credentials;
        this.host = host;
        this.http = axios.create({
            baseURL: host,
        });
        this.autoRefresh = autoRefresh;
        this.http.interceptors.request.use(async (config) => {
            if (this.autoRefresh) {
                this.credentials = await this.credentials.refresh();
            }
            config.headers.Authorization = this.credentials.accessToken;
            return config;
        });
    }

    async refreshCredentials(): Promise<[AuthCredential, AuthState]> {
        const credTuple = await this.credentials.refreshWithState();
        if (credTuple[1] != AuthState.Expired) {
            this.credentials = credTuple[0];
        }
        return credTuple;
    }

    async getCredentials(): Promise<AuthCredential> {
        this.credentials = await this.credentials.refresh();
        return this.credentials;
    }

    // Assets
    async getAssetClasses(context: QueryContext): Promise<Result<AssetClass>> {
        return this.getAll<AssetClass>(context, "assetclasses");
    }

    async getAssetKeywords(context: QueryContext): Promise<Result<AssetKeyword>> {
        return this.getAll<AssetKeyword>(context, "assetkeywords");
    }

    async getAssetStatuses(context: QueryContext): Promise<Result<AssetStatus>> {
        return this.getAll<AssetStatus>(context, "assetstatuses");
    }

    async getAssetMakes(context: QueryContext): Promise<Result<AssetMake>> {
        return this.getAll<AssetMake>(context, "assetmakes");
    }

    async createAssetMake(assetMake: AssetMake): Promise<AssetMake> {
        return this.createObject<CreateAssetMake, AssetMake>(assetMake, 'assetmakes');
    }

    async getAssetModels(context: QueryContext): Promise<Result<AssetModel>> {
        return this.getAll<AssetModel>(context, "assetmodels");
    }

    async createAssetModel(assetModel: CreateAssetModel): Promise<AssetModel> {
        return this.createObject<CreateAssetModel, AssetModel>(assetModel, "assetmodels");
    }

    async getAssetTypes(context: QueryContext): Promise<Result<AssetType>> {
        return this.getAll<AssetType>(context, "assettypes");
    }

    async getAssets(context: QueryContext): Promise<Result<Asset>> {
        return this.getAll<Asset>(context, 'assets');
    }

    async createAsset(asset: AssetCreateRequest): Promise<Asset> {
        return this.createObject<AssetCreateRequest, Asset>(asset, 'assets');
    }

    async patchAsset(asset: Asset): Promise<Asset> {
        return this.patchObject<Asset, Asset>(asset, "assets");
    }

    //

    // crews

    async getCrews(context: QueryContext): Promise<Result<Crew>> {
        return this.getAll<Crew>(context, "crews");
    }

    async getCrewUserAssociations(context: QueryContext): Promise<Result<CrewUserAssociation>> {
        return this.getAll<CrewUserAssociation>(context, "crewuserassociations");
    }

    //

    // companies
    async getCompanies(context: QueryContext): Promise<Result<Company>> {
        return this.getAll<Company>(context, "companies");
    }

    async createCompany(company: CreateCompanyRequest): Promise<Company> {
        return this.createObject<CreateCompanyRequest, Company>(company, "companies");
    }

    async patchCompany(company: PatchCompanyRequest): Promise<Company> {
        return this.patchObject<PatchCompanyRequest, Company>(company, "companies");
    }

    //

    // users

    async getUserRegionAssociations(context: QueryContext): Promise<Result<UserRegionAssociation>> {
        return this.getAll<UserRegionAssociation>(context, "userregionassociations");
    }

    async getUserPropertyAssociations(context: QueryContext): Promise<Result<UserPropertyAssociation>> {
        return this.getAll<UserPropertyAssociation>(context, "userpropertyassociation");
    }

    //

    async getAttachments(context: QueryContext): Promise<Result<FamisAttachment>> {
        return this.getAll<FamisAttachment>(context, "attachments");
    }

    async getAccountSegments(context: QueryContext): Promise<Result<AccountSegment>> {
        return this.getAll<AccountSegment>(context, "accountsegmentnpfa");
    }

    async getActivityGroups(context: QueryContext): Promise<Result<ActivityGroup>> {
        return this.getAll<ActivityGroup>(context, "activitygroups");
    }

    async getWorkTypes(context: QueryContext): Promise<Result<WorkType>> {
        return this.getAll<WorkType>(context, "worktypes");
    }

    async getProperties(context: QueryContext): Promise<Result<Property>> {
        return this.getAll<Property>(context, "properties");
    }

    async getPropertyRequestTypeAssociations(context: QueryContext): Promise<Result<PropertyRequestTypeAssociation>> {
        return this.getAll<PropertyRequestTypeAssociation>(context, "propertyrequesttypeassociations");
    }

    async getPropertyRegionAssociations(context: QueryContext): Promise<Result<PropertyRegionAssociation>> {
        return this.getAll<PropertyRegionAssociation>(context, "propertyregionassociations");
    }

    async getSpaces(context: QueryContext): Promise<Result<Space>> {
        return this.getAll<Space>(context, "spaces");
    }

    async getFloors(context: QueryContext): Promise<Result<Floor>> {
        return this.getAll<Floor>(context, 'floors');
    }

    async getWorkOrders(context: QueryContext): Promise<Result<WorkOrder>> {
        return this.getAll<WorkOrder>(context, 'workorders');
    }

    async getRequestTypes(context: QueryContext): Promise<Result<RequestType>> {
        return this.getAll<RequestType>(context, 'requesttypes');
    }

    async getRequestSubtypes(context: QueryContext): Promise<Result<RequestSubType>> {
        return this.getAll<RequestSubType>(context, 'requestsubtypes')
    }

    async getRequestPriorities(context: QueryContext): Promise<Result<RequestPriority>> {
        return this.getAll<RequestPriority>(context, 'requestpriorities');
    }

    async getWorkOrderComments(context: QueryContext): Promise<Result<WorkOrderComment>> {
        return this.getAll<WorkOrderComment>(context, 'workordercomments');
    }

    async getRequestStatuses(context: QueryContext): Promise<Result<RequestStatus>> {
        return this.getAll<RequestStatus>(context, 'requeststatuses');
    }

    async getGeoLocations(context: QueryContext): Promise<Result<Geolocation>> {
        return this.getAll<Geolocation>(context, "geolocations");
    }

    // generic get methods

    async getAll<T>(context: QueryContext, type: string): Promise<Result<T>> {
        if (supportsNextLink(type)) {
            return this.getAllUsingLink<T>(context.buildUrl(type));
        } else {
            return this.getAllPaged<T>(context, type);
        }
    }

    async getAllUsingLink<T>(startPath: string): Promise<Result<T>> {
        let fetchCount = 1;
        let durationMs = 0;
        const startDate = new Date();
        let resp = await this.http.get(startPath);
        durationMs += moment(Date.now()).diff(startDate);
        if (resp.status === 401) {
            throw AuthorizationError;
        } else if (resp.status !== 200) {
            throw Error(`http error: status ${resp.status}`);
        }
        const itemResponse = resp.data as FamisResponse<T>;
        let nextLink = itemResponse["@odata.nextLink"] as string;
        if (nextLink) {
            nextLink = nextLink.replace("http:", "https:");
        }
        let items = itemResponse.value;

        while (nextLink) {
            fetchCount++;
            const innerStartDate = new Date();
            resp = await this.http.get(nextLink);
            durationMs += moment(Date.now()).diff(innerStartDate);
            if (resp.status !== 200) {
                if (resp.status === 401) {
                    throw AuthorizationError;
                }
                throw Error(`error: status ${resp.status}`);
            }
            const newResponse = resp.data as FamisResponse<T>;
            items = items.concat(newResponse.value);
            nextLink = newResponse['@odata.nextLink'] as string;
            if (nextLink) {
                nextLink = nextLink.replace("http:", "https:");
            }
        }
        return {
            results: items,
            totalDuration: durationMs,
            averageDuration: durationMs / fetchCount
        };
    }

    async getAllPaged<T>(context: QueryContext, type: string): Promise<Result<T>> {
        const top = 500;
        let skip = 0;
        let count = 500;
        let items: T[] = [];
        let fetchCount = 0;
        let durationMs = 0;

        while (count >= top) {
            fetchCount++;
            const startDate = new Date();
            const url = context.buildPagedUrl(type, top, skip);
            const resp = await this.http.get(url);
            durationMs += moment(Date.now()).diff(startDate);
            if (resp.status === 401) {
                throw AuthorizationError;
            } else if (resp.status !== 200) {
                throw Error(`http error: status ${resp.status}`);
            }
            const famisResp = resp.data as FamisResponse<T>;
            items = items.concat(famisResp.value)
            skip += top;
            count = famisResp.value.length;
        }
        return {
            averageDuration: durationMs / fetchCount,
            results: items,
            totalDuration: durationMs
        };
    }

    //

    // generic requests

    async createObject<T, K>(toCreate: T, entity: string): Promise<K> {
        const url = buildEntityUrl(entity);
        const resp = await this.http.post(url, toCreate);
        if (resp.status === 401) {
            throw AuthorizationError;
        } else if (resp.status !== 200) {
            const errorResponse = resp.data as FamisErrorResponse;
            if (errorResponse.Message) {
                throw Error(`error; message: ${errorResponse.Message}`);
            }
            throw Error(`http error: status ${resp.status}`);
        }

        return resp.data as K;
    }

    async patchObject<T, K>(patch: T, entity: string): Promise<K> {
        const url = buildEntityUrl(entity);
        const resp = await this.http.patch(url, patch);
        if (resp.status === 401) {
            throw AuthorizationError;
        } else if (resp.status !== 200) {
            const errorResponse = resp.data as FamisErrorResponse;
            if (errorResponse.Message) {
                throw Error(`error; message: ${errorResponse.Message}`);
            }
            throw Error(`http error: status ${resp.status}`);
        }

        return resp.data as K;
    }

    //
}

function supportsNextLink(type: string): boolean {
    if (type === 'workorders') {
        return false;
    } else if (type === "propertyregionassociations") {
        return false;
    } else if (type === "userregionassociations") {
        return false;
    } else if (type === "propertyrequesttypeassociations") {
        return false;
    } else if (type === "userpropertyassociation") {
        return false;
    }
    return true;
}

