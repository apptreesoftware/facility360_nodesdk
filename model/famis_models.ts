import { Asset } from "./assets";

export interface FamisResponse<T> {
  "@odata.nextLink"?: string;
  value: T[];
}

export interface FamisErrorResponse {
  Result: boolean;
  Context: number;
  Message: string;
}

export interface ActivityGroup {
  Id: number;
  Name: string;
  DefaultFlag: boolean;
  DataExtractFlag: boolean;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  ExternalId?: any;
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
  Contents?: any;
}

export interface WorkType {
  Id: number;
  Name: string;
  Description?: string;
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
  LanguageId?: any;
  SfRetail: number;
  SfOther: number;
  BillToAddress: string;
  SfResidential: number;
  SfManufacturing: number;
  DefaultNteAmount?: any;
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
  SalesTaxGroupId?: any;
  DefaultMessageBody?: any;
  DefaultMessageSubject?: any;
  DefaultMobileBody?: any;
  DefaultMobileSubject?: any;
  FollowupMessagePrefix?: any;
  FollowupMobilePrefix?: any;
  RequestConfirmationBody?: any;
  RequestConfirmationSubject?: any;
  RequestNotifyRequestorBody?: any;
  RequestNotifyRequestorSubject?: any;
  SchedNotificationBody?: any;
  SchedNotificationBodyMobile?: any;
  SchedNotificationSubject?: any;
  SchedNotificationSubjectMobile?: any;
  SurveyConfirmationText?: any;
  SurveyText?: any;
  UpdateNotificationBody?: any;
  UpdateNotificationBodyMobile?: any;
  UpdateNotificationSubject?: any;
  UpdateNotificationSubjectMobile?: any;
  VisitorBadgeFormat?: any;
  NotifyRequestorAutoSentSubject?: any;
  NotifyRequestorAutoSentBody?: any;
  ApprovalWoMessageSubject?: any;
  ApprovalWoMessageBody?: any;
  ApprovalPoMessageSubject?: any;
  ApprovalPoMessageBody?: any;
  ApprovalProjectMessageSubject?: any;
  ApprovalProjectMessageBody?: any;
  IncidentNotificationSubject?: any;
  IncidentNotificationBody?: any;
  InspectionNotificationSubject?: any;
  InspectionNotificationBody?: any;
  IncidentNotificationUpdateSubject?: any;
  IncidentNotificationUpdateBody?: any;
  ApprovalPrMessageSubject?: any;
  ApprovalPrMessageBody?: any;
  VisitorStartTime: string;
  VisitorEndTime: string;
  VisitorImageFilename: string;
  VisitorDeskRefreshRate?: any;
  VisitorDeskRollingWindow?: any;
  VisitorEntryEnabledFlag: boolean;
  ChartOfAccountsId?: any;
  ChartOfAccountsCustomerId?: any;
  AccountCreateFlag: boolean;
  ReservationFlag: boolean;
  DefaultPoFormatId?: any;
  PushWosToExternalSystem: boolean;
  ShipToAddress?: any;
  ProbilCustomField1?: any;
  OperationalStatusId?: any;
  FacilityManagerId?: any;
  RegionManagerId?: any;
  DefaultPmCompanyExternalId: string;
  DefaultSpCompanyExternalId: string;
  DefaultPmEmployeeExternalId?: any;
  DefaultSpEmployeeExternalId?: any;
  FacilityManagerExternalId?: any;
  RegionManagerExternalId?: any;
  TimeZoneExternalId: string;
  TotalArea1: number;
  TotalArea2: number;
}

export interface Space {
  Id: number;
  ExternalId: string;
  Name: string;
  FloorName?: any;
  OccupantsDay?: number;
  OccupantsNight?: number;
  OccupantsTotal?: number;
  Size?: any;
  RoomTypeId?: any;
  PropertyId: number;
  PropertyExternalId: string;
  FloorId: number;
  FloorExternalId: string;
  AccountId?: any;
  ContactPersonId?: number;
  ContactPersonExternalId: string;
  CostCodeId?: any;
  RateScheduleId?: any;
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
  ClassId?: any;
  Telephone: string;
  CadSpaceId: string;
  LongDescription: string;
  EpPlanChildId?: any;
  RequestPriorityListId?: any;
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
  FloorTypeId?: any;
  IdealFloorCategoryId?: any;
  FunctionalCategoryId?: any;
  FunctionalSubCategoryId?: any;
  OwnershipStatus?: number;
  DateAvailable?: any;
  PropertyAccountId?: any;
  BillingUnitCost: number;
  BillingCurrency?: any;
  CadId: string;
  ClassId?: any;
  TowerWingRequired?: any;
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
  ChartOfAccountsExternalId?: any;
  IndexId?: number;
  IndexExternalId?: any;
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
  StatusMapping?: any;
  DefaultCanceledStatus: boolean;
  StatusEnum: string;
  StatusCode: string;
  TeStatusFlag: boolean;
  StatusColor?: any;
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
  PositionDescription?: any;
  PositionId?: any;
  PositionStandardId?: any;
  ExternalSystemId?: any;
  ProfileId?: number;
  LanguageId?: any;
  UseRateScheduleFlag: boolean;
  TimeCardFormatId?: number;
  PayrollExternalId?: any;
  RequestsPerPage: number;
  SelfRegistrationProfileFlag: boolean;
  MarkupFlag: boolean;
  MobileRequestFutureDays: number;
  MobileRequestHistoryDays: number;
  MobileRequestsPerPage: number;
  CoiExpirationDate?: any;
  CountryId: number;
  StateId: number;
  AccountId?: any;
  DateFormatId?: any;
  MobileDateFormatId?: any;
  WoApprovalLevelId?: any;
  PoApprovalLevelId?: any;
  ProjectApprovalLevelId?: any;
  PrApprovalId?: any;
  PrimaryTimeCardApproverId?: any;
  PrBuyerFlag: boolean;
  ProfileFlag: boolean;
  PasswordNeverExpiresFlag: boolean;
  SsoRequiredFlag: boolean;
  AlsIncorrectLoginCount: number;
  AlsForcePasswordChangeFlag: boolean;
  AlsNeverInactivateFlag: boolean;
  AlsLoginExpirationDate?: any;
  AlsLoginStatus: number;
  CompanyExternalId: string;
  ProfileExternalId: string;
  UpdatedByExternalId: string;
  Name: string;
  LockAssignedWorkOrdersFlag: boolean;
  IsAllocatingIndividual: boolean;
  LaborEntryIds: any[];
  LaborEntryComment?: any;
}

export interface RequestType {
  DefaultOpenStatusExternalId?: any;
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
  DefaultOpenStatusId?: any;
  MaintenanceFlag: boolean;
  AllowParentChildFlag: boolean;
  StandingWoTypeFlag: boolean;
  PsArInvoiceFlag: boolean;
  SignatureReqWoCompleteFlag: boolean;
  AccountStringRequiredCreateFlag: boolean;
  AccountStringRequiredCloseFlag: boolean;
  KeyWoTypeFlag: boolean;
  [prop: string]: any;
}

export interface RequestPriority {
  Active: boolean;
  DefaultSlaCompletionTime: number;
  DefaultSlaResponseTime: number;
  ExternalId?: any;
  Id: number;
  Name: string;
  OverrideSlaServiceHours: boolean;
  PushWorkOrdersToExternalSystem: boolean;
  ResponseLimit: number;
  RequestPriorityListId?: any;
  ScheduledWorkOrdersOnly: boolean;
  TabOrder: number;
  UpdateDate: Date;
  UpdatedByExternalId?: any;
  UpdatedById: number;
  Level?: any;
  EmergencyEscalation: boolean;
}

export interface RequestSubType {
  Id: number;
  Description: string;
  RequestTypeId: number;
  DefaultBillableFlag: boolean;
  BillCodeId?: any;
  ActiveFlag: boolean;
  UpdatedById: number;
  UpdateDate: Date;
  TabOrder: number;
  ProcedureId?: any;
  GlAccountNumber?: any;
  DefaultLaborActivityId?: number;
  ServiceTypeId?: any;
  GlAccountContraLabor?: any;
  GlAccountNumberLabor?: any;
  ExternalId: string;
  MarkupFlag: boolean;
  SpendCategory?: any;
  CommodityCode?: any;
  WoPrintId?: any;
  CostCodeGroupId?: any;
  ChargeToSetting: number;
  NotifyRequestorOption: number;
  HierarchyId: number;
  RequestTypeExternalId?: any;
  ProcedureExternalId?: any;
  DefaultLaborActivityExternalId?: any;
  UpdatedByExternalId?: any;
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
  PreviousAssignedId?: any;
  AssignedId: number;
  CloseByDate?: Date;
  UpdateDate: Date;
  ServiceEscalationFlag: boolean;
  InitialCommentFlag: boolean;
  EstimatedTotalAmount: number;
  PreviousAssignedCrewId?: any;
  AssignedCrewId?: any;
  AssignedCrewDescription: string;
  CommentLength: number;
  ApplicationId?: any;
  UpdateDatePropertyTime: Date;
  ExternalCreatorId: string;
  ExternalRequestId: string;
  ExternalPreviousAssignedId?: any;
  ExternalAssignedId: string;
  ExternalPreviousAssignedCrewId?: any;
  ExternalAssignedCrewId?: any;
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
  DateScheduled?: any;
  TimeScheduled?: any;
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
  ReassignReasonId?: any;
  CompletionReasonId?: any;
  RequestedCompletionDate?: any;
  SlaResponsePastDue: boolean;
  SlaCompeletionPastDue: boolean;
  SpaceId: number;
  SubSpaceId?: any;
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
  BillCodeId?: any;
  CostCodeId?: any;
  NotToExceedAmount: number;
  NotToExceedComment?: any;
  EstimatedLaborHours: number;
  ExternalCostCenter: string;
  ExternalCostCenterId?: any;
  ExternalCostCenterDescription?: any;
  EstimatedTotalAmount: number;
  TotalLaborHours: number;
  DefaultAccountId?: any;
  DefaultCoaAccountId?: any;
  DefaultCoaCreditAccountId?: any;
  TotalTax: number;
  ServiceProviderRefNumber?: any;
  ServiceProviderToInvoiceFlag?: any;
  ChargeTypeId?: any;
  AssetNumber: string;
  AssetId?: number;
  FailureCodeId?: number;
  RequireAssetFlag?: any;
  InspectionId?: any;
  InspectionDetailId?: any;
  RecurrenceId?: number;
  ProcedureId?: number;
  ProcedureNameHistory?: any;
  AttachedFileName?: any;
  ProcedureBodyHistory?: any;
  ProvisionId?: any;
  ProvisionDetailId?: any;
  IncidentId?: any;
  ReservationId?: any;
  ParentWOId?: number;
  TopLevelFlag: boolean;
  EscalateToId?: any;
  ServiceEscalationFlag: boolean;
  ApprovedByName?: any;
  ApprovedDate?: any;
  RequestApprovalflag: boolean;
  AuthentryFlag: boolean;
  AuthentryRemarks?: any;
  CustomerPoNumber?: any;
  InvoiceDate?: any;
  ProjectId?: any;
  ExternalCompanyDescription?: any;
  CompanyDocumentId?: any;
  VendorCompanyId?: any;
  VendorUserFlag: boolean;
  VendorInvoiceCompany?: any;
  VendorInvoiceAddress?: any;
  VendorInvoicePhone?: any;
  VendorInvoiceFax?: any;
  DepartmentId?: number;
  KbaseFlag: boolean;
  ContractNumber?: any;
  DispatchDate?: any;
  ResolutionCodeId?: any;
  OriginationCodeId?: number;
  ExportFlag: boolean;
  ExportDate?: any;
  CloseByDateChangeCount: number;
  CorrectiveRequestFlag: boolean;
  ExternalSystemId?: any;
  DispatchExternalAckDate?: any;
  CloseExternalAckDate?: any;
  InvoiceNumber?: any;
  AltPhone?: any;
  RoomTypeId?: any;
  Signature?: any;
  SignatureText?: any;
  SignatureDate?: any;
  BudgetYear?: number;
  BudgetFlag: boolean;
  RunTimeValue?: any;
  RunTimeTypeId?: any;
  BeenOnHoldFlag: boolean;
  AuthorizerName?: any;
  AuthorizerPhone?: any;
  EstimatedArrivalDate?: any;
  ActualArrivalDate?: any;
  ArBatchId?: any;
  RequestWaiverComments?: any;
  RequestWaiverId?: any;
  ExtInvAmount?: any;
  ExternalPOLineNumber: string;
  TrackingCodeId?: any;
  PsArInvoiceFlag: boolean;
  IsOpenRequest?: any;
  IsClosedRequest?: any;
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
  SubSpaceExternalId?: any;
  RequestPriorityExternalId?: any;
  CreatedByExternalId: string;
  ClosedByExternalId: string;
  AssignedToExternalId: string;
  StatusExternalId: string;
  InspectionExternalId?: any;
  AssetExternalId: string;
  ProcedureExternalId: string;
  EscalateToExternalId?: any;
  IncidentExternalId?: any;
  ParentWOExternalId: string;
  InspectionDetailExternalId?: any;
  VendorCompanyExternalId?: any;
  RequestorExternalId: string;
  CrewExternalId: string;
  GeneralComments?: any;
  InternalComments?: any;
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

export interface WorkOrderCreate {
  StatementOfWork: string;
  SpaceId: number;
  SubSpaceId?: number;
  AssetId?: number;
  RequestPriorityId: number;
  RequestTypeId: number;
  RequestSubTypeId: number;
  RequestorId: number;
  AssignedToId: number;
  ProcedureId: number;
  CrewId: number;
  DepartmentId: number;
  RequestorFirstName: string;
  RequestorLastName: string;
  RequestorEmail: string;
  RequestorPhone: string;
  CompleteByDate: Date;
  ExternalId: string;
  Crew: Crew;
  ParentWOId: number;
  AccountInfo: AccountInfo;
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

export interface PropertyRegionAssociation {
  Id: number;
  PropertyId: number;
  RegionId: number;
  UpdateDate: Date;
  PropertyExternalId: string;
  RegionExternalId: string;
}

export interface GeoLocation {
  Id?: number;
  RequestId?: number;
  RequestExternalId?: string;
  AssetId?: number;
  AssetExternalId?: number;
  AssetNumber?: string;
  RegionId?: number;
  RegionExternalId?: string;
  PropertyId?: number;
  PropertyExternalId?: string;
  EmployeeId?: number;
  EmployeeExternalId?: string;
  Latitude?: number;
  Longitude?: number;
  Altitude?: number;
  UpdatedByName?: string;
  UpdateDate?: Date;
  GeographicLocation?: GeographicLocation;
}

export interface GeographicLocation {
  Geography?: Geography;
}

export interface Geography {
  CoordinateSystemId?: number;
  WellKnownText?: string;
  WellKnownBinary?: boolean;
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
