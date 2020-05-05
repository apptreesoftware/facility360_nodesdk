import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import { AuthCredential, AuthState } from "./auth";
import { AuthorizationError } from "./errors";
import {
  AccountSegment,
  ActivityGroup,
  Asset,
  AssetClass,
  AssetKeyword,
  AssetMake,
  AssetModel,
  AssetStatus,
  AssetType,
  Company,
  CreateAssetMake,
  CreateAssetModel,
  Crew,
  CrewUserAssociation, Department,
  FamisAttachment,
  FamisErrorResponse,
  FamisResponse, FamisUser,
  Floor,
  Property,
  PropertyRegionAssociation,
  PropertyRequestTypeAssociation,
  RequestPriority,
  RequestStatus,
  RequestSubType,
  RequestType,
  Space, SpaceClass,
  UserPropertyAssociation,
  UserRegionAssociation,
  WorkOrder,
  WorkOrderComment,
  WorkType
} from "./model/famis_models";
import { buildEntityUrl, QueryContext } from "./model/request_context";

import { Result } from "./model/common";
import {
  AssetCreateRequest,
  CreateCompanyRequest,
  PatchCompanyRequest, PatchWorkOrderRequest
} from "./model/request_models";
import moment = require("moment");

export class FamisClient {
  host: string;
  http: AxiosInstance;
  credentials: AuthCredential;
  autoRefresh: boolean;
  debug: boolean;

  constructor(credentials: AuthCredential, host: string, autoRefresh: boolean, debug: boolean = false) {
    this.credentials = credentials;
    this.host = host;
    this.http = axios.create({
      baseURL: host
    });
    this.debug = debug;
    this.autoRefresh = autoRefresh;
    this.http.interceptors.request.use(async config => {
      if (this.autoRefresh) {
        this.credentials = await this.credentials.refresh();
      }
      config.headers.Authorization = this.credentials.accessToken;
      return config;
    });
  }

  async refreshCredentials(): Promise<[AuthCredential, AuthState]> {
    const credTuple = await this.credentials.refreshIfNeeded();
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
    return this.createObject<CreateAssetMake, AssetMake>(
      assetMake,
      "assetmakes"
    );
  }

  async getAssetModels(context: QueryContext): Promise<Result<AssetModel>> {
    return this.getAll<AssetModel>(context, "assetmodels");
  }

  async createAssetModel(assetModel: CreateAssetModel): Promise<AssetModel> {
    return this.createObject<CreateAssetModel, AssetModel>(
      assetModel,
      "assetmodels"
    );
  }

  async getAssetTypes(context: QueryContext): Promise<Result<AssetType>> {
    return this.getAll<AssetType>(context, "assettypes");
  }

  async getAssets(context: QueryContext): Promise<Result<Asset>> {
    return this.getAll<Asset>(context, "assets");
  }

  async getAssetsBatch(context: QueryContext) : Promise<Result<Asset>> {
    return this.getAllBatch<Asset>(context, "assets");
  }


  async createAsset(asset: AssetCreateRequest): Promise<Asset> {
    return this.createObject<AssetCreateRequest, Asset>(asset, "assets");
  }

  async patchAsset(asset: Asset): Promise<Asset> {
    return this.patchObject<Asset, Asset>(asset, "assets", asset.Id.toString());
  }

  //

  // crews

  async getCrews(context: QueryContext): Promise<Result<Crew>> {
    return this.getAll<Crew>(context, "crews");
  }

  async getCrewUserAssociations(
    context: QueryContext
  ): Promise<Result<CrewUserAssociation>> {
    return this.getAll<CrewUserAssociation>(context, "crewuserassociations");
  }

  //

  // companies
  async getCompanies(context: QueryContext): Promise<Result<Company>> {
    return this.getAll<Company>(context, "companies");
  }

  async createCompany(company: CreateCompanyRequest): Promise<Company> {
    return this.createObject<CreateCompanyRequest, Company>(
      company,
      "companies"
    );
  }

  async patchCompany(company: PatchCompanyRequest): Promise<Company> {
    return this.patchObject<PatchCompanyRequest, Company>(company, "companies", company.Id.toString());
  }

  //

  // users

  async getUsers(context : QueryContext) : Promise<Result<FamisUser>> {
    return this.getAll(context, "users");
  }

  async getUsersBatch(context: QueryContext) : Promise<Result<FamisUser>> {
    return this.getAllBatch<FamisUser>(context, "users");
  }

  async getUserRegionAssociations(
    context: QueryContext
  ): Promise<Result<UserRegionAssociation>> {
    return this.getAll<UserRegionAssociation>(
      context,
      "userregionassociations"
    );
  }

  async getUserPropertyAssociations(
    context: QueryContext
  ): Promise<Result<UserPropertyAssociation>> {
    return this.getAll<UserPropertyAssociation>(
      context,
      "userpropertyassociation"
    );
  }

  //

  // work orders

  async getWorkOrders(context: QueryContext): Promise<Result<WorkOrder>> {
    return this.getAll<WorkOrder>(context, "workorders");
  }

  async patchWorkOrder(workOrderId: string, workOrder: PatchWorkOrderRequest): Promise<WorkOrder> {
    return this.patchObject<PatchWorkOrderRequest, WorkOrder>(workOrder, "workorders", workOrderId);
  }

  //
  async getAttachments(
    context: QueryContext
  ): Promise<Result<FamisAttachment>> {
    return this.getAll<FamisAttachment>(context, "attachments");
  }

  async getAccountSegments(
    context: QueryContext
  ): Promise<Result<AccountSegment>> {
    return this.getAll<AccountSegment>(context, "accountsegmentnpfa");
  }

  async getActivityGroups(
    context: QueryContext
  ): Promise<Result<ActivityGroup>> {
    return this.getAll<ActivityGroup>(context, "activitygroups");
  }

  async getWorkTypes(context: QueryContext): Promise<Result<WorkType>> {
    return this.getAll<WorkType>(context, "worktypes");
  }

  async getProperties(context: QueryContext): Promise<Result<Property>> {
    return this.getAll<Property>(context, "properties");
  }

  async getPropertiesBatch(context: QueryContext) : Promise<Result<Property>> {
    return this.getAllBatch<Property>(context, "properties");
  }


  async getPropertyRequestTypeAssociations(
    context: QueryContext
  ): Promise<Result<PropertyRequestTypeAssociation>> {
    return this.getAll<PropertyRequestTypeAssociation>(
      context,
      "propertyrequesttypeassociations"
    );
  }

  async getPropertyRegionAssociations(
    context: QueryContext
  ): Promise<Result<PropertyRegionAssociation>> {
    return this.getAll<PropertyRegionAssociation>(
      context,
      "propertyregionassociations"
    );
  }

  async getSpaces(context: QueryContext): Promise<Result<Space>> {
    return this.getAll<Space>(context, "spaces");
  }

  async getSpaceClasses(context: QueryContext): Promise<Result<SpaceClass>> {
    return this.getAll<SpaceClass>(context, "spaceclasses");
  }

  async getFloors(context: QueryContext): Promise<Result<Floor>> {
    return this.getAll<Floor>(context, "floors");
  }

  async getRequestTypes(context: QueryContext): Promise<Result<RequestType>> {
    return this.getAll<RequestType>(context, "requesttypes");
  }

  async getRequestSubtypes(
    context: QueryContext
  ): Promise<Result<RequestSubType>> {
    return this.getAll<RequestSubType>(context, "requestsubtypes");
  }

  async getRequestPriorities(
    context: QueryContext
  ): Promise<Result<RequestPriority>> {
    return this.getAll<RequestPriority>(context, "requestpriorities");
  }

  async getWorkOrderComments(
    context: QueryContext
  ): Promise<Result<WorkOrderComment>> {
    return this.getAll<WorkOrderComment>(context, "workordercomments");
  }

  async getRequestStatuses(
    context: QueryContext
  ): Promise<Result<RequestStatus>> {
    return this.getAll<RequestStatus>(context, "requeststatuses");
  }

  async getGeoLocations(context: QueryContext): Promise<Result<Geolocation>> {
    return this.getAll<Geolocation>(context, "geolocations");
  }

  async getDepartments(context: QueryContext): Promise<Result<Department>> {
    return this.getAll<Department>(context, "departments");
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
      nextLink = newResponse["@odata.nextLink"] as string;
      if (nextLink) {
        nextLink = nextLink.replace("http:", "https:");
      }
    }
    return {
      first: items.length > 0 ? items[0] : null,
      results: items,
      totalDuration: durationMs,
      averageDuration: durationMs / fetchCount
    };
  }


  async getAllBatch<T>(context: QueryContext, type: string) : Promise<Result<T>> {
    let top = 1000;
    const url = context.buildPagedUrl(type, top, 0, true);
    const resp = await this.http.get(url);
    let items: T[] = [];
    let durationMs = 0;
    const startDate = new Date();

    if (resp.status === 401) {
      throw AuthorizationError;
    } else if (resp.status !== 200) {
      throw Error(`http error: status ${resp.status}`);
    }
    const famisResp = resp.data as FamisResponse<T>;
    if (this.debug) {
      console.log(`Received ${famisResp.value.length} records from ${url}`);
    }
    items = items.concat(famisResp.value);
    const totalCount = famisResp["@odata.count"] ?? 0;
    durationMs = moment(Date.now()).diff(startDate);

    if (totalCount <= items.length) {
      return {
        first: items.length > 0 ? items[0] : null,
        averageDuration: durationMs / totalCount,
        results: items,
        totalDuration: durationMs
      };
    }
    const pageCount = Math.ceil(totalCount / top);
    const promises = [];
    for (let i = 1; i < pageCount; i++) {
      const url = context.buildPagedUrl(type, top, i * top);
      const req = this.http.get(url).then((resp : AxiosResponse<FamisResponse<T>>) => {
        if (resp.status === 401) {
          throw AuthorizationError;
        } else if (resp.status !== 200) {
          throw Error(`http error: status ${resp.status}`);
        }
        if (this.debug) {
          console.log(`Received ${resp.data.value.length} records from ${url}`);
        }
        items = items.concat(resp.data.value);
      }).catch((e : AxiosError) => {
        if (e.response?.status === 401) {
          throw AuthorizationError;
        } else if (e.response?.status !== 200) {
          throw Error(`http error: status ${resp.status}`);
        } else {
          throw e;
        }
      })
      promises.push(req);
    }

    await Promise.all(promises);
    durationMs = moment(Date.now()).diff(startDate);
    return {
      first: items.length > 0 ? items[0] : null,
      averageDuration: durationMs / totalCount,
      results: items,
      totalDuration: durationMs
    };
  }

  async getAllPaged<T>(
    context: QueryContext,
    type: string
  ): Promise<Result<T>> {
    let fetchAll = true;
    let top = 1000;
    if (context.top) {
      fetchAll = false;
      top = context.top;
    }
    let skip = context.skip ?? 0;
    let count = top;
    let items: T[] = [];
    let fetchCount = 0;
    let durationMs = 0;

    while (count >= top) {
      fetchCount++;
      const startDate = new Date();
      const url = context.buildPagedUrl(type, top, skip);
      if (this.debug) {
        console.log(`Fetching ${url}`);
      }
      const resp = await this.http.get(url);
      durationMs += moment(Date.now()).diff(startDate);
      if (resp.status === 401) {
        throw AuthorizationError;
      } else if (resp.status !== 200) {
        throw Error(`http error: status ${resp.status}`);
      }
      const famisResp = resp.data as FamisResponse<T>;
      if (this.debug) {
        console.log(`Received ${famisResp.value.length} records from ${url}`);
      }
      items = items.concat(famisResp.value);

      skip += top;
      count = famisResp.value.length;
      if (!fetchAll) {
        break;
      }
    }
    return {
      first: items.length > 0 ? items[0] : null,
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

  async patchObject<T, K>(patch: T, entity: string, entityId: string): Promise<K> {
    let url = buildEntityUrl(entity);
    url += `?key=${entityId}`;
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
  if (type === "workorders") {
    return false;
  } else if (type === "propertyregionassociations") {
    return false;
  } else if (type === "userregionassociations") {
    return false;
  } else if (type === "propertyrequesttypeassociations") {
    return false;
  } else if (type === "userpropertyassociation") {
    return false;
  } else if (type === "assets") {
    return false;
  }
  return true;
}
