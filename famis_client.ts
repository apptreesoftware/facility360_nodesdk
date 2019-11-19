import axios, { AxiosInstance } from "axios";
import { AuthCredential } from "./auth";
import { AuthorizationError } from "./errors";
import * as AxiosLogger from "axios-logger";
import {
  AccountSegment,
  ActivityGroup,
  CrewUserAssociation,
  FamisAttachment,
  FamisErrorResponse,
  FamisResponse,
  Floor,
  Property,
  PropertyRegionAssociation,
  PropertyRequestTypeAssociation,
  RequestPriority,
  RequestStatus,
  RequestSubType,
  RequestType,
  Space,
  UserPropertyAssociation,
  UserRegionAssociation,
  WorkOrder,
  WorkOrderComment,
  WorkType
} from "./model/famis_models";
import { buildEntityUrl, QueryContext } from "./model/request_context";
import {
  Asset,
  AssetClass,
  AssetCreateRequest,
  AssetKeyword,
  AssetMake,
  AssetModel,
  AssetStatus,
  CreateAssetMake,
  CreateAssetModel
} from "./model/assets";
import { Result } from "./model/common";
import moment = require("moment");

export class FamisClient {
  host: string;
  http: AxiosInstance;
  credentials: AuthCredential;

  constructor(credentials: AuthCredential, host: string) {
    this.credentials = credentials;
    this.host = host;
    this.http = axios.create({
      baseURL: host
    });
    this.http.interceptors.request.use(async config => {
      this.credentials = await this.credentials.refresh();
      config.headers.Authorization = this.credentials.accessToken;
      return config;
    });
    this.http.interceptors.request.use(
      AxiosLogger.requestLogger,
      AxiosLogger.errorLogger
    );
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

  async getAssets(context: QueryContext): Promise<Result<Asset>> {
    return this.getAll<Asset>(context, "assets");
  }

  async createAsset(asset: AssetCreateRequest): Promise<Asset> {
    return this.createObject<AssetCreateRequest, Asset>(asset, "assets");
  }

  async patchAsset(asset: Asset): Promise<Asset> {
    const resp = await this.http.patch(buildEntityUrl("assets"), asset);
    if (resp.status === 401) {
      throw AuthorizationError;
    } else if (resp.status !== 200) {
      const errorResponse = resp.data as FamisErrorResponse;
      if (errorResponse.Message) {
        throw Error(`error; message: ${errorResponse.Message}`);
      }
      throw Error(`http error: status ${resp.status}`);
    }

    return resp.data as Asset;
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

  async getPropertyRequestTypeAssociations(
    context: QueryContext
  ): Promise<Result<PropertyRequestTypeAssociation>> {
    return this.getAll<PropertyRequestTypeAssociation>(
      context,
      "propertyrequesttypeassociations"
    );
  }

  async getCrewUserAssociations(
    context: QueryContext
  ): Promise<Result<CrewUserAssociation>> {
    return this.getAll<CrewUserAssociation>(context, "crewuserassociations");
  }

  async getGeoLocations(context: QueryContext): Promise<Result<Geolocation>> {
    return this.getAll<Geolocation>(context, "geolocations");
  }

  async getSpaces(context: QueryContext): Promise<Result<Space>> {
    return this.getAll<Space>(context, "spaces");
  }

  async getFloors(context: QueryContext): Promise<Result<Floor>> {
    return this.getAll<Floor>(context, "floors");
  }

  async getWorkOrders(context: QueryContext): Promise<Result<WorkOrder>> {
    return this.getAll<WorkOrder>(context, "workorders");
  }

  async getRequestTypes(context: QueryContext): Promise<Result<RequestType>> {
    return this.getAll<RequestType>(context, "requesttypes");
  }

  async getPropertyRegionAssociations(
    context: QueryContext
  ): Promise<Result<PropertyRegionAssociation>> {
    return this.getAll<PropertyRegionAssociation>(
      context,
      "propertyregionassociations"
    );
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
    let startDate = new Date();
    let resp = await this.http.get(startPath);
    durationMs += moment(Date.now()).diff(startDate);
    if (resp.status === 401) {
      throw AuthorizationError;
    } else if (resp.status !== 200) {
      throw Error(`http error: status ${resp.status}`);
    }
    let itemResponse = resp.data as FamisResponse<T>;
    let nextLink = itemResponse["@odata.nextLink"] as string;
    if (nextLink) {
      nextLink = nextLink.replace("http:", "https:");
    }
    let items = itemResponse.value;

    while (nextLink) {
      fetchCount++;
      let startDate = new Date();
      resp = await this.http.get(nextLink);
      durationMs += moment(Date.now()).diff(startDate);
      if (resp.status !== 200) {
        if (resp.status === 401) {
          throw AuthorizationError;
        }
        throw Error(`error: status ${resp.status}`);
      }
      let newResponse = resp.data as FamisResponse<T>;
      items = items.concat(newResponse.value);
      nextLink = newResponse["@odata.nextLink"] as string;
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

  async getAllPaged<T>(
    context: QueryContext,
    type: string
  ): Promise<Result<T>> {
    const top = 1000;
    let skip = 0;
    let count = 1000;
    let items: T[] = [];
    let fetchCount = 0;
    let durationMs = 0;
    while (count >= top) {
      fetchCount++;
      let startDate = new Date();
      let url = context.buildPagedUrl(type, top, skip);
      let resp = await this.http.get(url);
      durationMs += moment(Date.now()).diff(startDate);
      if (resp.status === 401) {
        throw AuthorizationError;
      } else if (resp.status !== 200) {
        throw Error(`http error: status ${resp.status}`);
      }
      let famisResp = resp.data as FamisResponse<T>;
      items = items.concat(famisResp.value);
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

  // generic create request

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
  }
  return true;
}
