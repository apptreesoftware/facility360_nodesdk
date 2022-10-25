export interface FamisResponse<T> {
  '@odata.nextLink'?: string;
  '@odata.count'?: number;
  value: T[];
}

export interface FamisErrorResponse {
  Result: boolean;
  Context: number;
  Message: string;
}

export interface SpaceClass {
  Id?: number;
  Name?: string;
  Description?: string;
  TabOrder?: number;
  Active?: boolean;
  UpdateDate?: string;
  UpdatedByName?: string;
}

export interface SpaceCategorization {
  Id?:                        number;
  SpaceId?:                   number;
  SubSpaceId?:                number;
  AllocIndividualId?:         number;
  AllocOrgId?:                number;
  OwningOrgId?:               number;
  BillingOrgId?:              number;
  OwnershipStatusId?:         number;
  FunctionalStatusId?:        number;
  FunctionalCatId?:           number;
  FunctionalSubCatId?:        number;
  SpaceCategoryId?:           number;
  SpaceSubCategoryId?:        number;
  SpaceTypeId?:               number;
  SpaceStandardId?:           number;
  SpaceStandardApprovalFlag?: boolean;
}

export interface SpaceCategory {
  Id?:                         number;
  Name?:                       string;
  Description?:                string;
  ActiveFlag?:                 boolean;
  TabOrder?:                   number;
  UpdateDate?:                 Date;
  UpdatedByName?:              string;
  ExteriorGrossFlag?:          boolean;
  InteriorGrossFlag?:          boolean;
  RentablePerContractFlag?:    boolean;
  BuildingRentableFlag?:       boolean;
  UsableAreaFlag?:             boolean;
  InteriorPlanningAreaFlag?:   boolean;
  AssignableAreaFlag?:         boolean;
  NonAssignableAreaFlag?:      boolean;
  NonMeasurablePortfolioFlag?: boolean;
  Number?:                     string;
  SpaceSubCategories?:         SpaceSubCategory[];
}

export interface SpaceSubCategory {
  Id?:                        number;
  Name?:                      string;
  Description?:               string;
  ActiveFlag?:                boolean;
  TabOrder?:                  number;
  UpdateDate?:                Date;
  UpdatedByName?:             string;
  CategoryId?:                number;
  SpaceStandardDefinitionId?: number;
  Number?:                    string;
  SpaceTypes?:                SpaceType[];
}

export interface SpaceArea {
  Id?:             number;
  SpaceId?:        number;
  TotalArea1SqFt?: number;
  TotalArea2SqFt?: number;
  TotalArea1SqM?:  number;
  TotalArea2SqM?:  number;
  OtherArea1SqFt?: number;
  OtherArea2SqFt?: number;
  OtherArea3SqFt?: number;
  OtherArea4SqFt?: number;
  OtherArea5SqFt?: number;
  OtherArea1SqM?:  number;
  OtherArea2SqM?:  number;
  OtherArea3SqM?:  number;
  OtherArea4SqM?:  number;
  OtherArea5SqM?:  number;
  IncludeEG?:      number;
  IncludeIG?:      number;
  IncludeRPC?:     number;
  IncludeBR?:      number;
  IncludeUA?:      number;
  IncludeIPA?:     number;
  IncludeAA?:      number;
  IncludeNAA?:     number;
  IncludeNMP?:     number;
  Force100?:       boolean;
}


export interface SpaceType {
  Id?:            number;
  Name?:          string;
  Number?:        string;
  Description?:   string;
  ActiveFlag?:    boolean;
  TabOrder?:      number;
  UpdateDate?:    Date;
  UpdatedByName?: string;
  SubCategoryId?: number;
}



export interface Department {
  Id?: number;
  Number?: string;
  Description?: string;
  AuthorizingManagerId?: number;
  AuthorizingManagerExternalId?: string;
  CompanyId?: number;
  CompanyExternalId?: string;
  OrganizationUnitCode?: string;
  Active?: boolean;
  TabOrder?: number;
  ParentDepartmentId?: number;
  UpdateDate?: string;
  UpdatedById?: number;
  UpdatedByExternalId?: string;
}

export interface ActivityGroup {
  Id: number;
  Name: string;
  DefaultFlag: boolean;
  DataExtractFlag: boolean;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  ExternalId?: string;
}

export interface AccountSegment {
  Id: number;
  Name: string;
  Active: boolean;
  IncludeInValidationFlag: boolean;
  TabOrder: number;
  CharacterLimit: number;
  CaseRestriction: number;
  ExternalId: string;
}

export interface FamisAttachment {
  Id: number;
  RequestId: number;
  Name: string;
  Description: string;
  FileName: string;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  AttachmentTypeId?: string;
  RequestExternalId?: string;
  Contents?: string;
}

export interface WorkType {
  Id: number;
  Name: string;
  Description?: string;
}

export interface Space {
  Id: number;
  ExternalId: string;
  Name: string;
  FloorName?: any;
  OccupantsDay?: number;
  OccupantsNight?: number;
  OccupantsTotal?: number;
  Size?: number;
  RoomTypeId?: number;
  PropertyId: number;
  PropertyExternalId: string;
  FloorId: number;
  FloorExternalId: string;
  AccountId?: number;
  ContactPersonId?: number;
  ContactPersonExternalId: string;
  CostCodeId?: number;
  RateScheduleId?: number;
  ActiveFlag: boolean;
  DefaultFlag: boolean;
  RequestCloseNotification: boolean;
  OverrideBillableFlag: boolean;
  TabOrder: number;
  SurveyFlag: boolean;
  CommonAreaFlag: boolean;
  OccupancyStatusId?: number;
  UpdateDate: Date;
  UpdatedById: number;
  CadId: string;
  ClassId?: number;
  Telephone: string;
  CadSpaceId: string;
  LongDescription: string;
  EpPlanChildId?: number;
  RequestPriorityListId?: number;
  Floor?: Floor;
  Udfs?: Udf[];
  SpaceCategorization?: SpaceCategorization;
  SpaceArea?: SpaceArea[];
}

export interface Floor {
  FloorId: number;
  Description: string;
  PropertyId: number;
  Default: boolean;
  TabOrder: number;
  UpdatedByName: string;
  UpdateDate: Date;
  Active: boolean;
  LongDescription: string;
  FloorCategoryId?: number;
  FloorTypeId?: number;
  IdealFloorCategoryId?: number;
  FunctionalCategoryId?: number;
  FunctionalSubCategoryId?: number;
  OwnershipStatus?: number;
  DateAvailable?: Date;
  PropertyAccountId?: number;
  BillingUnitCost: number;
  BillingCurrency?: string;
  CadId: string;
  ClassId?: number;
  TowerWingRequired?: boolean;
  ExternalFloorId: string;
  ExternalPropertyId: string;
}

export interface Segment {
  SegmentId: number;
  SegmentValueId?: number;
  SegmentValue: string;
}

export interface Detail {
  Percentage: number;
  ChartOfAccountsId?: number;
  ChartOfAccountsExternalId?: string;
  IndexId?: number;
  IndexExternalId?: string;
  Segments: Segment[];
}

export interface AccountInfo {
  HoldReason: string;
  HoldFlag: boolean;
  BillingTypeId: number;
  Details: Detail[];
}

export interface RequestStatus {
  Id: number;
  ExternalId: string;
  Name: string;
  TabOrder: number;
  ActiveFlag: boolean;
  DefaultOpenStatusFlag: boolean;
  DefaultCloseStatusFlag: boolean;
  DefaultGuestCompleteFlag: boolean;
  DefaultApprovedFlag: boolean;
  DefaultDeclinedFlag: boolean;
  DefaultWaitingApprovalFlag: boolean;
  DefaultWorkCompleteFlag: boolean;
  OpenStatusFlag: boolean;
  ClosingStatusFlag: boolean;
  EnteredInErrorFlag: boolean;
  WorkCompleteFlag: boolean;
  OnHoldFlag: boolean;
  ResponseFlag: boolean;
  InProgressFlag: boolean;
  ServiceEscalationFlag: boolean;
  OverrideLaborRequiredFlag: boolean;
  SendCloseNotificationFlag: boolean;
  LockedFlag: number;
  LockedFinancialFlag: number;
  SendWebServicesUpdatesFlag: boolean;
  CommentIsRequiredOnChange: boolean;
  DefaultCcStatusFlag: boolean;
  DefaultInProgressStatusFlag: boolean;
  StatusMapping?: string;
  DefaultCanceledStatus: boolean;
  StatusEnum: string;
  StatusCode: string;
  TeStatusFlag: boolean;
  StatusColor?: string;
}

export interface RequestType {
  DefaultOpenStatusExternalId?: string;
  Id: number;
  Description: string;
  TabOrder: number;
  ActiveFlag: boolean;
  ProjectFlag: boolean;
  SurveyTypeId?: any;
  AssetReqCreateFlag: boolean;
  ExternalId: string;
  AssetReqCloseFlag: boolean;
  PushWoExtSystemFlag: boolean;
  DefaultOpenStatusId?: number;
  MaintenanceFlag: boolean;
  AllowParentChildFlag: boolean;
  StandingWoTypeFlag: boolean;
  PsArInvoiceFlag: boolean;
  SignatureReqWoCompleteFlag: boolean;
  AccountStringRequiredCreateFlag: boolean;
  AccountStringRequiredCloseFlag: boolean;
  KeyWoTypeFlag: boolean;
}

export interface RequestPriority {
  Active: boolean;
  DefaultSlaCompletionTime: number;
  DefaultSlaResponseTime: number;
  ExternalId?: string;
  Id: number;
  Name: string;
  OverrideSlaServiceHours: boolean;
  PushWorkOrdersToExternalSystem: boolean;
  ResponseLimit: number;
  RequestPriorityListId?: any;
  ScheduledWorkOrdersOnly: boolean;
  TabOrder: number;
  UpdateDate: Date;
  UpdatedByExternalId?: string;
  UpdatedById: number;
  Level?: string;
  EmergencyEscalation: boolean;
}

export interface RequestSubType {
  Id: number;
  Description: string;
  RequestTypeId: number;
  DefaultBillableFlag: boolean;
  BillCodeId?: number;
  ActiveFlag: boolean;
  UpdatedById: number;
  UpdateDate: Date;
  TabOrder: number;
  ProcedureId?: number;
  GlAccountNumber?: string;
  DefaultLaborActivityId?: number;
  ServiceTypeId?: number;
  GlAccountContraLabor?: string;
  GlAccountNumberLabor?: string;
  ExternalId: string;
  MarkupFlag: boolean;
  SpendCategory?: string;
  CommodityCode?: string;
  WoPrintId?: number;
  CostCodeGroupId?: number;
  ChargeToSetting: number;
  NotifyRequestorOption: number;
  HierarchyId: number;
  RequestTypeExternalId?: string;
  ProcedureExternalId?: string;
  DefaultLaborActivityExternalId?: string;
  UpdatedByExternalId?: string;
  PropertyBillCodeAssociations?: PropertyBillCodeAssociations[];
}

export interface WorkOrderComment {
  Id: number;
  RequestId: number;
  CreatorId: number;
  RequestDetailDescription: string;
  NewStatusId: number;
  CreateDate: Date;
  InternalOnlyFlag: boolean;
  ClosedFlag: boolean;
  PreviousAssignedId?: number;
  AssignedId: number;
  CloseByDate?: Date;
  UpdateDate: Date;
  ServiceEscalationFlag: boolean;
  InitialCommentFlag: boolean;
  EstimatedTotalAmount: number;
  PreviousAssignedCrewId?: number;
  AssignedCrewId?: number;
  AssignedCrewDescription: string;
  CommentLength: number;
  ApplicationId?: number;
  UpdateDatePropertyTime: Date;
  ExternalCreatorId: string;
  ExternalRequestId: string;
  ExternalPreviousAssignedId?: string;
  ExternalAssignedId: string;
  ExternalPreviousAssignedCrewId?: string;
  ExternalAssignedCrewId?: string;
}

export interface WorkOrder {
  Id: number;
  RequestTypeId: number;
  RequestSubTypeId: number;
  RequestPriorityId: number;
  StatusId: number;
  LastStatusEnum: string;
  StatementOfWork: string;
  ExternalId: string;
  ExternalId2: string;
  AssignedDate: Date;
  ClosedDate?: Date;
  ClosedById?: number;
  CreateDate: Date;
  CreatedById: number;
  CompleteByDate?: Date;
  UpdateDate: Date;
  DateScheduled?: Date;
  TimeScheduled?: Date;
  ActualCompletionDate?: Date;
  SlaEstimatedResponseDate?: Date;
  SlaActualResponseDate?: Date;
  SlaEstimatedCompletionDate?: Date;
  SlaActualCompletionDate?: Date;
  SlaOverdueAlertFlag: boolean;
  PropertyHoursInDay: number;
  ActualCompletionTime?: number;
  ActualResponseTime?: number;
  ExcludeSlaReportingFlag: boolean;
  ResponseExcludedFlag: boolean;
  CompletionExcludedFlag: boolean;
  ReassignReasonId?: number;
  CompletionReasonId?: number;
  RequestedCompletionDate?: Date;
  SlaResponsePastDue: boolean;
  SlaCompeletionPastDue: boolean;
  SpaceId: number;
  SubSpaceId?: number;
  RoomCube: string;
  NotifyAssignedToMethod: number;
  CloseNotificationFlag: boolean;
  NotifyAssignedToFlag: boolean;
  ReNotifyAssignedToFlag: boolean;
  NotifyFollowUpAlert: number;
  InitialNotificationFlag: boolean;
  FollowUpNotificationFlag: boolean;
  NotifyDate?: Date;
  EmailCC: string;
  NotifyRequestorAutoSentFlag: boolean;
  NotifySlaReminderSentFlag: boolean;
  AssignedToId: number;
  CrewId?: number;
  RequestorLastName: string;
  RequestorFirstName: string;
  RequestorName: string;
  RequestorPhone: string;
  RequestorEmail: string;
  RequestorFax: string;
  RequestorCompanyName: string;
  RequestorId?: number;
  CreatedByFirstName: string;
  CreatedByLastName: string;
  CreatedByPhone: string;
  CreatedByEmail: string;
  BillableFlag: boolean;
  BillingStatusFlag: boolean;
  TotalLaborCost: number;
  TotalMaterialCost: number;
  TotalOtherCost: number;
  TotalMarkup: number;
  BillCodeId?: number;
  CostCodeId?: number;
  NotToExceedAmount: number;
  NotToExceedComment?: string;
  EstimatedLaborHours: number;
  ExternalCostCenter: string;
  ExternalCostCenterId?: string;
  ExternalCostCenterDescription?: string;
  EstimatedTotalAmount: number;
  TotalLaborHours: number;
  DefaultAccountId?: number;
  DefaultCoaAccountId?: number;
  DefaultCoaCreditAccountId?: number;
  TotalTax: number;
  ServiceProviderRefNumber?: string;
  ServiceProviderToInvoiceFlag?: boolean;
  ChargeTypeId?: number;
  AssetNumber: string;
  AssetId?: number;
  FailureCodeId?: number;
  RequireAssetFlag?: boolean;
  InspectionId?: number;
  InspectionDetailId?: number;
  RecurrenceId?: number;
  ProcedureId?: number;
  ProcedureNameHistory?: string;
  AttachedFileName?: string;
  ProcedureBodyHistory?: string;
  ProvisionId?: number;
  ProvisionDetailId?: number;
  IncidentId?: number;
  ReservationId?: number;
  ParentWOId?: number;
  TopLevelFlag: boolean;
  EscalateToId?: number;
  ServiceEscalationFlag: boolean;
  ApprovedByName?: string;
  ApprovedDate?: Date;
  RequestApprovalflag: boolean;
  AuthentryFlag: boolean;
  AuthentryRemarks?: string;
  CustomerPoNumber?: string;
  InvoiceDate?: Date;
  ProjectId?: number;
  ExternalCompanyDescription?: string;
  CompanyDocumentId?: number;
  VendorCompanyId?: number;
  VendorUserFlag: boolean;
  VendorInvoiceCompany?: string;
  VendorInvoiceAddress?: string;
  VendorInvoicePhone?: string;
  VendorInvoiceFax?: string;
  DepartmentId?: number;
  KbaseFlag: boolean;
  ContractNumber?: string;
  DispatchDate?: Date;
  ResolutionCodeId?: number;
  OriginationCodeId?: number;
  ExportFlag: boolean;
  ExportDate?: Date;
  CloseByDateChangeCount: number;
  CorrectiveRequestFlag: boolean;
  ExternalSystemId?: string;
  DispatchExternalAckDate?: Date;
  CloseExternalAckDate?: Date;
  InvoiceNumber?: string;
  AltPhone?: string;
  RoomTypeId?: number;
  Signature?: string;
  SignatureText?: string;
  SignatureDate?: Date;
  BudgetYear?: number;
  BudgetFlag: boolean;
  RunTimeValue?: string;
  RunTimeTypeId?: number;
  BeenOnHoldFlag: boolean;
  AuthorizerName?: string;
  AuthorizerPhone?: string;
  EstimatedArrivalDate?: Date;
  ActualArrivalDate?: Date;
  ArBatchId?: number;
  RequestWaiverComments?: string;
  RequestWaiverId?: number;
  ExtInvAmount?: number;
  ExternalPOLineNumber: string;
  TrackingCodeId?: any;
  PsArInvoiceFlag: boolean;
  IsOpenRequest?: boolean;
  IsClosedRequest?: boolean;
  PmIntegrated: boolean;
  UserGroupId: number;
  WorkTypeId?: number;
  PropertyId: number;
  CompleteByDatePropertyTime?: Date;
  SlaEstimatedResponseDatePropertyTime?: Date;
  SlaEstimatedCompletionDatePropertyTime?: Date;
  PropertyExternalId: string;
  RequestTypeExternalId: string;
  RequestSubTypeExternalId: string;
  SpaceExternalId: string;
  SubSpaceExternalId?: string;
  RequestPriorityExternalId?: string;
  CreatedByExternalId: string;
  ClosedByExternalId: string;
  AssignedToExternalId: string;
  StatusExternalId: string;
  InspectionExternalId?: string;
  AssetExternalId: string;
  ProcedureExternalId: string;
  EscalateToExternalId?: string;
  IncidentExternalId?: string;
  ParentWOExternalId: string;
  InspectionDetailExternalId?: string;
  VendorCompanyExternalId?: string;
  RequestorExternalId: string;
  CrewExternalId: string;
  GeneralComments?: string;
  InternalComments?: string;
  WoAuthFlag?: boolean;
  WoAuthComments?: string;
  NotifyRequestorFlag: boolean;
  AppendToStatementOfWorkFlag: boolean;
  AccountInfo: AccountInfo;
  Space?: Space;
  Property?: Property;
  Status?: RequestStatus;
  AssignedToUser?: FamisUser;
  RequestPriority?: RequestPriority;
  RequestType?: RequestType;
  Asset?: Asset;
  RequestSubType?: RequestSubType;
  WorkOrderComment?: WorkOrderComment;
  Attachments?: FamisAttachment[];
  Udfs?: Udf[];
}

export interface AssetClass {
  Id: number;
  Description: string;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  ActiveFlag: boolean;
  TabOrder: number;
  AssetTag: string;
  MeterClass: boolean;
  Guid: string;
}

export interface AssetKeyword {
  Id: number;
  Name: string;
  Description: string;
  TabOrder: number;
  ActiveFlag: boolean;
  UpdatedByName: string;
  UpdateDate: Date;
}

export interface AssetStatus {
  Id: number;
  Name: string;
  Value: number;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  ActiveFlag: boolean;
  TabOrder: number;
}

export interface AssetMake {
  Id: number;
  Description: string;
  Url: string;
  ActiveFlag: boolean;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
}

export interface CreateAssetMake {
  Description: string;
  Url?: string;
  ActiveFlag: boolean;
}

export interface AssetModel {
  ActiveFlag: boolean;
  Description: string;
  Id: number;
  MakeId: number;
  UpdateDate: Date;
  UpdatedById: number;
  Url?: string;
  UpdatedByExternalId: string;
}

export interface CreateAssetModel {
  ActiveFlag: boolean;
  Description: string;
  MakeId: number;
  Url?: string;
}

export interface AssetType {
  Id: number;
  Description: string;
  Name: string;
  ActiveFlag: boolean;
  UpdateDate: Date;
  UpdatedByName: string;
  TabOrder: number;
}

export interface CreateAssetAttachment {
  AssetId: string;
  FileName: string;
  TypeId: number;
  Contents: any;
  Name: string;
  Description: string;
}

export interface Asset {
  Id: number;
  Name: string;
  Description: string;
  AssetNumber: string;
  SerialNumber: string;
  AssetClassId: number;
  AssetRankId: number;
  EcriCodeId?: number;
  MakeId: number;
  ModelId: number;
  InServiceDate?: Date;
  PurchasedFromVendor?: string;
  AssetStatusId: number;
  StatusComment?: string;
  BarcodeNumber: string;
  FinancialSystemId: string;
  AssetSafetyComments?: string;
  AssetKeywordId?: number;
  ExternalId: string;
  AssetTypeId?: number;
  RiskAssessment?: any;
  ExternalSystemId?: any;
  Guid: string;
  PropertyId: number;
  SpaceId: number;
  EmployeeId?: number;
  Room: string;
  QuantityAvailable: number;
  Comments: string;
  ActiveFlag: boolean;
  FloorId: number;
  SubSpaceId?: number;
  AutoAssignedToId?: number;
  WarrantyContractNumber?: string;
  WarrantyEffectiveDate?: Date;
  WarrantyExpirationDate?: Date;
  WarrantyExpirationContact?: number;
  WarrantyExpirationContactPhone?: string;
  WarrantyVendorId?: number;
  WarrantyPoNumberId?: number;
  MaintenanceContractNumber?: number;
  MaintenanceContractVendorId?: number;
  MaintenanceContractExpirationDate?: Date;
  MaintenanceContractNotificationDays?: string;
  PurchaseDate?: Date;
  PurchaseAmount?: number;
  ExternalCostCenterId?: number;
  PurchaseCostCenter?: number;
  PoNumber?: string;
  EstimatedLifeInYears: number;
  EstimatedLifeInHours: number;
  AnnualRuntimeInHours: number;
  CapitalRepairCost: number;
  EstimatedReplacementCost?: number;
  LifeExpectancy?: number;
  UnitMultiplier?: number;
  MeterMultiplier?: number;
  MeterFormat?: string;
  UomId?: number;
  UtilityId?: number;
  LastCalibrationDate?: Date;
  MeterSiteId?: number;
  MeterInstallationDate?: Date;
  MeterInitialReading?: string;
  MeterLastReadingDate?: Date;
  MeterLastReading?: number;
  UpdateDate: Date;
  UpdatedById: number;
  FcaRankId?: number;
  PropertyExternalId: string;
  SpaceExternalId: string;
  EmployeeExternalId?: string;
  WarrantyVendorExternalId?: string;
  MaintenanceContractVendorExternalId?: string;
  UpdatedByExternalId: string;
  FloorExternalId: string;
  SubSpaceExternalId?: string;
  AutoAssignedToExternalId?: string;
  // Expandable properties
  Space?: Space;
  AssetUdfs?: Udf[];
  AssetModel?: AssetModel;
  AssetRank?: AssetRank;
  AssetClass?: AssetClass;
}

export interface AssetRank {
  Description?: string;
  Value?: number;
  Id?: number;
  UpdateDate?: Date;
  Active?: boolean;
}

export interface Crew {
  Id: number;
  ExternalId: string;
  ActiveFlag: boolean;
  UpdateDate: Date;
  UpdatedById: number;
  ExternalUpdatedById: string;
  Description: string;
  Rate: number;
  OT: number;
  DT: number;
  CompanyId: number;
  CompanyExternalId: string;
  DepartmentId: number;
  DepartmentExternalId: string;
  RateScheduleFlag: boolean;
  IsCrewFlag: boolean;
  CrewHoursDay: number;
}

export interface CrewUserAssociation {
  Id: number;
  UserId: number;
  UserExternalId?: string;
  CrewId: number;
  CrewExternalId?: string;
  UpdateDate?: Date;
  UpdatedById?: number;
  UpdatedByExternalId?: null;
  Rate?: number;
  OT?: number;
  DT?: number;
  UseCrewRatesFlag?: boolean;
  DefaultCrewFlag?: boolean;
  CrewLeaderFlag?: boolean;
}

export interface Company {
  Id: number;
  Name: string;
  Addr1: string;
  City: string;
  Zip: string;
  StateId: number;
  State: string;
  CountryId?: number;
  Country: string;
  TypeId: number;
  Phone: string;
  ActiveFlag: boolean;
  UpdateDate: Date;
  ExternalId: string;
  TimeCardFlag: boolean;
  VendorFlag: boolean;
  MinorityFlag: boolean;
  WomanOwnedFlag: boolean;
  PreferredVendorFlag: boolean;
  SupplierFlag: boolean;
  SubcontractorAuthFlag: boolean;
  W9OnFileFlag: boolean;
  CurrencyInstallId?: number;
  Addr2: string;
  Fax: string;
  Website: string;
  EmergencyPhone: string;
  Email: string;
  PagerNumber: string;
  PrimaryContactName: string;
  CategoryId?: number;
  SecondaryCategoryId?: number;
  SicCode: string;
  InternalVendorCode: string;
  TaxpayerId: string;
  ContractTypeId?: any;
  ContractComments: string;
  MobilePhone: string;
  InternalVendorCode2: string;
  RiskRating: string;
  TypeOfAccessId?: any;
  PaymentTermId?: number;
  ShippingMethodId?: any;
  FreeOnBoardId?: any;
  RoutingNumber: string;
  Addr3: string;
  RemAddr1: string;
  RemAddr2: string;
  RemAddr3: string;
  RemCity: string;
  RemZip: string;
  RemStateId?: any;
  Description: string;
  VisitAutoCreateFlag: boolean;
  DebtorFlag: boolean;
  LandOwnerFlag: boolean;
  MeterSiteFlag: boolean;
  ExtMasterCompanyFlag: boolean;
}

export interface Currency {
  Id: number;
  Name: string;
  Abbreviation: string;
  Code: number;
  ActiveFlag?: boolean;
  InstalledFlag: boolean;
  CurrencyInstallId?: number;
  Sign: string;
}

export interface Property {
  Id: number;
  UpdateDate: Date;
  CreateDate: Date;
  InactiveDate?: Date;
  UpdatedbyName: string;
  Name: string;
  Addr1: string;
  City: string;
  StateId: number;
  Zip: string;
  CountryId: number;
  TypeId: number;
  ActiveFlag: boolean;
  DefaultPmCompanyId: number;
  DefaultSpCompanyId: number;
  DefaultPmEmployeeId: number;
  DefaultSpEmployeeId: number;
  RequestCloseNotification: boolean;
  PrintProcedureFlag: boolean;
  WoPrintId: number;
  TimeZoneId: number;
  SlaExcludeWeekendsFlag: boolean;
  InventoryFlag: boolean;
  RequestCloseNotificationScheduled: boolean;
  SurveyFlag: boolean;
  UnitOfMeasurement: string;
  Addr2: string;
  SqFt: number;
  ExternalId: string;
  Guid: string;
  MaterialsListId?: number;
  RequestPriorityListId?: number;
  SlaBusinessStartTime: string;
  SlaBusinessEndTime: string;
  SfOffice?: number;
  SfWhse?: number;
  InvoiceFormatId?: number;
  DefaultCostCenterId?: number;
  WoPrintScheduledId: number;
  RateScheduleId?: number;
  SurveyRulesId?: number;
  BudgetCalendarId?: number;
  ExternalId2: string;
  HolidayId?: number;
  ExternalIdEp: string;
  CloseNotificationBody?: string;
  CloseNotificationSubject?: string;
  RemitTo: string;
  NotifyRequestorAutoSetting: number;
  ExternalId2Reimbursable: string;
  LanguageId?: number;
  SfRetail: number;
  SfOther: number;
  BillToAddress: string;
  SfResidential: number;
  SfManufacturing: number;
  DefaultNteAmount?: number;
  CurrencyInstallId?: number;
  TierId?: number;
  DispositionId?: number;
  Description: string;
  LocationId: string;
  Territory: string;
  AccrualAmount: string;
  CashAmount: string;
  SubtypeId?: number;
  ExternalLinkUrl: string;
  SfHealthcare: number;
  ExternalUpdateDate?: Date;
  EmergencyEscalationAlertFrequency: number;
  RequestConfirmationDescription?: string;
  PrintBarCodeFlag: boolean;
  SurveyLink?: string;
  SalesTaxGroupId?: number;
  DefaultMessageBody?: string;
  DefaultMessageSubject?: string;
  DefaultMobileBody?: string;
  DefaultMobileSubject?: string;
  FollowupMessagePrefix?: string;
  FollowupMobilePrefix?: string;
  RequestConfirmationBody?: string;
  RequestConfirmationSubject?: string;
  RequestNotifyRequestorBody?: string;
  RequestNotifyRequestorSubject?: string;
  SchedNotificationBody?: string;
  SchedNotificationBodyMobile?: string;
  SchedNotificationSubject?: string;
  SchedNotificationSubjectMobile?: string;
  SurveyConfirmationText?: string;
  SurveyText?: string;
  UpdateNotificationBody?: string;
  UpdateNotificationBodyMobile?: string;
  UpdateNotificationSubject?: string;
  UpdateNotificationSubjectMobile?: string;
  VisitorBadgeFormat?: string;
  NotifyRequestorAutoSentSubject?: string;
  NotifyRequestorAutoSentBody?: string;
  ApprovalWoMessageSubject?: string;
  ApprovalWoMessageBody?: string;
  ApprovalPoMessageSubject?: string;
  ApprovalPoMessageBody?: string;
  ApprovalProjectMessageSubject?: string;
  ApprovalProjectMessageBody?: string;
  IncidentNotificationSubject?: string;
  IncidentNotificationBody?: string;
  InspectionNotificationSubject?: string;
  InspectionNotificationBody?: string;
  IncidentNotificationUpdateSubject?: string;
  IncidentNotificationUpdateBody?: string;
  ApprovalPrMessageSubject?: string;
  ApprovalPrMessageBody?: string;
  VisitorStartTime: string;
  VisitorEndTime: string;
  VisitorImageFilename: string;
  VisitorDeskRefreshRate?: string;
  VisitorDeskRollingWindow?: boolean;
  VisitorEntryEnabledFlag: boolean;
  ChartOfAccountsId?: number;
  ChartOfAccountsCustomerId?: number;
  AccountCreateFlag: boolean;
  ReservationFlag: boolean;
  DefaultPoFormatId?: number;
  PushWosToExternalSystem: boolean;
  ShipToAddress?: string;
  ProbilCustomField1?: string;
  OperationalStatusId?: number;
  FacilityManagerId?: number;
  RegionManagerId?: number;
  DefaultPmCompanyExternalId: string;
  DefaultSpCompanyExternalId: string;
  DefaultPmEmployeeExternalId?: string;
  DefaultSpEmployeeExternalId?: string;
  FacilityManagerExternalId?: string;
  RegionManagerExternalId?: string;
  TimeZoneExternalId: string;
  TotalArea1: number;
  TotalArea2: number;
}

export interface PropertyRequestTypeAssociation {
  Id: number;
  PropertyId: number;
  PropertyExternalId?: string;
  RequestTypeId: number;
  RequestTypeExternalId?: string;
  ActiveFlag?: boolean;
  UpdateDate?: Date;
  DefaultFollowUpAlert?: number;
  EscalateToId?: null;
  EscalateToExternalId?: null;
  DefaultSlaResponseTime?: number;
  DefaultSlaCompletionTime?: number;
  SlaOverdueAlertFlag?: boolean;
  SlaSendNotificationsFlag?: boolean;
  SecurityFilter?: null;
}

export interface PropertyRegionAssociation {
  Id: number;
  PropertyId: number;
  RegionId: number;
  UpdateDate: Date;
  PropertyExternalId: string;
  RegionExternalId: string;
}

export interface FamisUser {
  Id: number;
  CompanyId: number;
  FirstName: string;
  LastName: string;
  Title: string;
  TypeId: number;
  Addr1: string;
  Addr2: string;
  City: string;
  State: string;
  Zip: string;
  Country: string;
  BusPhone: string;
  MobPhone: string;
  Fax: string;
  Email: string;
  MobEmail: string;
  HomePhone: string;
  AsstPhone: string;
  UserName: string;
  Password?: any;
  ActiveFlag: boolean;
  UpdateDate: Date;
  RequestHistoryDays: number;
  RegHourlyRate: number;
  ExternalId: string;
  UpdatedById: number;
  WoAuthFlag: boolean;
  WoAuthComments: string;
  OtHourlyRate: number;
  DotHourlyRate: number;
  IntRegHourlyRate: number;
  IntOtHourlyRate: number;
  IntDotHourlyRate: number;
  VisitorEmailFlag: boolean;
  EmailWoConfirmationFlag: boolean;
  TimeCardFlag: boolean;
  DefOriginationCodeId: number;
  RequestFutureDays: number;
  CubeNumber: string;
  RestrictedFullUserFlag: boolean;
  WorkStatusFlag: boolean;
  DefaultPage: string;
  DepartmentDescription: string;
  DepartmentId: number;
  PositionDescription?: string;
  PositionId?: any;
  PositionStandardId?: number;
  ExternalSystemId?: string;
  ProfileId?: number;
  LanguageId?: number;
  UseRateScheduleFlag: boolean;
  TimeCardFormatId?: number;
  PayrollExternalId?: string;
  RequestsPerPage: number;
  SelfRegistrationProfileFlag: boolean;
  MarkupFlag: boolean;
  MobileRequestFutureDays: number;
  MobileRequestHistoryDays: number;
  MobileRequestsPerPage: number;
  CoiExpirationDate?: Date;
  CountryId: number;
  StateId: number;
  AccountId?: number;
  DateFormatId?: number;
  MobileDateFormatId?: number;
  WoApprovalLevelId?: number;
  PoApprovalLevelId?: number;
  ProjectApprovalLevelId?: number;
  PrApprovalId?: number;
  PrimaryTimeCardApproverId?: number;
  PrBuyerFlag: boolean;
  ProfileFlag: boolean;
  PasswordNeverExpiresFlag: boolean;
  SsoRequiredFlag: boolean;
  AlsIncorrectLoginCount: number;
  AlsForcePasswordChangeFlag: boolean;
  AlsNeverInactivateFlag: boolean;
  AlsLoginExpirationDate?: Date;
  AlsLoginStatus: number;
  CompanyExternalId: string;
  ProfileExternalId: string;
  UpdatedByExternalId: string;
  Name: string;
  LockAssignedWorkOrdersFlag: boolean;
  IsAllocatingIndividual: boolean;
  LaborEntryIds: number[];
  LaborEntryComment?: string;
}

export interface UserRegionAssociation {
  Id: number;
  UserId: number;
  RegionId: number;
  TabOrder: number;
  GuestFlag: boolean;
  UserExternalId: string;
  RegionExternalId: string;
}

export interface UserPropertyAssociation {
  Id: number;
  UserId: number;
  PropertyId: number;
  DefaultPropertyFlag: boolean;
  DefaultSpaceId: number;
  GuestFlag: boolean;
  DefaultSubspaceId: number;
  UserExternalId: string;
  PropertyExternalId: string;
  DefaultSpaceExternalId: string;
  DefaultSubspaceExternalId: string;
}

export interface Udf {
  FieldName: string;
  Value?: string;
  ListboxDescription?: string;
  DataType?: string;
  ListBoxId?: string;
  AssetClassId?: number;
  AssetId?: number;
  FieldId?: number;
  GroupDescription?: string;
  ApplicationName?: string;
  TabOrder?: number;
  Required?: boolean;
  GroupTabOrder?: number;
  GroupId?: number;
  AllocationHeaderId?: number;
  AllocationLayerId?: number;
  RequestId?: number;
}


export interface RequestTypeActivityGroupAssociations {
  Id: number;
  ActivityGroupId: number;
  ActivityGroupExternalId: string;
  RequestTypeId: number;
  RequestTypeExternalId: string;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  ActivityGroup: ActivityGroup;
}

export interface UserActivityGroupAssociations {
  Id: number;
  UserId: number;
  UserExternalId?: string;
  ActivityGroupId: number;
  ActivityGroupExternalId?: string;
  TabOrder: number;
  AllowAssignmentFlag: boolean;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  GuestFlag: boolean;
}

export interface DataType {
  Id: number;
  Description: string;
  Code: number;
}

export interface Grouping {
  Id: number;
  Description: string;
  ApplicationName: string;
  TabOrder: number;
  Active: boolean;
  UpdateDate: Date;
  UpdatedById: number;
}

export interface ListBox {
  Id: number;
  FieldId: number;
  Description: string;
  Value: string;
  Active: boolean;
}

export interface UdfField {
  Id: number;
  DisplayName: string;
  ListBoxFlag: boolean;
  DataTypeId: number;
  MaxLength: number;
  TabOrder: number;
  Active: boolean;
  ApplicationName: string;
  RequiredFlag: boolean;
  GroupingId: number;
  UpdateDate: Date;
  UpdatedById: number;
  CompanyTypeId: number;
  CompanyDocumentTypeId: number;
  ResourceTypeId: number;
  ResourceId: number;
  ObjectTypeId: number;
  SpaceClassId: number;
  FloorClassId: number;
  UtilityId: number;
  MeterSiteTypeId: number;
  RegionType: string;
  PositionId: number;
  AllocationLayerMethod: number;
  DataType: DataType;
  Grouping: Grouping;
  ListBoxes: ListBox[];
}

export interface ChargeType {
  Id: number;
  Name: string;
  Description: string;
  TabOrder: number;
  ActiveFlag: boolean;
  UpdateDate: Date;
  UpdatedByName: string;
}

export interface BillCode {
  Id: number;
  Description: string;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  Active: boolean;
  BillTypeId: number;
  GlIncomeAccount: string;
}

export interface PropertyBillCodeAssociations {
  PropertyExternalId: string;
  RequestSubTypeExternalId: string;
  UpdatedByExternalId: string;
  EscalateToExternalId: string;
  ProcedureExternalId: string;
  DefaultPriorityExternalId: string;
  Id: number;
  PropertyId: number;
  RequestSubTypeId: number;
  BillCodeId: number;
  UpdateDate: Date;
  UpdatedById: number;
  ActiveFlag: boolean;
  GlAccountNumber: string;
  BillableFlag: boolean;
  EscalateToId: number;
  DefaultFollowUpAlert: number;
  ProcedureId: number;
  DefaultSlaResponseTime: number;
  DefaultSlaCompletionTime: number;
  FullUsersFlag: boolean;
  ApAccountNumber: string;
  GlAccountContraLabor: string;
  DefaultPriorityId: number;
  TaxableFlag: boolean;
  WoPrintId: number;
  NTE: number;
}

export interface UserType {
  Id: number;
  Description: string;
  GuestFlag: boolean;
  UnnamedGuestFlag: boolean;
}

export interface LogbookConfiguration {
  FullUserPriorityEnabled: boolean;
  AdvancedSearchEnabled: boolean;
  CdwFlag: boolean;
  ProcessRequestorEmail: boolean;
  DepartmentFlag: boolean;
  CrCcEmailFlag: boolean;
  CostCodeRequiredCloseFlag: boolean;
  FailureCodeRequiredCloseFlag: boolean;
  DisplayPropertySelectBoxThreshold: number;
  WaiverInformationFlag: boolean;
  RequireCommentsOnReclassFlag: boolean;
  DisplayUserSelectBoxThreshold: number;
  DisplayUserSelectBoxThresholdWorkloading: number;
  DisplayServiceProviderSubmitInvoiceFlag: number;
  RequireServiceProviderSubmitInvoiceFlag: boolean;
  AllowSavedSearchesFlag: boolean;
  DisplayPoLineNumber: boolean;
  DisplayTrackingCodeFlag: boolean;
  TrackingCodeRequireOnClose: boolean;
  RefreshMyRequestsPage: boolean;
  CrewRequired: boolean;
  UseMassUpdate: boolean;
  AllowWoClosureWithOpenPoOrShoppingCart: boolean;
  GuestRoomcubeRequiredFlag: boolean;
  GuestDepartmentRequiredFlag: boolean;
  GuestPriorityEnabledFlag: boolean;
  CrNotifyRequestorFlag: boolean;
  FulluserDepartmentRequiredFlag: boolean;
  CrExternalCostCenterEnabled: boolean;
  ExternalCostCenterRequired: boolean;
  AllowParentChildCharges: number;
  LimitParentChildGenerations: boolean;
  MaintProjectTypeInheritedFromParent: boolean;
  MaintProjectLocationInheritedFromParent: boolean;
  AllowParentCloseWithChildrenOpen: boolean;
  WoSendNotifyRepeatEnabledFlag: boolean;
  WoDisplayRequestedForInformationFlag: boolean;
  DisplayExtInvAmount: boolean;
  DisplayServiceProviderRefNumber: boolean;
  LaborRequiredFlag: boolean;
  WoTimeEntryIncrement: number;
  WoHourEntryIncrement: number;
  MaterialTaxRateEnabledFlag: boolean;
  OthercostTaxRateEnabledFlag: boolean;
  WoLaborTimesRequiredFlag: boolean;
  BillableCostRequiredFlag: boolean;
  ClosingCommentsRequiredFlag: boolean;
  WoSignatureEnabledFlag: boolean;
  DefaultNteAmount: number;
  WoOtherCostDescRequired: boolean;
  EstimateMaterialsTaxRateEnabled: boolean;
  EstimateOtherCostTaxRateEnabled: boolean;
  SlaCalcOnHoldEnabled: boolean;
  SlaCalcNonContigEnabled: boolean;
  SlaLaborResponseFlag: boolean;
  SlaLaborCompletionFlag: boolean;
  ActResponsePendingSetting: number;
  ActCompletionPendingSetting: number;
  SlaOntimeWoFlag: boolean;
  ValidateCOIExpirationDate: boolean;
  AutoAssignedWorkOrderPersonId: number;
  CustomInterfaceWarningMessage?: any;
  CustomSMSEmailAutoReplyWarningMessage?: any;
  RequestTaskWoCostsFlag: boolean;
  RequestTaskCloseWoFlag: boolean;
  EmailBlockingMinutes: number;
  CrCoaAccountEnabledFlag: boolean;
  CrNotifyRequestorEnabledFlag: boolean;
  RdCcEmailFlag: boolean;
  SlaComplianceEnabledFlag: boolean;
  SlaCompletionPrestartFlag: boolean;
  SlaResponsePrestartFlag: boolean;
  ForceDirtyScreenRefresh: boolean;
  UpdateDate: Date;
  UpdatedbyName: string;
  WoMaterialCostDescRequired: boolean;
  ShowHideRequestedCompletionDate: boolean;
  DefaultHierarchy: boolean;
  PopulateLocationForFindContact: boolean;
}

export interface DefaultPropertyAndSpace {
  property?: Property;
  space?: Space;
}

export interface ServiceType {
  Id: number;
  Description: string;
  UpdateDate: string;
  UpdatedById: number;
  UpdatedByExternalId: string;
  GroupDescription: string;
}

export interface LaborCost {
  EmployeeId?:                    number;
  ExternalEmployeeId?:            string;
  TimeStarted?:                   string;
  TimeFinished?:                  string;
  Rate?:                          number;
  Hours?:                         number;
  RateTypeId?:                    number;
  RequestTypeActivityId?:         number;
  ExternalRequestTypeActivityId?: string;
  ApInvoiceNumber?:               string;
  ApAccountNumber?:               string;
  LienWaiverAmount?:              number;
  LienWaiverComments?:            string;
  PaymentComments?:               string;
  ApInvoiceAmount?:               number;
  ApPostDate?:                    Date;
  ApDueDate?:                     Date;
  ApTaxAmount?:                   number;
  ApShippingHandlingAmount?:      number;
  ApInvoiceStatusId?:             number;
  ApInvoiceDate?:                 Date;
  CoaAccountId?:                  number;
  Payee?:                         string;
  TaxAmount?:                     number;
  BudgetYear?:                    number;
  VendorCode?:                    string;
  VendorCompanyExternalId?:       string;
  CrewId?:                        number;
  Id?:                            number;
  InstallId?:                     number;
  RequestId?:                     number;
  RequestExternalId?:             string;
  Date?:                          Date;
  Description?:                   string;
  VendorCompanyId?:               number;
  TotalAmount?:                   number;
  MarkupFlag?:                    boolean;
  TotalMarkup?:                   number;
  AccountId?:                     number;
  UpdateDate?:                    Date;
  RecurrenceId?:                  number;
  UpdatedById?:                   number;
  AccountsPayableFlag?:           boolean;
  ApExportFlag?:                  boolean;
  TaxableFlag?:                   boolean;
  CurrencySign?:                  string;
  CurrencyCode?:                  string;
  LineItemNumber?:                number;
  ExternalId?:                    string;
  TaxRate?:                       number;
  ExternalUpdatedById?:           string;
  ExternalRecurrenceId?:          string;
  InvoiceNumber?:                 string;
  InvoiceDate?:                   Date;
}

export interface OtherCost {
  OtherCostTypeId?:          number;
  OtherCostType?:            OtherCostType;
  Quantity?:                 number;
  UnitCost?:                 number;
  ShippingAndHandlingCost?:  number;
  Account?:                  Account;
  ReceivedById?:             number;
  ApInvoiceNumber?:          string;
  ApAccountNumber?:          string;
  LienWaiverAmount?:         number;
  LienWaiverComments?:       string;
  PaymentComments?:          string;
  ApInvoiceAmount?:          number;
  ApPostDate?:               Date;
  ApDueDate?:                Date;
  ApTaxAmount?:              number;
  ApShippingHandlingAmount?: number;
  ApInvoiceStatusId?:        number;
  ApInvoiceDate?:            Date;
  CoaAccountId?:             number;
  Payee?:                    string;
  TaxAmount?:                number;
  BudgetYear?:               number;
  VendorCode?:               string;
  VendorCompanyExternalId?:  string;
  Id?:                       number;
  InstallId?:                number;
  RequestId?:                number;
  RequestExternalId?:        string;
  Date?:                     Date;
  Description?:              string;
  VendorCompanyId?:          number;
  TotalAmount?:              number;
  MarkupFlag?:               boolean;
  TotalMarkup?:              number;
  AccountId?:                number;
  UpdateDate?:               Date;
  RecurrenceId?:             number;
  UpdatedById?:              number;
  AccountsPayableFlag?:      boolean;
  ApExportFlag?:             boolean;
  TaxableFlag?:              boolean;
  CurrencySign?:             string;
  CurrencyCode?:             string;
  LineItemNumber?:           number;
  ExternalId?:               string;
  TaxRate?:                  number;
  ExternalUpdatedById?:      string;
  ExternalRecurrenceId?:     string;
  InvoiceNumber?:            string;
  InvoiceDate?:              Date;
}

export interface Account {
  Id?:                number;
  RequestId?:         number;
  RequestExternalId?: string;
  Description?:       string;
  Number?:            string;
  IsDefault?:         boolean;
}

export interface OtherCostType {
  Id?:                   number;
  Name?:                 string;
  Active?:               boolean;
  TaxableFlag?:          boolean;
  IncomeCategory?:       string;
  ContraAccountNumber?:  string;
  OtherCostGLAccount?:   string;
  GLAccountId?:          number;
  GLAccountIdForMarkup?: number;
  StandardChargeAmount?: number;
  DiscountedFlag?:       boolean;
}

export interface MaterialCost {
  Id?:                    number;
  RequestId?:             number;
  ItemName?:              string;
  Description?:           string;
  ChargeToAccountNumber?: string;
  ChargeToAccount?:       string;
  Quantity?:              number;
  UnitCost?:              number;
  TaxCost?:               number;
  SHCost?:                number;
  TotalCost?:             number;
  Date?:                  Date;
  LineNumber?:            number;
  EmployeeId?:            number;
  Markup?:                boolean;
  UpdateDate?:            Date;
  TotalMarkup?:           number;
  ItemId?:                number;
  AccountId?:             number;
  TaxRate?:               number;
  MarkupPercentage?:      number;
  WarehouseMaterialId?:   number;
  BudgetYear?:            number;
  Taxable?:               boolean;
  BinId?:                 number;
  PoDetailId?:            number;
  UpdatedByExternalId?:   string;
}