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
  async getAssetClasses(context: QueryContext): Promise<AssetClass[]> {
    return this.getAll<AssetClass>(context, "assetclasses");
  }

  async getAssetKeywords(context: QueryContext): Promise<AssetKeyword[]> {
    return this.getAll<AssetKeyword>(context, "assetkeywords");
  }

  async getAssetStatuses(context: QueryContext): Promise<AssetStatus[]> {
    return this.getAll<AssetStatus>(context, "assetstatuses");
  }

  async getAssetMakes(context: QueryContext): Promise<AssetMake[]> {
    return this.getAll<AssetMake>(context, "assetmakes");
  }

  async createAssetMake(assetMake: AssetMake): Promise<AssetMake> {
    return this.createObject<CreateAssetMake, AssetMake>(
      assetMake,
      "assetmakes"
    );
  }

  async getAssetModels(context: QueryContext): Promise<AssetModel[]> {
    return this.getAll<AssetModel>(context, "assetmodels");
  }

  async createAssetModel(assetModel: CreateAssetModel): Promise<AssetModel> {
    return this.createObject<CreateAssetModel, AssetModel>(
      assetModel,
      "assetmodels"
    );
  }

  async getAssets(context: QueryContext): Promise<Asset[]> {
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

  async getAttachments(context: QueryContext): Promise<FamisAttachment[]> {
    return this.getAll<FamisAttachment>(context, "attachments");
  }

  async getAccountSegments(context: QueryContext): Promise<AccountSegment[]> {
    return this.getAll<AccountSegment>(context, "accountsegmentnpfa");
  }

  async getActivityGroups(context: QueryContext): Promise<ActivityGroup[]> {
    return this.getAll<ActivityGroup>(context, "activitygroups");
  }

  async getWorkTypes(context: QueryContext): Promise<WorkType[]> {
    return this.getAll<WorkType>(context, "worktypes");
  }

  async getProperties(context: QueryContext): Promise<Property[]> {
    return this.getAll<Property>(context, "properties");
  }

  async getPropertyRequestTypeAssociations(
    context: QueryContext
  ): Promise<PropertyRequestTypeAssociation[]> {
    return this.getAll<PropertyRequestTypeAssociation>(
      context,
      "propertyrequesttypeassociations"
    );
  }

  async getCrewUserAssociations(
    context: QueryContext
  ): Promise<CrewUserAssociation[]> {
    return this.getAll<CrewUserAssociation>(context, "crewuserassociations");
  }

  async getGeoLocations(context: QueryContext): Promise<Geolocation[]> {
    return this.getAll<Geolocation>(context, "geolocations");
  }

  async getSpaces(context: QueryContext): Promise<Space[]> {
    return this.getAll<Space>(context, "spaces");
  }

  async getFloors(context: QueryContext): Promise<Floor[]> {
    return this.getAll<Floor>(context, "floors");
  }

  async getWorkOrders(context: QueryContext): Promise<WorkOrder[]> {
    return this.getAll<WorkOrder>(context, "workorders");
  }

  async getRequestTypes(context: QueryContext): Promise<RequestType[]> {
    return this.getAll<RequestType>(context, "requesttypes");
  }

  async getPropertyRegionAssociations(
    context: QueryContext
  ): Promise<PropertyRegionAssociation[]> {
    return this.getAll<PropertyRegionAssociation>(
      context,
      "propertyregionassociations"
    );
  }

  async getUserRegionAssociations(
    context: QueryContext
  ): Promise<UserRegionAssociation[]> {
    return this.getAll<UserRegionAssociation>(
      context,
      "userregionassociations"
    );
  }

  async getRequestSubtypes(context: QueryContext): Promise<RequestSubType[]> {
    return this.getAll<RequestSubType>(context, "requestsubtypes");
  }

  async getRequestPriorities(
    context: QueryContext
  ): Promise<RequestPriority[]> {
    return this.getAll<RequestPriority>(context, "requestpriorities");
  }

  async getWorkOrderComments(
    context: QueryContext
  ): Promise<WorkOrderComment[]> {
    return this.getAll<WorkOrderComment>(context, "workordercomments");
  }

  async getRequestStatuses(context: QueryContext): Promise<RequestStatus[]> {
    return this.getAll<RequestStatus>(context, "requeststatuses");
  }

  // generic get methods

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
    let nextLink = itemResponse["@odata.nextLink"] as string;
    if (nextLink) {
      nextLink = nextLink.replace("http:", "https:");
    }
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
      nextLink = newResponse["@odata.nextLink"] as string;
      if (nextLink) {
        nextLink = nextLink.replace("http:", "https:");
      }
    }
    return items;
  }

  async getAllPaged<T>(context: QueryContext, type: string): Promise<T[]> {
    const top = 1000;
    let skip = 0;
    let count = 1000;
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
      items = items.concat(famisResp.value);
      skip += top;
      count = famisResp.value.length;
    }
    return items;
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
  }
  return true;
}
