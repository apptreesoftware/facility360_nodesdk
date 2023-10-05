import axios from 'axios';
import Axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios';
import { ApiError, AuthorizationError } from './errors';
import {
  AccountSegment,
  AccountSegmentValue,
  ActivityGroup,
  AdjustmentTransactionResponse,
  AdjustmentType,
  Asset,
  AssetAttachmentType,
  AssetClass,
  AssetKeyword,
  AssetMake,
  AssetModel,
  AssetRank,
  AssetStatus,
  AssetType,
  BillingTypeNPFA,
  ChartOfAccount,
  Company,
  CreateAssetAttachment,
  CreateAssetMake,
  CreateAssetModel,
  Crew,
  CrewUserAssociation,
  DefaultPropertyAndSpace,
  Department,
  FailureCode,
  FamisAttachment,
  FamisResponse,
  FamisUser,
  FcaRank,
  Floor,
  Inspection,
  InspectionAttachment,
  InspectionClass,
  InspectionCondition,
  InspectionDetail,
  InspectionItem,
  InspectionScoringItem,
  InspectionScoringType,
  InspectionType,
  InstallationConfig,
  LaborCost,
  LaborEntry,
  LaborRateType,
  LaborReason,
  LogbookConfiguration,
  MaterialClass,
  MaterialCost,
  MaterialItem,
  MeterReading,
  MeterSite,
  MeterSiteGroup,
  MeterSiteStatus,
  OtherCost,
  OtherCostType,
  PayPeriod,
  PriorityTypeSLADetails,
  Procedure,
  Property,
  PropertyBillCodeAssociations,
  PropertyRegionAssociation,
  PropertyRequestTypeAssociation,
  PurchaseOrderHeader,
  PurchaseOrderLine,
  PurchaseOrderStatus,
  PurchaseOrderType,
  PurchaseRequisitionHeader,
  PurchaseRequisitionHeaderStatus,
  PurchaseRequisitionLine,
  PurchaseRequisitionType,
  Region,
  RequestPriority,
  RequestStatus,
  RequestSubType,
  RequestType,
  RequestTypeActivity,
  RequestTypeActivityGroupAssociations,
  Schedule,
  ServiceType,
  ShoppingCart,
  ShoppingCartItem,
  ShoppingCartStatus,
  Space,
  SpaceArea,
  SpaceCategory,
  SpaceClass,
  SpaceSubCategory,
  State,
  SubSpace,
  Udf,
  UdfField,
  UnitOfMeasure,
  UserActivityGroupAssociations,
  UserInspectionClassAssoc,
  UserPropertyAssociation,
  UserRegionAssociation,
  UserSecurity,
  UserType,
  Warehouse,
  WorkOrder,
  WorkOrderComment,
  WorkType
} from './model/famis_models';
import { buildEntityUrl, QueryContext } from './model/request_context';
import * as AxiosLogger from 'axios-logger';
import { Result } from './model/common';
import {
  AssetCreateRequest,
  AssetUpdateRequest,
  CheckOutShoppingCartRequest,
  CreateCompanyRequest,
  CreateInspectionAttachment,
  FamisOAuthCredential,
  GeoLocationRequest,
  InspectionTransactionRequest,
  LaborEntryApprovalRequest,
  LoginResponse,
  MeterReadingCreateRequest,
  PatchCompanyRequest,
  PatchSpaceAreaRequest,
  PatchUserRequest,
  PatchWorkOrderRequest,
  PhysicalCountTransactionRequest,
  PostAttachmentRequest,
  PostLaborCostRequest,
  PostLaborEntryRequest,
  PostMaterialCostRequest,
  PostOtherCostRequest,
  PostUdfForWoRequest,
  PostWorkOrderRequest,
  PriceAdjustmentTransactionRequest,
  PurchaseRequisitionCreateRequest,
  PurchaseRequisitionLineCreateRequest,
  PurchaseRequisitionUpdateRequest,
  QuantityAdjustmentTransactionRequest,
  SearchUsersRequest,
  ShoppingCartCreateRequest,
  ShoppingCartItemCreateRequest,
  ShoppingCartUpdateRequest
} from './model/request_models';
import _ from 'lodash';
import axiosRetry from 'axios-retry';
import Bottleneck from 'bottleneck';
import { GeoLocation } from './model/geo_locations';
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
  'Email',
  'ActiveFlag'
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
    autoRetry?: boolean;
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
    return new FamisClient(
      cred.Item,
      opts.host,
      opts.autoRefresh ?? false,
      opts.debug ?? false,
      opts.autoRetry ?? false
    );
  }

  static withAccessToken(opts: {
    token: string;
    host: string;
    debug?: boolean;
    autoRetry?: boolean;
  }): FamisClient {
    return new FamisClient(
      {
        '.expires': '',
        '.issued': '',
        installation_id: '',
        installation_name: '',
        token_type: 'Bearer',
        user_id: '',
        access_token: opts.token,
        refresh_token: '',
        expires_in: 0,
        first_name: '',
        last_name: ''
      },
      opts.host,
      false,
      opts.debug
    );
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
          validateStatus: (s) => true
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
    debug: boolean = false,
    autoRetry: boolean = false
  ) {
    this.credentials = credentials;
    this.host = host;
    this.http = axios.create({
      baseURL: host,
      validateStatus: (status) => true
    });
    if (autoRetry) {
      axiosRetry(this.http, {
        retries: 2,
        retryDelay: () => 2
      });
    }

    this.debug = debug;
    this.autoRefresh = autoRefresh;
    this.http.interceptors.request.use(async (config) => {
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
    const now = moment(Date.now()).add(30, 'seconds');
    const expired = now.isAfter(m);
    return expired;
  }

  async getPayPeriods(context: QueryContext): Promise<Result<PayPeriod>> {
    return this.getAll<PayPeriod>(context, 'payperiods');
  }

  // Assets
  async getAssetClasses(context: QueryContext): Promise<Result<AssetClass>> {
    return this.getAll<AssetClass>(context, 'assetclasses');
  }

  async getAssetRanks(context: QueryContext): Promise<Result<AssetRank>> {
    return this.getAll<AssetRank>(context, 'assetranks');
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

  async createAssetMake(assetMake: CreateAssetMake): Promise<AssetMake> {
    return this.createObject<CreateAssetMake, AssetMake>(assetMake, 'assetmakes');
  }

  async getAssetModels(context: QueryContext): Promise<Result<AssetModel>> {
    return this.getAll<AssetModel>(context, 'assetmodels');
  }

  async getAssetAttachmentTypes(context: QueryContext): Promise<Result<AssetAttachmentType>> {
    return this.getAll<AssetAttachmentType>(context, 'assetattachmenttypes');
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

  async getSchedule(context: QueryContext): Promise<Result<Schedule>> {
    return this.getAll<Schedule>(context, 'schedules');
  }

  async getAllAssetsBatch(context: QueryContext, callback: ResultCallback<Asset>): Promise<void> {
    return this.getAllBatch(context, 'assets', callback);
  }

  async createAsset(asset: AssetCreateRequest): Promise<Asset> {
    return this.createObject<AssetCreateRequest, Asset>(asset, 'assets');
  }

  async updateAsset(id: number, asset: AssetUpdateRequest) {
    return this.patchObject<AssetUpdateRequest, Asset>(asset, 'assets', id.toString());
  }

  // This call should not work. But not sure why it here
  // Left it here, Just in case it used by any
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
    const crewAssocs = await this.getCrewUserAssociations(
      new QueryContext().setFilter(`UserId eq ${opts.userId}`)
    );
    const crewIds = crewAssocs.results.map((c) => c.CrewId);
    return this.getCrewsByIds({ ids: crewIds });
  }

  async getCrewsByIds(opts: { ids: number[] }): Promise<Crew[]> {
    const chunks = _.chunk(opts.ids, 6);
    const promises = [];
    const crews: Crew[] = [];
    for (const chunk of chunks) {
      const filterString = chunk.map((c) => `Id eq ${c}`).join(' or ');
      const promise = this.getCrews(new QueryContext().setFilter(filterString)).then((res) =>
        crews.push(...res.results)
      );
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

  // user types
  async getUserTypes(context: QueryContext): Promise<Result<UserType>> {
    return this.getAll(context, 'usertypes');
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

  async getUserSecurities(context: QueryContext): Promise<Result<UserSecurity>> {
    return this.getAll(context, 'usersecurities');
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

  async getRegions(context: QueryContext): Promise<Result<Region>> {
    return this.getAll<Region>(context, 'regions');
  }

  async getUserPropertyAssociations(
    context: QueryContext
  ): Promise<Result<UserPropertyAssociation>> {
    return this.getAll<UserPropertyAssociation>(context, 'userpropertyassociation');
  }

  async getUserActivityGroupAssociations(
    context: QueryContext
  ): Promise<Result<UserActivityGroupAssociations>> {
    return this.getAll<UserActivityGroupAssociations>(context, 'useractivitygroupassociations');
  }

  async searchUsers(searchParams: SearchUsersRequest, context: QueryContext): Promise<FamisUser[]> {
    if (!searchParams.propertyId && !searchParams.activityGroupId && !searchParams.requestTypeId) {
      return [];
    }
    let requestTypeActivityIds: number[] = [];
    let activityUserIds: number[] = [];
    let propertyUserIds: number[] = [];
    if (searchParams.requestTypeId && !searchParams.activityGroupId) {
      const assocs = await this.getRequestTypeActivityGroupAssociations(
        new QueryContext().setFilter(`RequestTypeId eq ${searchParams.requestTypeId}`)
      );
      requestTypeActivityIds = assocs.results.map((a) => a.ActivityGroupId);
    }
    if (searchParams.activityGroupId || requestTypeActivityIds.length > 0) {
      const activityIds = [searchParams.activityGroupId] ?? requestTypeActivityIds;
      const assocPromises = [];
      const userActivityGroupAssocs: UserActivityGroupAssociations[] = [];
      for (const activityId of activityIds) {
        const promise = this.getUserActivityGroupAssociations(
          new QueryContext().setFilter(
            `AllowAssignmentFlag eq true and ActivityGroupId eq ${activityId}`
          )
        ).then((res) => userActivityGroupAssocs.push(...res.results));
        assocPromises.push(promise);
      }
      await Promise.all(assocPromises);
      activityUserIds = [...new Set(userActivityGroupAssocs.map((a) => a.UserId))];
    }
    if (searchParams.propertyId) {
      const regionAssocs = await this.getPropertyRegionAssociations(
        new QueryContext().setFilter(`PropertyId eq ${searchParams.propertyId}`)
      );
      const regionIdString = regionAssocs.results
        .map((r) => `RegionId eq ${r.RegionId}`)
        .join(' or ');
      const regionUserAssocs = await this.getUserRegionAssociations(
        new QueryContext().setFilter(regionIdString)
      );
      propertyUserIds = regionUserAssocs.results.map((a) => a.UserId);
    }
    let userIds =
      searchParams.propertyId && (searchParams.requestTypeId || searchParams.activityGroupId)
        ? activityUserIds.filter((a) => propertyUserIds.includes(a))
        : searchParams.requestTypeId || searchParams.activityGroupId
          ? activityUserIds
          : propertyUserIds;
    return this.getUsersForIds({ userIds: userIds }, context);
  }

  async getUsersForIds(opts: { userIds: number[] }, context: QueryContext): Promise<FamisUser[]> {
    const chunks = _.chunk(opts.userIds, 6);
    const promises = [];
    const users: FamisUser[] = [];
    for (const chunk of chunks) {
      let filter = `(${chunk.map((c) => `Id eq ${c}`).join(' or ')}) and ActiveFlag eq true`;
      if (context.filter && context.filter.length > 0) {
        filter += ` and ${context.filter}`;
      }
      const promise = this.getUsers(
        new QueryContext()
          .setSelect(context.select ?? DefaultUserSelect.join(','))
          .setFilter(filter)
          .setExpand(context.expand ?? '')
      )
        .then((res) => users.push(...res.results))
        .catch((error) => {
          if (error.response) {
            console.log(`call failed with error ${JSON.stringify(error.response.data)}`);
          }
          console.log(`call failed with error ${error.toString()}`);
        });
      promises.push(promise);
    }
    await Promise.all(promises);
    return users;
  }

  async getUsersForRequestType(opts: {
    requestTypeId: number;
    select?: string[];
    expand?: string[];
    includeInactive?: boolean;
  }): Promise<FamisUser[]> {
    const assocs = await this.getRequestTypeActivityGroupAssociations(
      new QueryContext().setFilter(`RequestTypeId eq ${opts.requestTypeId}`)
    );
    const activityGroupIds = assocs.results.map((a) => a.ActivityGroupId);
    return this.getUsersForActivityGroups({
      activityGroupIds: activityGroupIds,
      select: opts.select,
      expand: opts.expand,
      includeInactive: opts.includeInactive
    });
  }

  async getUsersForActivityGroups(opts: {
    activityGroupIds: number[];
    select?: string[];
    expand?: string[];
    includeInactive?: boolean;
  }): Promise<FamisUser[]> {
    const userActivityGroupAssocs: UserActivityGroupAssociations[] = [];
    const assocPromises = [];
    for (const activityId of opts.activityGroupIds) {
      const promise = this.getUserActivityGroupAssociations(
        new QueryContext().setFilter(
          `AllowAssignmentFlag eq true and ActivityGroupId eq ${activityId}`
        )
      ).then((res) => userActivityGroupAssocs.push(...res.results));
      assocPromises.push(promise);
    }
    await Promise.all(assocPromises);
    const userIds = [...new Set(userActivityGroupAssocs.map((a) => a.UserId))];
    const select = opts.select ?? DefaultUserSelect;
    const chunks = _.chunk(userIds, 6);
    const promises = [];
    const users: FamisUser[] = [];
    for (const chunk of chunks) {
      let filter = chunk.map((c) => `Id eq ${c}`).join(' or ');
      if (!opts.includeInactive) {
        filter = `(${filter}) and ActiveFlag eq true`;
      }
      const promise = this.getUsers(
        new QueryContext()
          .setSelect(select.join(','))
          .setFilter(filter)
          .setExpand(opts.expand ? opts.expand.join(',') : '')
      )
        .then((res) => users.push(...res.results))
        .catch((error) => {
          if (error.response) {
            console.log(`call failed with error ${JSON.stringify(error.response.data)}`);
          }
          console.log(`call failed with error ${error.toString()}`);
        });
      promises.push(promise);
    }
    await Promise.all(promises);
    return users;
  }

  async patchUser(user: PatchUserRequest): Promise<FamisUser> {
    return this.patchObject<PatchUserRequest, FamisUser>(user, 'users', user.Id.toString());
  }

  //

  // work orders

  async getWorkOrders(context: QueryContext): Promise<Result<WorkOrder>> {
    return this.getAll<WorkOrder>(context, 'workorders');
  }

  async postWorkOrder(workOrder: PostWorkOrderRequest): Promise<WorkOrder> {
    return this.createObject<PostWorkOrderRequest, WorkOrder>(workOrder, 'workorders');
  }

  async patchWorkOrder(workOrderId: string, workOrder: PatchWorkOrderRequest): Promise<WorkOrder> {
    return this.patchObject<PatchWorkOrderRequest, WorkOrder>(workOrder, 'workorders', workOrderId);
  }

  //

  //#region attachments
  async getAttachments(context: QueryContext): Promise<Result<FamisAttachment>> {
    return this.getAll<FamisAttachment>(context, 'attachments');
  }

  async createAttachment(attachment: PostAttachmentRequest): Promise<FamisAttachment> {
    return this.createObject<PostAttachmentRequest, FamisAttachment>(attachment, 'attachments');
  }

  getAttachmentStreamUrl(context: QueryContext): string {
    return `${this.host}${context.buildUrl('attachmentstream')}`;
  }

  //#endregion

  //#region property bill code assocations
  async getPropertyBillCodeAssociations(
    context: QueryContext
  ): Promise<Result<PropertyBillCodeAssociations>> {
    return this.getAll<PropertyBillCodeAssociations>(context, 'propertybillcodeassociations');
  }

  //#endregion

  //#region service types
  async getServiceTypes(context: QueryContext): Promise<Result<ServiceType>> {
    return this.getAll<ServiceType>(context, 'servicetypes');
  }

  //#endregion

  async getAccountSegments(context: QueryContext): Promise<Result<AccountSegment>> {
    return this.getAll<AccountSegment>(context, 'accountsegmentnpfa');
  }

  async getAccountSegmentValues(context: QueryContext): Promise<Result<AccountSegmentValue>> {
    return this.getAll<AccountSegmentValue>(context, 'accountsegmentvaluenpfa');
  }

  async getChartOfAccounts(context: QueryContext): Promise<Result<ChartOfAccount>> {
    return this.getAll<ChartOfAccount>(context, 'chartofaccountsnpfa');
  }

  async getLaborRateTypes(context: QueryContext): Promise<Result<LaborRateType>> {
    return this.getAll<LaborRateType>(context, 'laborratetypes');
  }

  async getLaborReasons(context: QueryContext): Promise<Result<LaborReason>> {
    return this.getAll<LaborReason>(context, 'laborreasons');
  }

  async getRequestTypeActivities(context: QueryContext): Promise<Result<RequestTypeActivity>> {
    return this.getAll<RequestTypeActivity>(context, 'requesttypeactivities');
  }

  async getActivityGroups(context: QueryContext): Promise<Result<ActivityGroup>> {
    return this.getAll<ActivityGroup>(context, 'activitygroups');
  }

  async getWorkTypes(context: QueryContext): Promise<Result<WorkType>> {
    return this.getAll<WorkType>(context, 'worktypes');
  }

  //Region Inventory
  async getWarehouses(context: QueryContext): Promise<Result<Warehouse>> {
    return this.getAll<Warehouse>(context, 'warehouses');
  }

  async getMaterialClasses(context: QueryContext): Promise<Result<MaterialClass>> {
    return this.getAll<MaterialClass>(context, 'materialclasses');
  }

  async getMaterialItems(context: QueryContext): Promise<Result<MaterialItem>> {
    return this.getAll<MaterialItem>(context, 'materialitems');
  }

  async getUnitOfMeasures(context: QueryContext): Promise<Result<UnitOfMeasure>> {
    return this.getAll<UnitOfMeasure>(context, 'uoms');
  }

  async getAdjustmentTypes(context: QueryContext): Promise<Result<AdjustmentType>> {
    return this.getAll<AdjustmentType>(context, 'adjustmenttypes');
  }

  async adjustQuantity(
    request: QuantityAdjustmentTransactionRequest
  ): Promise<AdjustmentTransactionResponse> {
    return this.createObject<QuantityAdjustmentTransactionRequest, AdjustmentTransactionResponse>(
      request,
      'quantityadjustmenttransactions'
    );
  }

  async physicalCount(
    request: PhysicalCountTransactionRequest
  ): Promise<AdjustmentTransactionResponse> {
    return this.createObject<PhysicalCountTransactionRequest, WorkOrder>(
      request,
      'physicalcounttransactions'
    );
  }

  async adjustPrice(
    request: PriceAdjustmentTransactionRequest
  ): Promise<AdjustmentTransactionResponse> {
    return this.createObject<PriceAdjustmentTransactionRequest, AdjustmentTransactionResponse>(
      request,
      'priceadjustmenttransactions'
    );
  }

  //End Region Inventory

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

    const defaultPropId = result.results.find((p) => p.DefaultPropertyFlag);
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

  async getDefaultUserPropertyAndSpace(
    userId: number,
    select: string[] = DefaultPropertySelect,
    expand: string[] = DefaultPropertyExpand
  ): Promise<DefaultPropertyAndSpace> {
    const result = await this.getUserPropertyAssociations(
      new QueryContext().setFilter(`UserId eq ${userId}`)
    );

    const defaultPropId = result.results.find((p) => p.DefaultPropertyFlag);
    if (!defaultPropId) {
      return {};
    }

    const res = await this.getProperties(
      new QueryContext()
        .setFilter(`Id eq ${defaultPropId.PropertyId}`)
        .setSelect(select.join(','))
        .setExpand(expand.join(','))
    );
    const defaults: DefaultPropertyAndSpace = {
      property: res.first ?? undefined
    };
    if (defaults.property && defaultPropId.DefaultSpaceId) {
      const spaceResponse = await this.getSpaces(
        new QueryContext().setFilter(`Id eq ${defaultPropId.DefaultSpaceId}`)
      );
      defaults.space = spaceResponse.first ?? undefined;
    }
    return defaults;
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
    return this.getPropertiesByIds({ ids: propertyIds, select: opts.select, expand: opts.expand });
  }

  async getPropertiesByIds(opts: {
    ids: number[];
    select?: string[];
    expand?: string[];
  }): Promise<Property[]> {
    const selects = opts.select?.join(',') ?? DefaultPropertySelect.join(',');
    const expands = opts.expand?.join(',') ?? DefaultPropertyExpand.join(',');

    const chunks = _.chunk(opts.ids, 6);
    const promises = [];
    const properties: Property[] = [];
    for (const chunk of chunks) {
      const filterString = chunk.map((n) => `Id eq ${n}`).join(' or ');
      const promise = this.getProperties(
        new QueryContext().setFilter(filterString!).setSelect(selects).setExpand(expands)
      ).then((res) => properties.push(...res.results));
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

  async getRequestTypeActivityGroupAssociations(
    context: QueryContext
  ): Promise<Result<RequestTypeActivityGroupAssociations>> {
    return this.getAll<RequestTypeActivityGroupAssociations>(
      context,
      'requesttypeactivitygroupassociations'
    );
  }

  async getPropertyRegionAssociations(
    context: QueryContext
  ): Promise<Result<PropertyRegionAssociation>> {
    return this.getAll<PropertyRegionAssociation>(context, 'propertyregionassociations');
  }

  async getSpaces(context: QueryContext): Promise<Result<Space>> {
    return this.getAll<Space>(context, 'spaces');
  }

  async getSubSpaces(context: QueryContext): Promise<Result<SubSpace>> {
    return this.getAll<SubSpace>(context, 'subspaces');
  }

  async getSpaceClasses(context: QueryContext): Promise<Result<SpaceClass>> {
    return this.getAll<SpaceClass>(context, 'spaceclasses');
  }

  async getSpaceCategories(context: QueryContext): Promise<Result<SpaceCategory>> {
    return this.getAll<SpaceCategory>(context, 'spacecategories');
  }

  async getSpaceSubCategories(context: QueryContext): Promise<Result<SpaceSubCategory>> {
    return this.getAll<SpaceSubCategory>(context, 'spacesubcategories');
  }

  async getPriorityTypeSLADetails(context: QueryContext): Promise<Result<PriorityTypeSLADetails>> {
    return this.getAll<PriorityTypeSLADetails>(context, 'prioritytypesladetails');
  }

  async patchSpaceArea(spaceAreaId: string, spaceArea: PatchSpaceAreaRequest): Promise<SpaceArea> {
    let url = buildEntityUrl('spaceareas');
    url += `(${spaceAreaId})`;
    const resp = await this.http.patch(url, spaceArea);
    return resp.data;
  }

  async getFloors(context: QueryContext): Promise<Result<Floor>> {
    return this.getAll<Floor>(context, 'floors');
  }

  async getRequestTypes(context: QueryContext): Promise<Result<RequestType>> {
    return this.getAll<RequestType>(context, 'requesttypes');
  }

  async getRequestTypesForActivityGroup(
    activityId: number,
    context: QueryContext
  ): Promise<RequestType[]> {
    const activityGroupResponse = await this.getRequestTypeActivityGroupAssociations(
      new QueryContext().setFilter(`ActivityGroupId eq ${activityId}`)
    );
    const requestIds = activityGroupResponse.results.map((a) => a.RequestTypeId);
    return await this.getRequestTypesByIds({ ids: requestIds }, context);
  }

  async getRequestTypesByIds(
    opts: {
      ids: number[];
    },
    context: QueryContext
  ): Promise<RequestType[]> {
    const chunks = _.chunk(opts.ids, 6);
    const promises = [];
    const requestTypes: RequestType[] = [];
    for (const chunk of chunks) {
      const subContext = new QueryContext().copyFromOther(context);
      let filterString = chunk.map((n) => `Id eq ${n}`).join(' or ');
      subContext.setFilter(
        context.filter ? `(${filterString}) and ${context.filter}` : filterString
      );
      const promise = this.getRequestTypes(subContext).then((res) =>
        requestTypes.push(...res.results)
      );
      promises.push(promise);
    }
    await Promise.all(promises);
    return requestTypes;
  }

  async getRequestSubtypes(context: QueryContext): Promise<Result<RequestSubType>> {
    return this.getAll<RequestSubType>(context, 'requestsubtypes');
  }

  async getRequestSubtypesByIds(ids: number[], context: QueryContext): Promise<RequestSubType[]> {
    const chunks = _.chunk(ids, 6);
    const promises = [];
    const subTypes: RequestSubType[] = [];
    for (const chunk of chunks) {
      const subContext = new QueryContext().copyFromOther(context);
      let filterString = chunk.map((id) => `Id eq ${id}`).join(' or ');
      subContext.setFilter(
        context.filter ? `(${filterString}) and ${context.filter}` : filterString
      );
      const promise = this.getRequestSubtypes(subContext).then((res) =>
        subTypes.push(...res.results)
      );
      promises.push(promise);
    }
    await Promise.all(promises);
    return subTypes;
  }

  async getRequestPriorities(context: QueryContext): Promise<Result<RequestPriority>> {
    return this.getAll<RequestPriority>(context, 'requestpriorities');
  }

  async getProcedures(context: QueryContext): Promise<Result<Procedure>> {
    return this.getAll<Procedure>(context, 'procedures');
  }

  async getFailureCodes(context: QueryContext): Promise<Result<FailureCode>> {
    return this.getAll<FailureCode>(context, 'failurecodes');
  }

  async getFcaRanks(context: QueryContext): Promise<Result<FcaRank>> {
    return this.getAll<FcaRank>(context, 'fcarank');
  }

  async getStates(context: QueryContext): Promise<Result<State>> {
    return this.getAll<State>(context, 'states');
  }

  async getBillingTypeNPFA(context: QueryContext): Promise<Result<BillingTypeNPFA>> {
    return this.getAll<BillingTypeNPFA>(context, 'billingtypenpfa');
  }

  // Region Inspection

  async getInspections(context: QueryContext): Promise<Result<Inspection>> {
    return this.getAll<Inspection>(context, 'inspections');
  }

  async getInspectionDetails(context: QueryContext): Promise<Result<InspectionDetail>> {
    return this.getAll<InspectionDetail>(context, 'inspectiondetails');
  }

  async getInspectionItems(context: QueryContext): Promise<Result<InspectionItem>> {
    return this.getAll<InspectionItem>(context, 'inspectionitems');
  }

  async getInspectionConditions(context: QueryContext): Promise<Result<InspectionCondition>> {
    return this.getAll<InspectionCondition>(context, 'inspectionconditions');
  }

  async getInspectionScoringItems(context: QueryContext): Promise<Result<InspectionScoringItem>> {
    return this.getAll<InspectionScoringItem>(context, 'inspectionscoringitems');
  }

  async getInspectionScoringTypes(context: QueryContext): Promise<Result<InspectionScoringType>> {
    return this.getAll<InspectionScoringType>(context, 'inspectionscoringtypes');
  }

  async getInspectionTypes(context: QueryContext): Promise<Result<InspectionType>> {
    return this.getAll<InspectionType>(context, 'inspectiontypes');
  }

  async getInspectionClasses(context: QueryContext): Promise<Result<InspectionClass>> {
    return this.getAll<InspectionClass>(context, 'inspectionclasses');
  }

  async getUserInspectionClassAssocs(
    context: QueryContext
  ): Promise<Result<UserInspectionClassAssoc>> {
    return this.getAll<UserInspectionClassAssoc>(context, 'userinspectionclassassociations');
  }

  async createInspectionTransaction(request: InspectionTransactionRequest): Promise<Inspection> {
    return this.createObject<InspectionTransactionRequest, Inspection>(
      request,
      'inspectiontransactions'
    );
  }

  async createInspectionAttachment(attachment: CreateInspectionAttachment): Promise<void> {
    const url = buildEntityUrl('inspectionattachments');
    const resp = await this.http.post(url, attachment);
    this.throwResponseError(resp);
  }

  async getInspectionAttachments(context: QueryContext): Promise<Result<InspectionAttachment>> {
    return this.getAll<InspectionAttachment>(context, 'inspectionattachments');
  }

  //End Region Inspection

  async getWorkOrderComments(context: QueryContext): Promise<Result<WorkOrderComment>> {
    return this.getAll<WorkOrderComment>(context, 'workordercomments');
  }

  async getRequestStatuses(context: QueryContext): Promise<Result<RequestStatus>> {
    return this.getAll<RequestStatus>(context, 'requeststatuses');
  }

  //Region Geo Location
  async getGeoLocations(context: QueryContext): Promise<Result<GeoLocation>> {
    return this.getAll<GeoLocation>(context, 'geolocations');
  }

  async createGeoLocation(request: GeoLocationRequest): Promise<GeoLocation> {
    return this.createObject<GeoLocationRequest, GeoLocation>(request, 'geolocations');
  }

  async updateGeoLocation(request: GeoLocationRequest, id: string): Promise<GeoLocation> {
    return this.patchObject<GeoLocationRequest, GeoLocation>(request, 'geolocations', id);
  }

  //End Region Geo Location
  async getDepartments(context: QueryContext): Promise<Result<Department>> {
    return this.getAll<Department>(context, 'departments');
  }

  async getInstallationConfigurations(context: QueryContext): Promise<InstallationConfig[]> {
    const url = context.buildApiUrl('installationconfigurations');
    const resp = await this.http.get<InstallationConfig[]>(url);
    return resp.data;
  }

  //#region Logbook
  async getLogbookConfigurations(context: QueryContext): Promise<LogbookConfiguration[]> {
    const url = context.buildApiUrl('LogbookConfiguration');
    const resp = await this.http.get<LogbookConfiguration[]>(url);
    return resp.data;
  }

  //#endregion

  //#region Udfs

  async getUdfField(name: string, context: QueryContext): Promise<UdfField | undefined> {
    context.setFilter(`DisplayName eq '${name}'`);
    const fieldResp = await this.getUdfFields(context);
    return fieldResp.results.find((f) => f.DisplayName === name);
  }

  async getUdfFields(context: QueryContext): Promise<Result<UdfField>> {
    return this.getAll<UdfField>(context, 'udffields');
  }

  async getUdfFieldsForNames(names: string[]): Promise<UdfField[]> {
    const filterString = names.map((name) => `DisplayName eq '${name}'`).join(' or ');
    const res = await this.getUdfFields(new QueryContext().setFilter(filterString));
    return res.results;
  }

  async setUdfForWorkOrder(woId: number, udf: PostUdfForWoRequest): Promise<Udf> {
    return await this.createObject<PostUdfForWoRequest, Udf>(udf, `workorders(${woId})/UdfUpdate`);
  }

  //#endregion

  //#region laborcosts
  async getLaborCosts(context: QueryContext): Promise<Result<LaborCost>> {
    return this.getAll<LaborCost>(context, 'laborcosts');
  }

  async createLaborCost(laborCost: PostLaborCostRequest): Promise<LaborCost> {
    return this.createObject<PostLaborCostRequest, LaborCost>(laborCost, 'laborcosts');
  }

  async deleteLaborCost(entityId: string) {
    return this.deleteObject('laborcosts', entityId);
  }

  //#endregion

  //#region Labor Entry
  async getLaborEntries(context: QueryContext): Promise<Result<LaborEntry>> {
    return this.getAll<LaborEntry>(context, 'laborentries');
  }

  async createLaborEntry(postRequest: PostLaborEntryRequest): Promise<LaborEntry> {
    return this.createObject<PostLaborEntryRequest, LaborEntry>(postRequest, 'laborentries');
  }

  async updateLaborEntry(
    laborId: string,
    patchRequest: PostLaborEntryRequest
  ): Promise<LaborEntry> {
    return this.patchObject<PostLaborEntryRequest, LaborEntry>(
      patchRequest,
      'laborentries',
      laborId
    );
  }

  async submitLaborEntry(
    postRequest: LaborEntryApprovalRequest,
    userId: number
  ): Promise<LaborEntry> {
    const entity = `users(${userId})/SubmitTimeCard`;
    return this.createObject<LaborEntryApprovalRequest, LaborEntry>(postRequest, entity);
  }

  async rejectLaborEntry(
    postRequest: LaborEntryApprovalRequest,
    userId: number
  ): Promise<LaborEntry> {
    const entity = `users(${userId})/RejectTimeCard`;
    return this.createObject<LaborEntryApprovalRequest, LaborEntry>(postRequest, entity);
  }

  async approveLaborEntry(
    postRequest: LaborEntryApprovalRequest,
    userId: number
  ): Promise<LaborEntry> {
    const entity = `users(${userId})/ApproveTimeCard`;
    return this.createObject<LaborEntryApprovalRequest, LaborEntry>(postRequest, entity);
  }

  //LaborEntryApprovalRequest

  //#endregion

  //#region materialcosts
  async getMaterialCosts(context: QueryContext): Promise<Result<MaterialCost>> {
    return this.getAll<MaterialCost>(context, 'workordermaterialcosts');
  }

  async createMaterialCost(materialCost: PostMaterialCostRequest): Promise<MaterialCost> {
    return this.createObject<PostMaterialCostRequest, MaterialCost>(
      materialCost,
      'workordermaterialcosts'
    );
  }

  //#endregion

  //#region othercosts
  async getOtherCosts(context: QueryContext): Promise<Result<OtherCost>> {
    return this.getAll<OtherCost>(context, 'othercosts');
  }

  async getOtherCostTypes(context: QueryContext): Promise<Result<OtherCostType>> {
    return this.getAll<OtherCostType>(context, 'othercosttypes');
  }

  async createOtherCost(otherCost: PostOtherCostRequest): Promise<OtherCost> {
    return this.createObject<PostOtherCostRequest, OtherCost>(otherCost, 'othercosts');
  }

  //#endregion

  //Region Shopping Cart

  async getShoppingCarts(context: QueryContext): Promise<Result<ShoppingCart>> {
    return this.getAll<ShoppingCart>(context, 'shoppingcarts');
  }

  async getShoppingCartItems(context: QueryContext): Promise<Result<ShoppingCartItem>> {
    return this.getAll<ShoppingCartItem>(context, 'shoppingcartitems');
  }

  async getShoppingCartStatuses(context: QueryContext): Promise<Result<ShoppingCartStatus>> {
    return this.getAll<ShoppingCartStatus>(context, 'shoppingcartstatuses');
  }

  async createShoppingCart(postRequest: ShoppingCartCreateRequest): Promise<ShoppingCart> {
    return this.createObject<ShoppingCartCreateRequest, ShoppingCart>(postRequest, 'shoppingcarts');
  }

  async createShoppingCartItem(
    postRequest: ShoppingCartItemCreateRequest
  ): Promise<ShoppingCartItem> {
    return this.createObject<ShoppingCartItemCreateRequest, ShoppingCartItem>(
      postRequest,
      'shoppingcartitems'
    );
  }

  async updateShoppingCart(
    postRequest: ShoppingCartUpdateRequest,
    cartId: number
  ): Promise<ShoppingCart> {
    const entity = `shoppingcarts(${cartId})`;
    return this.patchObject<ShoppingCartUpdateRequest, ShoppingCart>(postRequest, entity);
  }

  async checkOutShoppingCart(
    postRequest: CheckOutShoppingCartRequest,
    cartId: number
  ): Promise<ShoppingCart> {
    const entity = `shoppingcarts(${cartId})/checkout`;
    return this.createObject<CheckOutShoppingCartRequest, ShoppingCart>(postRequest, entity);
  }

  //End Region Shopping Cart

  //Region Purchase Order

  async getPurchaseOrdertStatuses(context: QueryContext): Promise<Result<PurchaseOrderStatus>> {
    return this.getAll<PurchaseOrderStatus>(context, 'purchaseorderstatuses');
  }

  async getPurchaseOrdertTypes(context: QueryContext): Promise<Result<PurchaseOrderType>> {
    return this.getAll<PurchaseOrderType>(context, 'purchaseordertypes');
  }

  async getPurchaseOrdertHeaders(context: QueryContext): Promise<Result<PurchaseOrderHeader>> {
    return this.getAll<PurchaseOrderHeader>(context, 'purchaseorderheaders');
  }

  async getPurchaseOrdertLines(context: QueryContext): Promise<Result<PurchaseOrderLine>> {
    return this.getAll<PurchaseOrderLine>(context, 'purchaseorderlines');
  }

  //End Region Purchase Order

  //Region Purchase Requisition
  async getPurchaseRequisitionHeaderStatuses(
    context: QueryContext
  ): Promise<Result<PurchaseRequisitionHeaderStatus>> {
    return this.getAll<PurchaseRequisitionHeaderStatus>(
      context,
      'purchaserequisitionheaderstatuses'
    );
  }

  async getPurchaseRequisitionTypes(
    context: QueryContext
  ): Promise<Result<PurchaseRequisitionType>> {
    return this.getAll<PurchaseRequisitionType>(context, 'purchaserequisitiontypes');
  }

  async getPurchaseRequisitionHeaders(
    context: QueryContext
  ): Promise<Result<PurchaseRequisitionHeader>> {
    return this.getAll<PurchaseRequisitionHeader>(context, 'purchaserequisitionheaders');
  }

  async getPurchaseRequisitionLines(
    context: QueryContext
  ): Promise<Result<PurchaseRequisitionLine>> {
    return this.getAll<PurchaseRequisitionLine>(context, 'purchaserequisitionlines');
  }

  async createPurchaseRequisitionHeader(
    postRequest: PurchaseRequisitionCreateRequest
  ): Promise<PurchaseRequisitionHeader> {
    return this.createObject<PurchaseRequisitionCreateRequest, PurchaseRequisitionHeader>(
      postRequest,
      'purchaserequisitionheaders'
    );
  }

  async updatePurchaseRequisitionHeader(
    postRequest: PurchaseRequisitionUpdateRequest,
    prId: number
  ): Promise<PurchaseRequisitionHeader> {
    const entity = `purchaserequisitionheaders(${prId})`;
    return this.patchObject<PurchaseRequisitionUpdateRequest, PurchaseRequisitionHeader>(
      postRequest,
      entity
    );
  }

  async createPurchaseRequisitionLine(
    postRequest: PurchaseRequisitionLineCreateRequest
  ): Promise<PurchaseRequisitionLine> {
    return this.createObject<PurchaseRequisitionLineCreateRequest, PurchaseRequisitionLine>(
      postRequest,
      'purchaserequisitionlines'
    );
  }

  //End Region Purchase Requisition

  //Region Meter Site

  async getMeterSiteGroups(context: QueryContext): Promise<Result<MeterSiteGroup>> {
    return this.getAll<MeterSiteGroup>(context, 'metersitegroups');
  }

  async getMeterSiteStatuses(context: QueryContext): Promise<Result<MeterSiteStatus>> {
    return this.getAll<MeterSiteStatus>(context, 'metersitestatuses');
  }

  async getMeterSites(context: QueryContext): Promise<Result<MeterSite>> {
    return this.getAll<MeterSite>(context, 'metersites');
  }

  async getMeterReadings(context: QueryContext): Promise<Result<MeterReading>> {
    return this.getAll<MeterReading>(context, 'meterreadings');
  }

  async createMeterReading(postRequest: MeterReadingCreateRequest): Promise<MeterReading> {
    return this.createObject<MeterReadingCreateRequest, MeterReading>(postRequest, 'meterreadings');
  }

  //End Region Meter Site
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
    const limiter = new Bottleneck({ maxConcurrent: 4 });
    for (let i = 1; i < pageCount; i++) {
      const url = context.buildPagedUrl(type, top, i * top);

      const req = limiter
        .schedule(() => this.http.get(url))
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
    const uri = this.http.getUri({ url: buildEntityUrl(endpoint) });

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

  async getAttachmentStream(context: QueryContext) {
    const url = context.buildUrl('attachmentstream');
    return await this.http.get(url, {
      responseType: 'arraybuffer'
    });
  }

  async createObject<T, K>(toCreate: T, entity: string): Promise<K> {
    const url = buildEntityUrl(entity);
    const resp = await this.http.post(url, toCreate);
    this.throwResponseError(resp);
    return resp.data as K;
  }

  async patchObject<T, K>(patch: T, entity: string, entityId?: string): Promise<K> {
    let url = buildEntityUrl(entity);
    if (entityId) url += `?key=${entityId}`;
    const resp = await this.http.patch(url, patch);
    this.throwResponseError(resp);
    return resp.data as K;
  }

  async deleteObject(entity: string, entityId: string) {
    let url = buildEntityUrl(entity);
    url += `?key=${entityId}`;
    const resp = await this.http.delete(url);
    this.throwResponseError(resp);
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
  } else if (type === 'useractivitygroupassociations') {
    return false;
  }
  return true;
}

export function tokenExpiration(t: FamisOAuthCredential): Date {
  return moment(t['.expires']).toDate();
}
