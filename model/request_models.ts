import {
  Account,
  AccountInfo,
  Asset,
  BillCode,
  ChargeType,
  FamisAttachment,
  OtherCostType,
  Udf,
  WorkOrderComment
} from './famis_models';

export interface FamisOAuthCredential {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user_id: string;
  first_name: string;
  last_name: string;
  installation_id: string;
  installation_name: string;
  '.expires': string;
  '.issued': string;
}

export interface LoginResponse {
  Item: FamisOAuthCredential;
  Result: boolean;
  Context: number;
  Message: string;
}

//Region Asset
export interface AssetCreateRequest {
  Name?: string;
  Description?: string;
  AssetNumber?: string;
  SerialNumber?: string;
  AssetClassId?: number;
  AssetRankId?: number;
  MakeId?: number;
  ModelId?: number;
  InServiceDate?: Date;
  PurchasedFromVendor?: string;
  AssetStatusId?: number;
  StatusComment?: string;
  BarcodeNumber?: string;
  FinancialSystemId?: number;
  AssetSafetyComments?: string;
  AssetKeywordId?: number;
  ExternalId?: string;
  ExternalSystemId?: number;
  AssetTypeId?: number;
  SpaceId?: number;
  EmployeeId?: number;
  Room?: string;
  QuantityAvailable?: number;
  Comments?: string;
  ActiveFlag?: boolean;
  FloorId?: number;
  AutoAssignedToId?: number;
  WarrantyContractNumber?: string;
  WarrantyEffectiveDate?: Date;
  WarrantyExpirationDate?: Date;
  WarrantyExpirationContact?: string;
  WarrantyExpirationContactPhone?: string;
  WarrantyVendorId?: number;
  WarrantyPoNumberId?: number;
  MaintenanceContractNumber?: string;
  MaintenanceContractVendorId?: number;
  MaintenanceContractExpirationDate?: Date;
  MaintenanceContractNotificationDays?: number;
  PurchaseDate?: Date;
  PurchaseAmount?: number;
  PurchaseCostCenter?: string;
  PoNumber?: string;
  EstimatedLifeInYears?: number;
  EstimatedLifeInHours?: number;
  AnnualRuntimeInHours?: number;
  CapitalRepairCost?: number;
  EstimatedReplacementCost?: number;
  LifeExpectancy?: Date;
  FcaRankId?: number;
}

export interface AssetUpdateRequest {
  Name?: string;
  Description?: string;
  AssetNumber?: string;
  SerialNumber?: string;
  AssetClassId?: number;
  AssetRankId?: number;
  EcriCodeId?: number;
  MakeId?: number;
  ModelId?: number;
  InServiceDate?: Date;
  PurchasedFromVendor?: string;
  AssetStatusId?: number;
  StatusComment?: string;
  BarcodeNumber?: string;
  FinancialSystemId?: number;
  AssetSafetyComments?: string;
  AssetKeywordId?: number;
  ExternalId?: string;
  AssetTypeId?: number;
  RiskAssessment?: string;
  ExternalSystemId?: number;
  SpaceId?: number;
  EmployeeId?: number;
  Room?: string;
  QuantityAvailable?: number;
  Comments?: string;
  ActiveFlag?: boolean;
  FloorId?: number;
  AutoAssignedToId?: number;
  WarrantyContractNumber?: string;
  WarrantyEffectiveDate?: Date;
  WarrantyExpirationDate?: Date;
  WarrantyExpirationContact?: string;
  WarrantyExpirationContactPhone?: string;
  WarrantyVendorId?: number;
  WarrantyPoNumberId?: number;
  MaintenanceContractNumber?: string;
  MaintenanceContractVendorId?: number;
  MaintenanceContractExpirationDate?: Date;
  MaintenanceContractNotificationDays?: number;
  PurchaseDate?: Date;
  PurchaseAmount?: number;
  ExternalCostCenterId?: number;
  PurchaseCostCenter?: string;
  PoNumber?: string;
  EstimatedLifeInYears?: number;
  EstimatedLifeInHours?: number;
  AnnualRuntimeInHours?: number;
  CapitalRepairCost?: number;
  EstimatedReplacementCost?: number;
  LifeExpectancy?: string;
  UomId?: number;
  LastCalibrationDate?: Date;
  FcaRankId?: number;
}

//End Region Asset

export interface CreateCompanyRequest {
  Name: string;
  Addr1: string;
  City: string;
  Zip: string;
  StateId: number;
  CountryId: number;
  TypeId: number;
  Phone: string;
  ActiveFlag: boolean;
  ExternalId?: string;
  TimeCardFlag: boolean;
  VendorFlag: boolean;
  MinorityFlag: boolean;
  WomanOwnedFlag: boolean;
  PreferredVendorFlag: boolean;
  SupplierFlag: boolean;
  SubcontractorAuthFlag: boolean;
  W9OnFileFlag: boolean;
  CurrencyInstallId: number;
  Email?: string;
  PagerNumber?: string;
  PrimaryContactName?: string;
  CategoryId?: number;
  SecondaryCategoryId?: number;
  SicCode?: string;
  InternalVendorCode?: string;
  TaxpayerId?: string;
  ContractTypeId?: number;
  ContractComments?: string;
  MobilePhone?: string;
  InternalVendorCode2?: string;
  RiskRating?: string;
  TypeOfAccessId?: number;
  PaymentTermId?: number;
  ShippingMethodId?: number;
  FreeOnBoardId?: number;
  Addr3?: string;
  RemAddr1?: string;
  RemAddr2?: string;
  RemAddr3?: string;
  RemCity?: string;
  RemZip?: string;
  RemStateId?: number;
  Description?: string;
}

export interface PatchCompanyRequest {
  Id: number;
  Name: string;
  Addr1: string;
  City?: string;
  Zip: string;
  StateId: number;
  State?: string;
  CountryId?: number;
  Country?: string;
  TypeId: number;
  Phone: string;
  ActiveFlag?: boolean;
  ExternalId?: string;
  TimeCardFlag?: boolean;
  VendorFlag?: boolean;
  MinorityFlag?: boolean;
  WomanOwnedFlag?: boolean;
  PreferredVendorFlag?: boolean;
  SupplierFlag?: boolean;
  SubcontractorAuthFlag?: boolean;
  W9OnFileFlag?: boolean;
  CurrencyInstallId?: number;
  Addr2?: string;
  Fax?: string;
  Website?: string;
  EmergencyPhone?: string;
  Email?: string;
  PagerNumber?: string;
  PrimaryContactName?: string;
  CategoryId?: number;
  SecondaryCategoryId?: number;
  SicCode?: string;
  InternalVendorCode?: string;
  TaxpayerId?: string;
  ContractTypeId?: number;
  ContractComments?: string;
  MobilePhone?: string;
  InternalVendorCode2?: string;
  RiskRating?: string;
  TypeOfAccessId?: number;
  PaymentTermId?: number;
  ShippingMethodId?: number;
  FreeOnBoardId?: number;
  Addr3?: string;
  RemAddr1?: string;
  RemAddr2?: string;
  RemAddr3?: string;
  RemCity?: string;
  RemZip?: string;
  RemStateId?: number;
  Description?: string;
}

export interface PatchSpaceAreaRequest {
  Id?: number;
  SpaceId?: number;
  TotalArea1SqFt?: number;
  TotalArea2SqFt?: number;
  TotalArea1SqM?: number;
  TotalArea2SqM?: number;
  OtherArea1SqFt?: number;
  OtherArea2SqFt?: number;
  OtherArea3SqFt?: number;
  OtherArea4SqFt?: number;
  OtherArea5SqFt?: number;
  OtherArea1SqM?: number;
  OtherArea2SqM?: number;
  OtherArea3SqM?: number;
  OtherArea4SqM?: number;
  OtherArea5SqM?: number;
  IncludeEG?: number;
  IncludeIG?: number;
  IncludeRPC?: number;
  IncludeBR?: number;
  IncludeUA?: number;
  IncludeIPA?: number;
  IncludeAA?: number;
  IncludeNAA?: number;
  IncludeNMP?: number;
  Force100?: boolean;
}

export interface PatchWorkOrderRequest {
  RequestTypeId?: number;
  RequestSubTypeId?: number;
  RequestPriorityId?: number;
  StatusId?: number;
  LastStatusEnum?: string;
  StatementOfWork?: string;
  ExternalId?: string;
  ExternalId2?: string;
  AssignedDate?: Date;
  ClosedDate?: Date;
  ClosedById?: number;
  CompleteByDate?: Date;
  UpdateDate?: Date;
  DateScheduled?: Date;
  TimeScheduled?: Date;
  ActualCompletionDate?: Date;
  SlaEstimatedResponseDate?: Date;
  SlaActualResponseDate?: Date;
  SlaEstimatedCompletionDate?: Date;
  SlaActualCompletionDate?: Date;
  SlaOverdueAlertFlag?: boolean;
  PropertyHoursInDay?: number;
  ActualCompletionTime?: number;
  ActualResponseTime?: number;
  ExcludeSlaReportingFlag?: boolean;
  ResponseExcludedFlag?: boolean;
  CompletionExcludedFlag?: boolean;
  ReassignReasonId?: number;
  CompletionReasonId?: number;
  RequestedCompletionDate?: Date;
  SlaResponsePastDue?: boolean;
  SlaCompeletionPastDue?: boolean;
  SpaceId?: number;
  SubSpaceId?: number;
  RoomCube?: string;
  NotifyAssignedToMethod?: number;
  CloseNotificationFlag?: boolean;
  NotifyAssignedToFlag?: boolean;
  ReNotifyAssignedToFlag?: boolean;
  NotifyFollowUpAlert?: number;
  InitialNotificationFlag?: boolean;
  FollowUpNotificationFlag?: boolean;
  NotifyDate?: Date;
  EmailCC?: string;
  NotifyRequestorAutoSentFlag?: boolean;
  NotifySlaReminderSentFlag?: boolean;
  AssignedToId?: number;
  CrewId?: number;
  BillableFlag?: boolean;
  BillingStatusFlag?: boolean;
  TotalLaborCost?: number;
  TotalMaterialCost?: number;
  TotalOtherCost?: number;
  TotalMarkup?: number;
  BillCodeId?: number;
  CostCodeId?: number;
  NotToExceedAmount?: number;
  NotToExceedComment?: string;
  EstimatedLaborHours?: number;
  ExternalCostCenter?: string;
  ExternalCostCenterId?: string;
  ExternalCostCenterDescription?: string;
  EstimatedTotalAmount?: number;
  TotalLaborHours?: number;
  DefaultAccountId?: number;
  DefaultCoaAccountId?: number;
  DefaultCoaCreditAccountId?: number;
  TotalTax?: number;
  ServiceProviderRefNumber?: string;
  ServiceProviderToInvoiceFlag?: boolean;
  ChargeTypeId?: number;
  AssetNumber?: string;
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
  TopLevelFlag?: boolean;
  EscalateToId?: number;
  ServiceEscalationFlag?: boolean;
  ApprovedByName?: string;
  ApprovedDate?: Date;
  RequestApprovalflag?: boolean;
  AuthentryFlag?: boolean;
  AuthentryRemarks?: string;
  CustomerPoNumber?: string;
  InvoiceDate?: Date;
  ProjectId?: number;
  ExternalCompanyDescription?: string;
  CompanyDocumentId?: number;
  VendorCompanyId?: number;
  VendorUserFlag?: boolean;
  VendorInvoiceCompany?: string;
  VendorInvoiceAddress?: string;
  VendorInvoicePhone?: string;
  VendorInvoiceFax?: string;
  DepartmentId?: number;
  KbaseFlag?: boolean;
  ContractNumber?: string;
  DispatchDate?: Date;
  ResolutionCodeId?: number;
  OriginationCodeId?: number;
  ExportFlag?: boolean;
  ExportDate?: Date;
  CloseByDateChangeCount?: number;
  CorrectiveRequestFlag?: boolean;
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
  BudgetFlag?: boolean;
  RunTimeValue?: string;
  RunTimeTypeId?: number;
  BeenOnHoldFlag?: boolean;
  AuthorizerName?: string;
  AuthorizerPhone?: string;
  EstimatedArrivalDate?: Date;
  ActualArrivalDate?: Date;
  ArBatchId?: number;
  RequestWaiverComments?: string;
  RequestWaiverId?: number;
  ExtInvAmount?: number;
  ExternalPOLineNumber?: string;
  TrackingCodeId?: any;
  PsArInvoiceFlag?: boolean;
  IsOpenRequest?: boolean;
  IsClosedRequest?: boolean;
  PmIntegrated?: boolean;
  UserGroupId?: number;
  WorkTypeId?: number;
  PropertyId?: number;
  CompleteByDatePropertyTime?: Date;
  SlaEstimatedResponseDatePropertyTime?: Date;
  SlaEstimatedCompletionDatePropertyTime?: Date;
  PropertyExternalId?: string;
  RequestTypeExternalId?: string;
  RequestSubTypeExternalId?: string;
  SpaceExternalId?: string;
  SubSpaceExternalId?: string;
  RequestPriorityExternalId?: string;
  CreatedByExternalId?: string;
  ClosedByExternalId?: string;
  AssignedToExternalId?: string;
  StatusExternalId?: string;
  InspectionExternalId?: string;
  AssetExternalId?: string;
  ProcedureExternalId?: string;
  EscalateToExternalId?: string;
  IncidentExternalId?: string;
  ParentWOExternalId?: string;
  InspectionDetailExternalId?: string;
  VendorCompanyExternalId?: string;
  RequestorExternalId?: string;
  CrewExternalId?: string;
  GeneralComments?: string;
  InternalComments?: string;
  NotifyRequestorFlag?: boolean;
  AppendToStatementOfWorkFlag?: boolean;
  Attachments?: FamisAttachment[];
  Udfs?: Udf[];
}

export interface PostWorkOrderRequest {
  RequestTypeId: number;
  RequestSubTypeId: number;
  RequestPriorityId?: number;
  StatusId?: number;
  LastStatusEnum?: string;
  StatementOfWork?: string;
  ExternalId?: string;
  ExternalId2?: string;
  AssignedDate?: Date;
  ClosedDate?: Date;
  ClosedById?: number;
  CreateDate?: Date;
  CreatedById?: number;
  CompleteByDate?: Date;
  UpdateDate?: Date;
  DateScheduled?: Date;
  TimeScheduled?: string;
  ActualCompletionDate?: Date;
  SlaEstimatedResponseDate?: Date;
  SlaActualResponseDate?: Date;
  SlaEstimatedCompletionDate?: Date;
  SlaActualCompletionDate?: Date;
  SlaOverdueAlertFlag?: boolean;
  PropertyHoursInDay?: number;
  ActualCompletionTime?: number;
  ActualResponseTime?: number;
  ExcludeSlaReportingFlag?: boolean;
  ResponseExcludedFlag?: boolean;
  CompletionExcludedFlag?: boolean;
  ReassignReasonId?: number;
  CompletionReasonId?: number;
  RequestedCompletionDate?: Date;
  SlaResponsePastDue?: boolean;
  SlaCompeletionPastDue?: boolean;
  SpaceId?: number;
  SubSpaceId?: number;
  NotifyAssignedToMethod?: number;
  CloseNotificationFlag?: boolean;
  NotifyAssignedToFlag?: boolean;
  ReNotifyAssignedToFlag?: boolean;
  NotifyFollowUpAlert?: number;
  InitialNotificationFlag?: boolean;
  FollowUpNotificationFlag?: boolean;
  NotifyDate?: Date;
  EmailCC?: string;
  NotifyRequestorAutoSentFlag?: boolean;
  NotifySlaReminderSentFlag?: boolean;
  AssignedToId?: number;
  CrewId?: number;
  RequestorLastName?: string;
  RequestorFirstName?: string;
  RequestorName?: string;
  RequestorPhone?: string;
  RequestorEmail?: string;
  RequestorFax?: string;
  RequestorCompanyName?: string;
  RequestorId?: number;
  CreatedByFirstName?: string;
  CreatedByLastName?: string;
  CreatedByPhone?: string;
  CreatedByEmail?: string;
  BillableFlag?: string;
  BillingStatusFlag?: boolean;
  TotalLaborCost?: number;
  TotalMaterialCost?: number;
  TotalOtherCost?: number;
  TotalMarkup?: number;
  BillCodeId?: number;
  CostCodeId?: number;
  NotToExceedAmount?: number;
  NotToExceedComment?: string;
  EstimatedLaborHours?: number;
  ExternalCostCenterId?: number;
  ExternalCostCenterDescription?: string;
  EstimatedTotalAmount?: number;
  TotalLaborHours?: number;
  DefaultAccountId?: number;
  DefaultCoaAccountId?: number;
  DefaultCoaCreditAccountId?: number;
  TotalTax?: number;
  ServiceProviderRefNumber?: string;
  ServiceProviderToInvoiceFlag?: string;
  ChargeTypeId?: number;
  AssetNumber?: string;
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
  TopLevelFlag?: boolean;
  EscalateToId?: number;
  ServiceEscalationFlag?: boolean;
  ApprovedByName?: string;
  ApprovedDate?: Date;
  RequestApprovalflag?: boolean;
  AuthentryFlag?: boolean;
  AuthentryRemarks?: string;
  CustomerPoNumber?: string;
  InvoiceDate?: Date;
  ProjectId?: number;
  ExternalCompanyDescription?: string;
  CompanyDocumentId?: number;
  VendorCompanyId?: number;
  VendorUserFlag?: boolean;
  VendorInvoiceCompany?: string;
  VendorInvoiceAddress?: string;
  VendorInvoicePhone?: string;
  VendorInvoiceFax?: string;
  DepartmentId?: number;
  KbaseFlag?: boolean;
  ContractNumber?: string;
  DispatchDate?: Date;
  ResolutionCodeId?: number;
  OriginationCodeId?: number;
  ExportFlag?: boolean;
  ExportDate?: Date;
  CloseByDateChangeCount?: number;
  CorrectiveRequestFlag?: boolean;
  ExternalSystemId?: number;
  DispatchExternalAckDate?: Date;
  CloseExternalAckDate?: Date;
  InvoiceNumber?: string;
  AltPhone?: string;
  RoomTypeId?: number;
  Signature?: string;
  SignatureText?: string;
  SignatureDate?: Date;
  BudgetYear?: number;
  BudgetFlag?: boolean;
  RunTimeValue?: number;
  RunTimeTypeId?: number;
  BeenOnHoldFlag?: boolean;
  AuthorizerName?: string;
  AuthorizerPhone?: string;
  EstimatedArrivalDate?: Date;
  ActualArrivalDate?: Date;
  ArBatchId?: string;
  RequestWaiverComments?: string;
  RequestWaiverId?: number;
  ExtInvAmount?: number;
  ExternalPOLineNumber?: string;
  TrackingCodeId?: number;
  PsArInvoiceFlag?: boolean;
  IsOpenRequest?: boolean;
  IsClosedRequest?: boolean;
  PmIntegrated?: boolean;
  UserGroupId?: number;
  WorkTypeId?: number;
  CreateByDatePropertyTime?: Date;
  CompleteByDatePropertyTime?: Date;
  SlaEstimatedResponseDatePropertyTime?: Date;
  SlaEstimatedCompletionDatePropertyTime?: Date;
  PropertyExternalId?: string;
  RequestTypeExternalId?: string;
  RequestSubTypeExternalId?: string;
  SpaceExternalId?: string;
  SubSpaceExternalId?: string;
  RequestPriorityExternalId?: string;
  CreatedByExternalId?: string;
  ClosedByExternalId?: string;
  AssignedToExternalId?: string;
  StatusExternalId?: string;
  InspectionExternalId?: string;
  AssetExternalId?: string;
  ProcedureExternalId?: string;
  EscalateToExternalId?: string;
  IncidentExternalId?: string;
  ParentWOExternalId?: string;
  InspectionDetailExternalId?: string;
  VendorCompanyExternalId?: string;
  RequestorExternalId?: string;
  CrewExternalId?: string;
  InternalComments?: string;
  NotifyRequestorFlag?: boolean;
  AppendToStatementOfWorkFlag?: boolean;
  Asset?: Asset;
  WorkOrderComment?: WorkOrderComment;
  AccountInfo?: AccountInfo;
  BillCode?: BillCode;
  ChargeType?: ChargeType;
  RoomCube?: string;
}

export interface PostAttachmentRequest {
  RequestId?: number;
  AssetId?: number;
  InspectionId?: number;
  Name: string;
  Description?: string;
  FileName?: string;
  UpdateDate?: Date;
  UpdatedById?: number;
  UpdatedByExternalId?: string;
  AttachmentTypeId?: number;
  RequestExternalId?: string;
  Contents: string;
  IsSignature?: boolean;
}

export interface PostUdfForWoRequest {
  FieldName: string;
  Value: string;
}

export interface SearchUsersRequest {
  activityGroupId?: number;
  requestTypeId?: number;
  propertyId?: number;
}

export interface PatchUserRequest {
  Id: number;
  CompanyId?: number;
  FirstName?: string;
  LastName?: string;
  Title?: string;
  TypeId?: number;
  Addr1?: string;
  Addr2?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Country?: string;
  BusPhone?: string;
  MobPhone?: string;
  Fax?: string;
  Email?: string;
  MobEmail?: string;
  HomePhone?: string;
  AsstPhone?: string;
  UserName?: string;
  Password?: any;
  ActiveFlag?: boolean;
  UpdateDate?: Date;
  RequestHistoryDays?: number;
  RegHourlyRate?: number;
  ExternalId?: string;
  UpdatedById?: number;
  WoAuthFlag?: boolean;
  WoAuthComments?: string;
  OtHourlyRate?: number;
  DotHourlyRate?: number;
  IntRegHourlyRate?: number;
  IntOtHourlyRate?: number;
  IntDotHourlyRate?: number;
  VisitorEmailFlag?: boolean;
  EmailWoConfirmationFlag?: boolean;
  TimeCardFlag?: boolean;
  DefOriginationCodeId?: number;
  RequestFutureDays?: number;
  CubeNumber?: string;
  RestrictedFullUserFlag?: boolean;
  WorkStatusFlag?: boolean;
  DefaultPage?: string;
  DepartmentDescription?: string;
  DepartmentId?: number;
  PositionDescription?: string;
  PositionId?: any;
  PositionStandardId?: number;
  ExternalSystemId?: string;
  ProfileId?: number;
  LanguageId?: number;
  UseRateScheduleFlag?: boolean;
  TimeCardFormatId?: number;
  PayrollExternalId?: string;
  RequestsPerPage?: number;
  SelfRegistrationProfileFlag?: boolean;
  MarkupFlag?: boolean;
  MobileRequestFutureDays?: number;
  MobileRequestHistoryDays?: number;
  MobileRequestsPerPage?: number;
  CoiExpirationDate?: Date;
  CountryId?: number;
  StateId?: number;
  AccountId?: number;
  DateFormatId?: number;
  MobileDateFormatId?: number;
  WoApprovalLevelId?: number;
  PoApprovalLevelId?: number;
  ProjectApprovalLevelId?: number;
  PrApprovalId?: number;
  PrimaryTimeCardApproverId?: number;
  PrBuyerFlag?: boolean;
  ProfileFlag?: boolean;
  PasswordNeverExpiresFlag?: boolean;
  SsoRequiredFlag?: boolean;
  AlsIncorrectLoginCount?: number;
  AlsForcePasswordChangeFlag?: boolean;
  AlsNeverInactivateFlag?: boolean;
  AlsLoginExpirationDate?: Date;
  AlsLoginStatus?: number;
  CompanyExternalId?: string;
  ProfileExternalId?: string;
  UpdatedByExternalId?: string;
  Name?: string;
  LockAssignedWorkOrdersFlag?: boolean;
  IsAllocatingIndividual?: boolean;
  LaborEntryIds?: number[];
  LaborEntryComment?: string;
}

export interface PostLaborCostRequest {
  EmployeeId?: number;
  TimeStarted?: string;
  TimeFinished?: string;
  Rate?: number;
  Hours?: number;
  RateTypeId?: number;
  RequestTypeActivityId?: number;
  TaxAmount?: number;
  VendorCompanyExternalId?: string;
  CrewId?: number;
  Id?: number;
  RequestId?: number;
  RequestExternalId?: string;
  Date?: Date;
  Description?: string;
  VendorCompanyId?: number;
  MarkupFlag?: boolean;
  AccountId?: number;
  RecurrenceId?: number;
  TaxableFlag?: boolean;
  ExternalId?: string;
  TaxRate?: number;
  ExternalRecurrenceId?: string;
}

export interface PostLaborEntryRequest {
  TotalHours?: number;
  TimeType?: string;
  ActivityId?: number;
  ActivityExternalId?: string;
  Comments?: string;
  RequestId?: number;
  RequestExternalId?: string;
  UserId?: number;
  UserExternalId?: string;
  EntryDate?: Date;
  CrewId?: number;
  CrewExternalId?: string;
  StartTime?: Date;
  EndTime?: Date;
  PositionId?: number;
  PositionExternalId?: string;
  LaborReasonId?: number;
}

export interface LaborEntryApprovalRequest {
  LaborEntryIds: number[];
  LaborEntryComment?: string;
}

export interface PostOtherCostRequest {
  OtherCostTypeId?: number;
  OtherCostType?: OtherCostType;
  Quantity?: number;
  UnitCost?: number;
  ShippingAndHandlingCost?: number;
  Account?: Account;
  ReceivedById?: number;
  ApInvoiceNumber?: string;
  ApAccountNumber?: string;
  LienWaiverAmount?: number;
  LienWaiverComments?: string;
  PaymentComments?: string;
  ApInvoiceAmount?: number;
  ApPostDate?: Date;
  ApDueDate?: Date;
  ApTaxAmount?: number;
  ApShippingHandlingAmount?: number;
  ApInvoiceStatusId?: number;
  ApInvoiceDate?: Date;
  CoaAccountId?: number;
  Payee?: string;
  TaxAmount?: number;
  BudgetYear?: number;
  VendorCode?: string;
  VendorCompanyExternalId?: string;
  RequestId?: number;
  RequestExternalId?: string;
  Date?: Date;
  Description?: string;
  VendorCompanyId?: number;
  MarkupFlag?: boolean;
  AccountId?: number;
  TaxableFlag?: boolean;
  ExternalId?: string;
  TaxRate?: number;
}

export interface PostMaterialCostRequest {
  Id?: number;
  RequestId?: number;
  ItemName?: string;
  Description?: string;
  ChargeToAccountNumber?: string;
  ChargeToAccount?: string;
  Quantity?: number;
  UnitCost?: number;
  TaxCost?: number;
  SHCost?: number;
  TotalCost?: number;
  Date?: Date;
  LineNumber?: number;
  EmployeeId?: number;
  Markup?: boolean;
  UpdateDate?: Date;
  TotalMarkup?: number;
  ItemId?: number;
  AccountId?: number;
  TaxRate?: number;
  MarkupPercentage?: number;
  WarehouseMaterialId?: number;
  BudgetYear?: number;
  Taxable?: boolean;
  BinId?: number;
  PoDetailId?: number;
  UpdatedByExternalId?: string;
}

//Region Inspection

export interface InspectionTransactionRequest {
  Inspection: InspectionRequest;
  InspectionDetails?: InspectionDetailRequest[];
}

export interface InspectionRequest {
  InspectionClassId?: number;
  InspectionTypeId?: number;
  PropertyId?: number;
  SpaceId?: number;
  SubspaceId?: null;
  FloorId?: number;
  InspectorId?: number;
  InspectionDate?: Date;
  Occupant?: string;
  Room?: string;
  AssetId?: number;
  WorkOrderId?: number;
  Comments?: string;
}

export interface InspectionDetailRequest {
  AssetReading?: number;
  Comment?: string;
  ConditionId?: number;
  ItemId?: number;
  ScoringItemId?: number;
}

export interface CreateInspectionAttachment {
  InspectionId: string;
  FileName: string;
  TypeId: number;
  Contents: any;
  Name: string;
  Description: string;
}

//End Region Inspection

// Region Geo Location
export interface GeoLocationRequest {
  RequestId: number;
  AssetId: number;
  RegionId: number;
  PropertyId: number;
  EmployeeId: number;
  Latitude: number;
  Longitude: number;
  Altitude: number;
}

//End Geo Location

//Region Shopping Cart
export interface ShoppingCartCreateRequest {
  Description: string;
  RequestId?: number;
}

export interface ShoppingCartItemCreateRequest {
  ShoppingCartId: number;
  MaterialId: number;
  WarehouseId?: number;
  QuantityRequested: number;
  MaterialExternalId?: string;
  WarehouseExternalId?: string;
}

export interface ShoppingCartUpdateRequest {
  Description?: string;
  RequestId?: number;
  StatusId?: number;
}

export interface CheckOutShoppingCartRequest {
  DeliveryDescription?: String;
  RequestedDeliveryDate?: Date;
}

//End Region Shopping Cart

//Region Purchase Requisition
export interface PurchaseRequisitionCreateRequest {
  RequestorName?: string;
  RequestorEmail?: string;
  RequestorPhone?: string;
  Description?: string;
  TypeId?: number;
  CreateDate?: Date;
  PropertyId?: number;
  ShipToAddress?: string;
  RequestId?: number;
  NTE?: number;
  AttentionTo?: string;
}

export interface PurchaseRequisitionUpdateRequest {
  RequestorName?: string;
  RequestorEmail?: string;
  RequestorPhone?: string;
  Description?: string;
  TypeId?: number;
  StatusId?: number;
  PropertyId?: number;
  ShipToAddress?: string;
  RequestId?: number;
  NTE?: number;
  AttentionTo?: string;
}

export interface PurchaseRequisitionLineCreateRequest {
  PRId: number;
  RequiredDate?: string;
  RequestId?: number;
  RequestExternalId?: string;
  Material?: boolean;
  OtherCostType?: boolean;
  OtherCostTypeId?: number;
  VendorId?: number;
  VendorExternalId?: string;
  WarehouseId?: number;
  WarehouseExternalId?: string;
  MaterialItemId?: number;
  MaterialItemExternalId?: string;
  Description?: string;
  UnitOfMeasureId?: number;
  Quantity: number;
  UnitCost: number;
  GLAccountId?: number;
}

//End Region Purchase Requisition

//Region Inventory

export interface QuantityAdjustmentTransactionRequest {
  ItemId?: number;
  WarehouseId?: number;
  BinId?: number;
  AdjustmentTypeId?: number;
  Quantity?: number;
  TransactionComments?: string;
}

export interface PhysicalCountTransactionRequest {
  ItemId?: number;
  WarehouseId?: number;
  BinId?: number;
  Count?: number;
}

export interface PriceAdjustmentTransactionRequest {
  ItemId?: number;
  WarehouseId?: number;
  AdjustmentTypeId?: number;
  UnitCost?: number;
  TransactionComments?: string;
}

//End Region Inventory

//Region Meter
export interface MeterReadingCreateRequest {
  MeterSiteId: number;
  EstimateCodeId?: number;
  EntryMethod?: number;
  RecentReadDate?: Date;
  RecentReading?: number;
  RecentDemandReading?: number;
}

//End Region Meter
