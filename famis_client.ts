import axios from 'axios';
import Axios, {AxiosError, AxiosInstance, AxiosResponse, Method} from 'axios';
import {ApiError, AuthorizationError} from './errors';
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
  CreateAssetAttachment,
  CreateAssetMake,
  CreateAssetModel,
  Crew,
  CrewUserAssociation,
  Department,
  FamisAttachment,
  FamisResponse,
  FamisUser,
  Floor,
  Property,
  PropertyRegionAssociation,
  PropertyRequestTypeAssociation,
  RequestPriority,
  RequestStatus,
  RequestSubType,
  RequestType, RequestTypeActivityGroupAssociations,
  Space,
  SpaceClass, UserActivityGroupAssociations,
  UserPropertyAssociation,
  UserRegionAssociation,
  WorkOrder,
  WorkOrderComment,
  WorkType
} from './model/famis_models';
import {buildEntityUrl, QueryContext} from './model/request_context';
import * as AxiosLogger from 'axios-logger';
import {Result} from './model/common';
import {
  AssetCreateRequest,
  CreateCompanyRequest,
  FamisOAuthCredential,
  LoginResponse,
  PatchCompanyRequest,
  PatchWorkOrderRequest
} from './model/request_models';
import _ from 'lodash';
import moment = require('moment');

type ResultCallback<T> = (results: FamisResponse<T>) => void;

export const DefaultUserSelect = [
  'Id',
  'FirstName',
  'LastName',
  'Title',
  'BusPhone',
  'UserName',
  'Name',
  'Email'
];
export const DefaultPropertySelect = ['Id', 'Name', 'Addr1', 'City', 'StateId', 'Zip'];
export const DefaultPropertyExpand = [
  'State($select=Id,CountryName,Name,Abbreviation,Description,StateCode)'
];
export const DefaultSpaceSelect = ['Id', 'Name', 'LongDescription'];

export class FamisClient {
  host: string;
  http: AxiosInstance;
  credentials: FamisOAuthCredential;
  autoRefresh: boolean;
  debug: boolean;

  static async withLoginCredential(opts: {
    username: string;
    password: string;
    host: string;
    autoRefresh?: boolean;
    debug?: boolean;
  }) {
    const cred = await this.login({
      username: opts.username,
      password: opts.password,
      url: opts.host
    });
    if (opts.debug) {
      console.log(`Logged in with ${JSON.stringify(cred)}`);
    }
    console.log();
    return new FamisClient(cred.Item, opts.host, opts.autoRefresh ?? false, opts.debug ?? false);
  }

  static async login(opts: {
    username: string;
    password: string;
    url: string;
  }): Promise<LoginResponse> {
    const http = axios.create({
      baseURL: opts.url
    });
    console.log(`Logging into ${opts.url}. ${(opts.username, opts.password)}`);
    const resp = await http.post('MobileWebServices/api/Login', {
      username: opts.username,
      password: opts.password
    });
    try {
      const loginResponse = resp.data as LoginResponse;
      if (!loginResponse.Result) {
        throw AuthorizationError;
      }
      return loginResponse;
    } catch (e) {
      throw AuthorizationError;
    }
  }

  static async refreshCredential(opts: {
    refreshToken: string;
    url: string;
  }): Promise<FamisOAuthCredential> {
    try {
      console.log(`Refreshing with token: ${opts.refreshToken}`);
      const resp = await Axios.post(
        `${opts.url}/MobileWebServices/api/refreshtoken`,
        {
          grant_type: 'bearer',
          refresh_token: opts.refreshToken
        },
        {
          validateStatus: s => true
        }
      );
      const loginResponse = resp.data as LoginResponse;
      console.log(`Refresh response: ${JSON.stringify(loginResponse)}`);
      if (!loginResponse.Result) {
        throw AuthorizationError;
      }
      return loginResponse.Item;
    } catch (e) {
      console.log(e);
      throw AuthorizationError;
    }
  }

  constructor(
    credentials: FamisOAuthCredential,
    host: string,
    autoRefresh: boolean,
    debug: boolean = false
  ) {
    this.credentials = credentials;
    this.host = host;
    this.http = axios.create({
      baseURL: host,
      validateStatus: status => true
    });
    this.debug = debug;
    this.autoRefresh = autoRefresh;
    this.http.interceptors.request.use(async config => {
      if (this.autoRefresh && FamisClient.isCredentialExpired(this.credentials)) {
        this.credentials = await this.refreshAuthCredential();
      }
      config.headers.Authorization =
        this.credentials.token_type + ' ' + this.credentials.access_token;
      config.transformRequest;
      return config;
    });
    if (debug) {
      this.http.interceptors.request.use(AxiosLogger.requestLogger);
      this.http.interceptors.response.use(AxiosLogger.responseLogger);
    }
  }

  async refreshAuthCredential(): Promise<FamisOAuthCredential> {
    return FamisClient.refreshCredential({
      refreshToken: this.credentials.refresh_token,
      url: this.host
    });
  }

  static isCredentialExpired(cred: FamisOAuthCredential): boolean {
    const m = moment(cred['.expires']);
    console.log(`Expiration date: ${m.toDate()}`);
    const now = moment(Date.now()).subtract(10, 'seconds');
    const expired = now.isAfter(m);
    console.log(`Credential is expired ${expired}`);
    return expired;
  }

  // Assets
  async getAssetClasses(context: QueryContext): Promise<Result<AssetClass>> {
    return this.getAll<AssetClass>(context, 'assetclasses');
  }

  async getAssetKeywords(context: QueryContext): Promise<Result<AssetKeyword>> {
    return this.getAll<AssetKeyword>(context, 'assetkeywords');
  }

  async getAssetStatuses(context: QueryContext): Promise<Result<AssetStatus>> {
    return this.getAll<AssetStatus>(context, 'assetstatuses');
  }

  async getAssetMakes(context: QueryContext): Promise<Result<AssetMake>> {
    return this.getAll<AssetMake>(context, 'assetmakes');
  }

  async createAssetMake(assetMake: AssetMake): Promise<AssetMake> {
    return this.createObject<CreateAssetMake, AssetMake>(assetMake, 'assetmakes');
  }

  async getAssetModels(context: QueryContext): Promise<Result<AssetModel>> {
    return this.getAll<AssetModel>(context, 'assetmodels');
  }

  async createAssetModel(assetModel: CreateAssetModel): Promise<AssetModel> {
    return this.createObject<CreateAssetModel, AssetModel>(assetModel, 'assetmodels');
  }

  async getAssetTypes(context: QueryContext): Promise<Result<AssetType>> {
    return this.getAll<AssetType>(context, 'assettypes');
  }

  async getAssets(context: QueryContext): Promise<Result<Asset>> {
    return this.getAll<Asset>(context, 'assets');
  }

  async getAllAssetsBatch(context: QueryContext, callback: ResultCallback<Asset>): Promise<void> {
    return this.getAllBatch(context, 'assets', callback);
  }

  async createAsset(asset: AssetCreateRequest): Promise<Asset> {
    return this.createObject<AssetCreateRequest, Asset>(asset, 'assets');
  }

  async patchAsset(asset: Asset): Promise<Asset> {
    return this.patchObject<Asset, Asset>(asset, 'assets', asset.Id.toString());
  }

  async createAssetAttachment(attachment: CreateAssetAttachment): Promise<void> {
    const url = buildEntityUrl('assetattachments');
    const resp = await this.http.post(url, attachment);
    this.throwResponseError(resp);
  }

  //

  // crews

  async getCrews(context: QueryContext): Promise<Result<Crew>> {
    return this.getAll<Crew>(context, 'crews');
  }

  async getCrewUserAssociations(context: QueryContext): Promise<Result<CrewUserAssociation>> {
    return this.getAll<CrewUserAssociation>(context, 'crewuserassociations');
  }

  async getCrewsForUser(opts: { userId: number }): Promise<Crew[]> {
    const crewAssocs = await this.getCrewUserAssociations(new QueryContext().setFilter(`UserId eq ${opts.userId}`));
    const crewIds = crewAssocs.results.map(c => c.CrewId);
    return this.getCrewsByIds({ids: crewIds});
  }

  async getCrewsByIds(opts: { ids: number[] }): Promise<Crew[]> {
    const chunks = _.chunk(opts.ids, 10);
    const promises = [];
    const crews: Crew[] = [];
    for (const chunk of chunks) {
      const filterString = chunk.map(c => `Id eq ${c}`).join(' or ');
      const promise = this.getCrews(new QueryContext().setFilter(filterString)).then(res => crews.push(...res.results));
      promises.push(promise);
    }
    await Promise.all(promises);
    return crews;
  }

  //

  // companies
  async getCompanies(context: QueryContext): Promise<Result<Company>> {
    return this.getAll<Company>(context, 'companies');
  }

  async createCompany(company: CreateCompanyRequest): Promise<Company> {
    return this.createObject<CreateCompanyRequest, Company>(company, 'companies');
  }

  async patchCompany(company: PatchCompanyRequest): Promise<Company> {
    return this.patchObject<PatchCompanyRequest, Company>(
      company,
      'companies',
      company.Id.toString()
    );
  }

  //

  // users

  async getUsers(context: QueryContext): Promise<Result<FamisUser>> {
    return this.getAll(context, 'users');
  }

  async getUserById(id: number, select: string[] = DefaultUserSelect): Promise<FamisUser | null> {
    const res = await this.getUsers(
      new QueryContext().setFilter(`Id eq ${id}`).setSelect(select.join(','))
    );
    return res.first;
  }

  async getUserByUsername(
    username: string,
    select: string[] = DefaultUserSelect
  ): Promise<FamisUser | null> {
    const res = await this.getUsers(
      new QueryContext().setFilter(`UserName eq '${username}'`).setSelect(select.join(','))
    );
    return res.first;
  }

  async getAllUsersBatch(
    context: QueryContext,
    callback: ResultCallback<FamisUser>
  ): Promise<void> {
    return this.getAllBatch<FamisUser>(context, 'users', callback);
  }

  async getUserRegionAssociations(context: QueryContext): Promise<Result<UserRegionAssociation>> {
    return this.getAll<UserRegionAssociation>(context, 'userregionassociations');
  }

  async getUserPropertyAssociations(
    context: QueryContext
  ): Promise<Result<UserPropertyAssociation>> {
    return this.getAll<UserPropertyAssociation>(context, 'userpropertyassociation');
  }

  async getUserActivityGroupAssociations(context: QueryContext): Promise<Result<UserActivityGroupAssociations>> {
    return this.getAll<UserActivityGroupAssociations>(context, 'useractivitygroupassociations');
  }

  async getUsersForRequestType(opts: { requestTypeId: number, select?: string[], expand?: string[], includeInactive?: boolean }): Promise<FamisUser[]> {
    const assocs = await this.getRequestTypeActivityGroupAssociations(new QueryContext().setFilter(`RequestTypeId eq ${opts.requestTypeId}`));
    const activityGroupIds = assocs.results.map(a => a.ActivityGroupId);
    return this.getUsersForActivityGroups(
      {
        activityGroupIds: activityGroupIds,
        select: opts.select,
        expand: opts.expand,
        includeInactive: opts.includeInactive
      }
    );
  }

  async getUsersForActivityGroups(opts: { activityGroupIds: number[], select?: string[], expand?: string[], includeInactive?: boolean }): Promise<FamisUser[]> {
    const userActivityGroupAssocs: UserActivityGroupAssociations[] = [];
    const assocPromises = [];
    for (const activityId of opts.activityGroupIds) {
      const promise = this.getUserActivityGroupAssociations(
        new QueryContext()
          .setFilter(`AllowAssignmentFlag eq true and ActivityGroupId eq ${activityId}`)
      ).then(res => userActivityGroupAssocs.push(...res.results));
      assocPromises.push(promise);
    }
    await Promise.all(assocPromises);
    const userIds = [...new Set(userActivityGroupAssocs.map(a => a.UserId))];
    const select = opts.select ?? DefaultUserSelect;
    const chunks = _.chunk(userIds, 10);
    const promises = [];
    const users: FamisUser[] = [];
    for (const chunk of chunks) {
      let filter = chunk.map(c => `Id eq ${c}`).join(' or ');
      if (!opts.includeInactive) {
        filter = `(${filter}) and ActiveFlag eq true`
      }
      const promise = this.getUsers(
        new QueryContext()
          .setSelect(select.join(','))
          .setFilter(filter)
          .setExpand(opts.expand ? opts.expand.join(',') : ''))
        .then(res => users.push(...res.results)
        );
      promises.push(promise);
    }
    await Promise.all(promises);
    return users;
  }

  //

  // work orders

  async getWorkOrders(context: QueryContext): Promise<Result<WorkOrder>> {
    return this.getAll<WorkOrder>(context, 'workorders');
  }

  async patchWorkOrder(workOrderId: string, workOrder: PatchWorkOrderRequest): Promise<WorkOrder> {
    return this.patchObject<PatchWorkOrderRequest, WorkOrder>(workOrder, 'workorders', workOrderId);
  }

  //
  async getAttachments(context: QueryContext): Promise<Result<FamisAttachment>> {
    return this.getAll<FamisAttachment>(context, 'attachments');
  }

  async getAccountSegments(context: QueryContext): Promise<Result<AccountSegment>> {
    return this.getAll<AccountSegment>(context, 'accountsegmentnpfa');
  }

  async getActivityGroups(context: QueryContext): Promise<Result<ActivityGroup>> {
    return this.getAll<ActivityGroup>(context, 'activitygroups');
  }

  async getWorkTypes(context: QueryContext): Promise<Result<WorkType>> {
    return this.getAll<WorkType>(context, 'worktypes');
  }

  async getProperties(context: QueryContext): Promise<Result<Property>> {
    return this.getAll<Property>(context, 'properties');
  }

  async getDefaultUserProperty(
    userId: number,
    select: string[] = DefaultPropertySelect,
    expand: string[] = DefaultPropertyExpand
  ): Promise<Property | null> {
    const result = await this.getUserPropertyAssociations(
      new QueryContext().setFilter(`UserId eq ${userId}`)
    );

    const defaultPropId = result.results.find(p => p.DefaultPropertyFlag);
    if (!defaultPropId) {
      return null;
    }
    const res = await this.getProperties(
      new QueryContext()
        .setFilter(`Id eq ${defaultPropId.PropertyId}`)
        .setSelect(select.join(','))
        .setExpand(expand.join(','))
    );
    return res.first;
  }

  async getUserProperties(opts: {
    userId: number;
    select?: string[];
    expand?: string[];
  }): Promise<Property[]> {
    const userRegions = await this.getUserRegionAssociations(
      new QueryContext().setFilter(`UserId eq ${opts.userId}`)
    );
    const propertyIds: number[] = [];
    for (const regAssocation of userRegions.results) {
      const propertyRegionAss = await this.getPropertyRegionAssociations(
        new QueryContext().setFilter(`RegionId eq ${regAssocation.RegionId}`)
      );
      for (const props of propertyRegionAss.results) {
        propertyIds.push(props.PropertyId);
      }
    }
    return this.getPropertiesByIds({ids: propertyIds, select: opts.select, expand: opts.expand});
  }

  async getPropertiesByIds(opts: {
    ids: number[];
    select?: string[];
    expand?: string[];
  }): Promise<Property[]> {
    const selects = opts.select?.join(',') ?? DefaultPropertySelect.join(',');
    const expands = opts.expand?.join(',') ?? DefaultPropertyExpand.join(',');

    const chunks = _.chunk(opts.ids, 5);
    const promises = [];
    const properties: Property[] = [];
    for (const chunk of chunks) {
      const filterString = chunk.map(n => `Id eq ${n}`).join(' or ');
      // let filterString = _.reduce<string>(chunkStr, (str, id) => {
      //   if (!str) {
      //     return `Id eq ${id}`
      //   }
      //   return str + ` and Id eq ${id}`
      // })

      const promise = this.getProperties(
        new QueryContext()
          .setFilter(filterString!)
          .setSelect(selects)
          .setExpand(expands)
      ).then(res => properties.push(...res.results));
      promises.push(promise);
    }

    await Promise.all(promises);
    return properties;
  }

  async getAllPropertiesBatch(
    context: QueryContext,
    callback: ResultCallback<Property>
  ): Promise<void> {
    return this.getAllBatch<Property>(context, 'properties', callback);
  }

  async getPropertyRequestTypeAssociations(
    context: QueryContext
  ): Promise<Result<PropertyRequestTypeAssociation>> {
    return this.getAll<PropertyRequestTypeAssociation>(context, 'propertyrequesttypeassociations');
  }

  async getRequestTypeActivityGroupAssociations(context: QueryContext): Promise<Result<RequestTypeActivityGroupAssociations>> {
    return this.getAll<RequestTypeActivityGroupAssociations>(context, 'requesttypeactivitygroupassociations');
  }

  async getPropertyRegionAssociations(
    context: QueryContext
  ): Promise<Result<PropertyRegionAssociation>> {
    return this.getAll<PropertyRegionAssociation>(context, 'propertyregionassociations');
  }

  async getSpaces(context: QueryContext): Promise<Result<Space>> {
    return this.getAll<Space>(context, 'spaces');
  }

  async getSpaceClasses(context: QueryContext): Promise<Result<SpaceClass>> {
    return this.getAll<SpaceClass>(context, 'spaceclasses');
  }

  async getFloors(context: QueryContext): Promise<Result<Floor>> {
    return this.getAll<Floor>(context, 'floors');
  }

  async getRequestTypes(context: QueryContext): Promise<Result<RequestType>> {
    return this.getAll<RequestType>(context, 'requesttypes');
  }

  async getRequestTypesForActivityGroup(activityId: number): Promise<RequestType[]> {
    const activityGroupResponse = await this.getRequestTypeActivityGroupAssociations(new QueryContext().setFilter(`ActivityGroupId eq ${activityId}`));
    const requestIds = activityGroupResponse.results.map(a => a.RequestTypeId);
    return await this.getRequestTypesByIds({ids: requestIds});
  }

  async getRequestTypesByIds(opts: {
    ids: number[]
  }): Promise<RequestType[]> {
    const chunks = _.chunk(opts.ids, 10);
    const promises = [];
    const requestTypes: RequestType[] = [];
    for (const chunk of chunks) {
      const filterString = chunk.map(n => `Id eq ${n}`).join(' or ');
      const promise = this.getRequestTypes(new QueryContext().setFilter(filterString)).then(res => requestTypes.push(...res.results));
      promises.push(promise);
    }
    await Promise.all(promises);
    return requestTypes;
  }

  async getRequestSubtypes(context: QueryContext): Promise<Result<RequestSubType>> {
    return this.getAll<RequestSubType>(context, 'requestsubtypes');
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
    return this.getAll<Geolocation>(context, 'geolocations');
  }

  async getDepartments(context: QueryContext): Promise<Result<Department>> {
    return this.getAll<Department>(context, 'departments');
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
    this.throwResponseError(resp);

    const itemResponse = resp.data as FamisResponse<T>;
    let nextLink = itemResponse['@odata.nextLink'] as string;
    if (nextLink) {
      nextLink = nextLink.replace('http:', 'https:');
    }
    let items = itemResponse.value;

    while (nextLink) {
      fetchCount++;
      const innerStartDate = new Date();
      resp = await this.http.get(nextLink);
      durationMs += moment(Date.now()).diff(innerStartDate);
      this.throwResponseError(resp);
      const newResponse = resp.data as FamisResponse<T>;
      items = items.concat(newResponse.value);
      nextLink = newResponse['@odata.nextLink'] as string;
      if (nextLink) {
        nextLink = nextLink.replace('http:', 'https:');
      }
    }
    return {
      first: items.length > 0 ? items[0] : null,
      results: items,
      totalDuration: durationMs,
      averageDuration: durationMs / fetchCount
    };
  }

  async getAllBatch<T>(
    context: QueryContext,
    type: string,
    callback: ResultCallback<T>
  ): Promise<void> {
    let top = 1000;
    const url = context.buildPagedUrl(type, top, 0, true);
    const resp = await this.http.get(url);

    this.throwResponseError(resp);
    const famisResp = resp.data as FamisResponse<T>;
    if (this.debug) {
      console.log(`Received ${famisResp.value.length} records from ${url}`);
    }
    if (callback) {
      callback(famisResp);
    }
    const totalCount = famisResp['@odata.count'] ?? 0;
    if (totalCount <= famisResp.value.length) {
      return;
    }
    const pageCount = Math.ceil(totalCount / top);
    const promises = [];
    for (let i = 1; i < pageCount; i++) {
      const url = context.buildPagedUrl(type, top, i * top);
      const req = this.http
        .get(url)
        .then((resp: AxiosResponse<FamisResponse<T>>) => {
          this.throwResponseError(resp);
          if (this.debug) {
            console.log(`Received ${resp.data.value.length} records from ${url}`);
          }
          callback(resp.data);
        })
        .catch((e: AxiosError) => {
          this.throwResponseError(e.response!);
        });
      promises.push(req);
    }

    await Promise.all(promises);
  }

  async getAllPaged<T>(context: QueryContext, type: string): Promise<Result<T>> {
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
      this.throwResponseError(resp);
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

  async rawRequest<T>(method: string, endpoint: string, params: any, payload: any): Promise<T> {
    const uri = this.http.getUri({url: buildEntityUrl(endpoint)});

    const resp = await this.http.request({
      method: method as Method,
      url: uri,
      data: payload,
      params: params,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.throwResponseError(resp);
    return resp.data as T;
  }

  async createObject<T, K>(toCreate: T, entity: string): Promise<K> {
    const url = buildEntityUrl(entity);
    const resp = await this.http.post(url, toCreate);
    this.throwResponseError(resp);
    return resp.data as K;
  }

  async patchObject<T, K>(patch: T, entity: string, entityId: string): Promise<K> {
    let url = buildEntityUrl(entity);
    url += `?key=${entityId}`;
    const resp = await this.http.patch(url, patch);
    this.throwResponseError(resp);

    return resp.data as K;
  }

  throwResponseError(resp: AxiosResponse) {
    if (resp.status !== 200) {
      throw new ApiError(resp);
    }
  }

  //
}

function supportsNextLink(type: string): boolean {
  if (type === 'workorders') {
    return false;
  } else if (type === 'propertyregionassociations') {
    return false;
  } else if (type === 'userregionassociations') {
    return false;
  } else if (type === 'propertyrequesttypeassociations') {
    return false;
  } else if (type === 'userpropertyassociation') {
    return false;
  } else if (type === 'assets') {
    return false;
  }
  return true;
}

export function tokenExpiration(t: FamisOAuthCredential): Date {
  return moment(t['.expires']).toDate();
}
