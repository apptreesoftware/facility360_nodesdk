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
  Id?: number;
  SpaceId?: number;
  SubSpaceId?: number;
  AllocIndividualId?: number;
  AllocOrgId?: number;
  OwningOrgId?: number;
  BillingOrgId?: number;
  OwnershipStatusId?: number;
  FunctionalStatusId?: number;
  FunctionalCatId?: number;
  FunctionalSubCatId?: number;
  SpaceCategoryId?: number;
  SpaceSubCategoryId?: number;
  SpaceTypeId?: number;
  SpaceStandardId?: number;
  SpaceStandardApprovalFlag?: boolean;
}

export interface SpaceCategory {
  Id?: number;
  Name?: string;
  Description?: string;
  ActiveFlag?: boolean;
  TabOrder?: number;
  UpdateDate?: Date;
  UpdatedByName?: string;
  ExteriorGrossFlag?: boolean;
  InteriorGrossFlag?: boolean;
  RentablePerContractFlag?: boolean;
  BuildingRentableFlag?: boolean;
  UsableAreaFlag?: boolean;
  InteriorPlanningAreaFlag?: boolean;
  AssignableAreaFlag?: boolean;
  NonAssignableAreaFlag?: boolean;
  NonMeasurablePortfolioFlag?: boolean;
  Number?: string;
  SpaceSubCategories?: SpaceSubCategory[];
}

export interface SpaceSubCategory {
  Id?: number;
  Name?: string;
  Description?: string;
  ActiveFlag?: boolean;
  TabOrder?: number;
  UpdateDate?: Date;
  UpdatedByName?: string;
  CategoryId?: number;
  SpaceStandardDefinitionId?: number;
  Number?: string;
  SpaceTypes?: SpaceType[];
}

export interface SpaceArea {
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

export interface SpaceType {
  Id?: number;
  Name?: string;
  Number?: string;
  Description?: string;
  ActiveFlag?: boolean;
  TabOrder?: number;
  UpdateDate?: Date;
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

export interface AccountSegmentValue {
  Id: number;
  SegmentValue: string;
  Active: boolean;
  SegmentId: number;
  ExternalId?: null;
  SegmentExternalId?: null;
  SegmentValueDescription: string;
  ValidFromDate?: null;
  ValidToDate?: null;
  UserId?: null;
  UserExternalId?: null;
  SpaceFunctionalCategoryId?: null;
}

export interface ChartOfAccount {
  Id: number;
  Name: string;
  ValidFrom: string;
  ValidTo: string;
  MaxSegments: number;
  Active: boolean;
  ExternalId: string;
}

export interface RequestTypeActivity {
  RequestTypeActivityId: number;
  RequestTypeActivityName: string;
  RequestTypeId: number;
  UpdateDate: string;
  UpdatedById: number;
  Active: boolean;
  TabOrder: number;
  ExtraColumn: boolean;
  ChartOfAccountId?: null;
  ChartOfAccountMarkupId?: null;
  TeOnly: boolean;
  Taxable: boolean;
  ChartOfAccountTaxId?: null;
  ChargeTypeCode: string;
  TravelTime: number;
  IncomeCategory: string;
  UnappliedLabor: boolean;
  RequestTypeActivityUpdatedByExternalId?: null;
  RequestTypeActivityExternalId: string;
}

export interface LaborRateType {
  Id: number;
  Name: string;
  Abbreviation: string;
  PaidLaborFlag: boolean;
  RegularRateFlag: boolean;
  OvertimeRateFlag: boolean;
  DoubleTimeRateFlag: boolean;
  Active: boolean;
}

export interface LaborReason {
  Id: number;
  Description: string;
  TabOrder: number;
  Active: boolean;
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
  AttachmentTypeId?: number;
  RequestExternalId?: string;
  Contents?: string;
}

export interface AssetAttachment {
  Id: number;
  AssetClassId: number;
  AssetId: number;
  Name: string;
  Description: string;
  FileName: string;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  TypeId: number;
  Contents: string;
  AssetNumber: string;
  AssetExternalId: string;
}

export interface Warehouse {
  Id: number;
  Name: string;
  Active: boolean;
  TabOrder: number;
  UseMovingCostAverage: boolean;
  StockItemIssueRequiredFlag: boolean;
  ExtractRegionId: string;
  Address1: string;
  Address2: string;
  ContactName: string;
  City: string;
  State: string;
  Zip: string;
  Fax: string;
  Phone: string;
  Comments: string;
  UpdateDate: string;
  UpdateById: number;
  StateId: number;
  VirtualWarehouseFlag: boolean;
  ExternalWarehouseId: string;
  PropertyId: number;
  UseMovingAvg: boolean;
}

export interface MaterialClass {
  Id: number;
  Description: string;
  UpdateDate: string;
  UpdatedById: number;
  Active: boolean;
  TabOrder: number;
  COAAccountId: number;
  COAAccountMarkupId: number;
  TaxableFlag: boolean;
  IncomeCategory: string;
}

export interface MaterialItem {
  Id: number;
  PartNumber: string;
  Description: string;
  Fin: string;
  MaterialClassId: number;
  UnitCost: number;
  ContraAccountNumber: string;
  GlAccountNumber: string;
  Manufacturer: string;
  Model: string;
  LotControlledFlag: boolean;
  LotShelfLifeDays: number;
  ConditionId: number;
  Size: string;
  IgnoreMarkupFlag: boolean;
  Barcode: string;
  Comments: string;
  UnitOfMeasureId: number;
  ExternalId: string;
  ActiveFlag: boolean;
  StockFlag: boolean;
  UpdateDate: string;
  MaterialCode: string;
  MaterialsListId: number;
  QuantityOnHand: number;
  ReorderQuantity: number;
  ReorderPoint: number;
  LastCountDate: string;
  TabOrder: number;
  InventoryFlag: boolean;
  UpdateById: number;
  UpdatedByExternalId: string;
  UPCCode: string;
  OEMPartNumber: string;
  COAAccountId: number;
  LeedCertifiedFlag: boolean;
  DirectPartFlag: boolean;
  MSDSFlag: boolean;
  ExternalSystemId: number;
  ABCClass: string;
  CommodityCodeId: number;
  PropertyId: number;
  PropertyExternalId: string;
  CompanyId: number;
  CompanyExternalId: string;
  UOM: UnitOfMeasure;
  WarehouseMaterials: WarehouseMaterial[];
  ItemLotBins: ItemLotBin[];
  SupplierMaterials: SupplierMaterial[];
}

export interface UnitOfMeasure {
  Id: number;
  Description: string;
  UpdatedById: number;
  UpdatedByIdExternal: string;
  UpdateDate: string;
  ActiveFlag: boolean;
  TabOrder: number;
}

export interface WarehouseMaterial {
  Id: number;
  WarehouseId: number;
  ItemId: number;
  QuantityOnHand: number;
  ReorderPoint: number;
  ReorderQuantity: number;
  DateLastCount: string;
  UpdateDate: string;
  UpdatedById: number;
  Active: boolean;
  MaxQuantityOnHand: number;
  UnitCost: number;
  TaxableFlag: boolean;
  SafetyStockQuantity: number;
  EconomicOrderQuantity: number;
  ServiceLayerFactor: number;
  ReorderQuantityCalcFlag: boolean;
  LeadTimeDays: number;
  MarkupPercent: number;
  QuantityReserved: number;
}

export interface ItemLotBin {
  Id: number;
  ItemId: number;
  LotId?: number;
  BinId: number;
  Quantity: number;
  LastQtyCount: number;
  LastCountedByName: string;
  LastCountedByDate: string;
  Active: boolean;
  UpdateDate: string;
  UpdatedByName: string;
  Comments: string;
  BinDetails: BinDetails;
}

export interface BinDetails {
  Id: number;
  WarehouseId: number;
  Name: string;
  MaxQuantity: number;
  Location1: string;
  Location2: string;
  Location3: string;
  Location4: string;
  Active: boolean;
  UpdateDate: string;
  UpdatedByName: string;
}

export interface SupplierMaterial {
  Id: number;
  ItemId: number;
  CompanyId: number;
  UnitCost: number;
  PartNumber: string;
  PrimarySupplierFlag: boolean;
  UpdateDate: string;
  UpdatedbyId: number;
  Active: boolean;
  UomId: number;
  UomConversion: number;
  Comments: string;
  MinimumReorderQuantity: number;
  LeadTime?: string;
}

export interface AdjustmentType {
  Id: number;
  Name: string;
  Desc: string;
  Type: number;
  TabOrder: number;
  Active: boolean;
  UpdateDate: string;
  UpdatedByName: string;
  InitialFlag: boolean;
  ReduceInventoryFlag: boolean;
}

export interface AdjustmentTransactionResponse {
  Id?: number;
  ItemId?: number;
  AdjustmentTypeId?: number;
  TransactionComments?: string;
  BinId?: number;
  WarehouseId?: number;
  TransactionNumber?: string;
  QuantityOnHand?: number;
  UnitCost?: number;
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

export interface SubSpace {
  Id: number;
  Description: string;
  SpaceId: number;
  SubSpaceExternalId: string;
  DefaultFlag: boolean;
  TabOrder: number;
  UpdatedByName: string;
  UpdateDate: string;
  ActiveFlag: boolean;
  AreaPercentage: number;
  LongDescription: string;
  Telephone: string;
  OccupancyStatusId: number;
  SpaceExternalId: string;
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

export interface Procedure {
  Id: number;
  Name: string;
  ExternalId: string;
  AssetClassId: number;
  PropertyId: number;
  PropertyExternalId: string;
  RegionId: number;
  RegionExternalId: string;
  InspectionClassId: number;
  InspectionTypeId: number;
  Owner: string;
  ActiveFlag: boolean;
  PriorityId: number;
  DefaultRecurrencePattern: string;
  DefaultFrequency: string;
  TypeId: number;
  EstimatedLaborHours: number;
  CreatedByName: string;
  CreateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: null;
  UpdateDate: Date;
  ProcedureText: string;
  ExternalSystemId: string;
}

export interface FailureCode {
  Id: number;
  Name: string;
  Active: boolean;
  FailureCodeEnum: string;
  UpdatedById: number;
  UpdatedByExternalId: string;
  UpdateDate: Date;
}

export interface FcaRank {
  Id: number;
  Active: boolean;
  UpdatedByName: string;
  UpdateDate: string;
  ExternalId: string;
  Name: string;
  TabOrder: number;
}

export interface BillingTypeNPFA {
  Id: number;
  Description: string;
  Default: boolean;
  LaborCode: string;
  LaborMarkup: number;
  MaterialCode: string;
  MaterialMarkup: number;
  OtherCostCode: string;
  UpdatedByName: string;
  UpdateDate: Date;
}

export interface State {
  Id: number;
  Active: boolean;
  UpdatedByName: string;
  UpdateDate: string;
  ExternalId: string;
  Name: string;
  TabOrder: number;
}

// Region Inspection

export interface Inspection {
  Id: number;
  InspectionClassId?: number;
  InspectionClass?: InspectionClass;
  InspectionTypeId?: number;
  InspectionType?: InspectionType;
  PropertyId?: number;
  SpaceId?: number;
  SubspaceId?: number;
  FloorId?: number;
  InspectorId?: number;
  Inspector?: FamisUser;
  InspectionDate?: Date;
  InspectionTime?: string;
  Occupant?: string;
  Room?: string;
  Score?: number;
  AssetId?: number;
  ExternalId?: string;
  WorkOrderId?: number;
  WorkOrderTaskId?: string;
  Comments?: string;
  CreatorId?: number;
  CreateDate?: Date;
  UpdateDate?: Date;
  PropertyExternalId?: string;
  SpaceExternalId?: string;
  SubspaceExternalId?: string;
  FloorExternalId?: string;
  InspectorExternalId?: string;
  CreatorExternalId?: string;
  AssetExternalId?: string;
  AssetNumber?: string;
  WorkOrderExternalId?: string;
}

export interface InspectionDetail {
  Id: number;
  AssetReading: number;
  BudgetYear: number;
  Comment: string;
  ConditionId: number;
  EpPlanChildId: number;
  FundingSourceId: number;
  FundingSourceDescription: string;
  FundingAmount: number;
  InspectionId: number;
  InspectionExternalId: string;
  ItemId: number;
  ItemDescription: string;
  ScoringItemId: number;
  ScoringItemDescription: string;
  ScoringItemValue: number;
  ScoringItem2Id: number;
  ScoringItem2Description: string;
  ScoringItem2Value?: null;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  Weight: number;
}

export interface InspectionItem {
  Id: number;
  Description: string;
  InspectionClassId: number;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  Active: boolean;
  Weight: number;
  WorkOrderTypeId: number;
  WorkOrderTypeExternalId: string;
  WorkOrderSubtypeId: number;
  WorkOrderSubtypeExternalId: string;
  Instructions: string;
  ExternalId: string;
  EpPlanParentId: string;
  RoomTypeId: number;
  RuntimeTypeId: number;
  AreaTypeId: number;
  IncludeScore: number;
  DocumentUploadFlag: boolean;
  ScoringTypeId: number;
  DisplayOnlyFlag: boolean;
  IncludeInReportFlag: boolean;
}

export interface InspectionClass {
  Id: number;
  Description: string;
  ScoringTypeId: number;
  Active: boolean;
  SurveyFlag: boolean;
  Benchmark: number;
  RequestTypeId: number;
  RequestSubTypeId: number;
  WoSendThreshold: number;
  NotifyAssignedToFlag: number;
  LcamFlag: boolean;
  AssessmentFlag: boolean;
  CalculateScoreFlag: boolean;
  AllowDeleteFlag: boolean;
  RequestTypeExternalId: string;
  RequestSubTypeExternalId: string;
}

export interface UserInspectionClassAssoc {
  Id: number;
  EmployeeId: number;
  InspectionClassId: number;
  InspectionTypeId: number;
  DefaultFlag: boolean;
  TabOrder: number;
  UpdateDate: Date;
  UpdatedbyId: number;
  UpdatedByExternalId: string;
}

export interface InspectionType {
  Id: number;
  Description: string;
  Active: boolean;
  InspectionClassId: number;
  AssetReadingFlag: boolean;
  DefaultInitialScoreFlag: boolean;
  RequiredInspectionFlag: boolean;
  DisplayScoreFlag: boolean;
  TabOrder: number;
}

export interface InspectionCondition {
  UpdatedByExternalId: string;
  Id: number;
  Description: string;
  InspectionClassId: number;
  UpdateDate: Date;
  UpdatedById: number;
  ActiveFlag: boolean;
  TabOrder: number;
  EpPlanParentId: string;
}

export interface InspectionScoringItem {
  Id: number;
  Description: string;
  ScoringTypeId: number;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  Active: boolean;
  ScoringItemValue: number;
  EpPlanParentId: number;
  ScoreFlag: boolean;
  ScoreDescription: string;
  RequireAllFieldsFlag: boolean;
}

export interface InspectionScoringType {
  Id: number;
  Description: string;
  ScoringMultiplier: number;
  UpdateDate: Date;
  UpdatedById: number;
  UpdatedByExternalId: string;
  Active: boolean;
  ScoringMethod: number;
  EpPlanParentId: number;
  AutoCompleteFlag: boolean;
}

export interface InspectionAttachment {
  Id: number;
  Name: string;
  Description: string;
  FileName: string;
  UpdateDate: string;
  UpdatedById: number;
  UpdatedByExternalId: string;
  InspectionId: number;
  InspectionExternalId: string;
  InspectionDetailId: number;
}

//End region Inspection

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
  Procedure?: Procedure;
  WorkOrderComment?: WorkOrderComment;
  Attachments?: FamisAttachment[];
  Udfs?: Udf[];
  Crew?: Crew;
  Watchers?: Watcher[];
}

export interface Watcher {
  Id: number;
  RequestId: number;
  EmployeeId: number;
  NotificationFlag: boolean;
  CreateDate: string;
  Name?: string;
}

export interface CreateWatcher {
  RequestId: number;
  EmployeeId: number;
  NotificationFlag: boolean;
  CreateDate?: string;
  Name?: string;
}

export interface UpdateWatcher {
  Id: number;
  RequestId?: number;
  EmployeeId?: number;
  NotificationFlag?: boolean;
  CreateDate?: string;
  Name?: string;
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

export interface AssetAttachmentType {
  Id?: number;
  Name?: string;
  ActiveFlag?: boolean;
  ImageFlag?: boolean;
}

export interface CreateAssetAttachment {
  AssetId: number;
  FileName: string;
  TypeId: number;
  Contents: any;
  Name: string;
  Description: string;
}

export interface Schedule {
  Id: number;
  ExternalId: string;
  StartDate: Date;
  EndDate: Date;
  AssetId: number;
  AssetExternalId: string;
  RequestTypeId: number;
  RequestTypeExternalId: string;
  RequestSubTypeId: number;
  RequestSubtypeExternalId: string;
  AssignedToId: number;
  AssignedToExternalId: string;
  Frequency: number;
  RecurrencePattern: number;
  NotificationTime: number;
  NotificationPeriod: boolean;
  OrderedById: number;
  OrderedByExternalId: string;
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thu: boolean;
  Fri: boolean;
  Sat: boolean;
  Sun: boolean;
  DayOfMonth: number;
  MonthOfYear: number;
  WeekOfMonth: number;
  RequestedById: number;
  CreatedById: number;
  CreatedByExternalId: string;
  RequestState: number;
  UpdateDate: string;
  UpdatedById: number;
  UpdatedByExternalId: string;
  PropertyId: number;
  PropertyExternalId: string;
  SpaceId: number;
  SpaceExternalId: string;
  StatementOfWork: string;
  LastName: string;
  FirstName: string;
  CompanyName: string;
  Email: string;
  Fax: string;
  Phone: string;
  NotifyAssignedToFlag: boolean;
  NotifyFollowupAlert: number;
  RequestPriorityId: number;
  RequestPriorityExternalId: string;
  BillableFlag: boolean;
  ExcludeWeekends: boolean;
  ScheduleName: string;
  ProcedureId: number;
  ProcedureExternalId: string;
  TotalLabor: number;
  TotalMaterials: number;
  TotalOtherCosts: number;
  TotalMarkup: number;
  BillCodeId: number;
  CreateDate: Date;
  CostCodeId: number;
  EstimatedLaborHours: number;
  AutoExtendFlag: boolean;
  AutoExtendPeriod: number;
  NotifyAssignedToMethod: number;
  EstimatedTotalAmount: number;
  NotificationCCWOFlag: boolean;
  OriginationCodeId: number;
  ProjectId: number;
  RecurrencePatternDesc: string;
  ProjectExternalId: string;
  CubeNumber: string;
  InactivatedById: number;
  InactiveDate: Date;
  InactiveDateInt: number;
  ChargeTypeId: number;
  ExternalCostCenter: string;
  SubspaceId: number;
  SubspaceExternalId: string;
  CrewAssignedId: number;
  CrewAssignedExternalId: string;
  GenerateByEnum: string;
  ByCompleteDateNextRequestTypeEnum: string;
  ByCompleteDateNextRequestQuantity: number;
}

export interface ParentAssetAssociation {
  Id: number;
  ParentId: number;
  ParentExternalId: string;
  ParentAssetNumber: string;
  ChildId: number;
  ChildExternalId: string;
  ChildAssetNumber: string;
  UpdateDate: string;
  UpdatedById: number;
  UpdatedByExternalId: string;
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
  MeterFormat?: number;
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
  ParentAssetAssociation?: ParentAssetAssociation[];
  Attachments?: AssetAttachment[];
}

export interface AssetRank {
  Id?: number;
  Description?: string;
  Value?: number;
  UpdateDate?: string;
  UpdatedById?: number;
  UpdatedByExternalId?: string;
  Active?: boolean;
  TabOrder?: number;
  RestrictedFlag?: boolean;
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

export interface PayPeriod {
  Id: number;
  Active: boolean;
  StartDate: Date;
  EndDate: Date;
  PayPeriodNumber: number;
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

export interface Region {
  Id: number;
  Name: string;
  CompanyId: number;
  ParentId?: number;
  UpdateDate: Date;
  ParentFlag: boolean;
  Sqft: number;
  ExternalId?: string;
  Description: string;
  Type: string;
  CompanyExternalId?: string;
  ParentExternalId?: string;
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

export interface UserSecurity {
  EmployeeId: number;
  UpdatedByName: string;
  UpdateDate: Date;
  PortalAdmin: boolean;
  ViewPublicDocuments: boolean;
  AccountRequired: boolean;
  IntegrationSecurity: boolean;
  MoveManager: boolean;
  MstrPro: boolean;
  LbAccess: boolean;
  LbRequestSearch: boolean;
  LbRequestUpdate: boolean;
  LbRequestInternal: boolean;
  LbRequestClose: boolean;
  LbRequestReports: boolean;
  LbRequestMyrequests: boolean;
  LbNotifyRequestor: boolean;
  LbGuestApproval: boolean;
  LbGuestComplete: boolean;
  LbRequestFuture: boolean;
  LbRequestAttachment: boolean;
  LbPropertyBudget: boolean;
  LbViewSpaceAccount: boolean;
  RestrictedWoView: boolean;
  LbViewRequestHistory: boolean;
  LbPerformanceReports: boolean;
  LbShowOtherOptions: boolean;
  LbRequestApproval: boolean;
  LbWoNoeAmount: boolean;
  LbMyCompanyOnly: boolean;
  LbUserGroups: boolean;
  LbCreateRequest: boolean;
  LbNotifyAssignedTo: boolean;
  LbRequestCompleteByDate: boolean;
  LbBackdateSlaEstCompletion: boolean;
  LbShowDetail: boolean;
  LbAuthorizeEntry: boolean;
  LbAllowEnteredInError: boolean;
  LbFindAllRequests: boolean;
  LbTenantAdmin: boolean;
  LbUpdateBillableFlag: boolean;
  LbShowDateClosed: boolean;
  LbReassignReason: boolean;
  LbRestrictToCompany: boolean;
  LbUpdateLockedStatus: boolean;
  LbRequestGeneral: boolean;
  LbWOMassUpdate: boolean;
  LbRequestCloseNotExternal: boolean;
  LbRequestTypeSubtypeView: boolean;
  LbRequestTypeSubtypeCreate: boolean;
  LbRequestTypePropertyAssociation: boolean;
  LbActivityGroupCreate: boolean;
  LbActivityGroupView: boolean;
  LbActivityGroupRequestTypeAssociation: boolean;
  LbActivityGroupUserAssociation: boolean;
  OverrideSvcProviderToInvoice: boolean;
  AlwaysCloseWithoutLaborCosts: boolean;
  LbRequestHub: boolean;
  LbEditAccounts: boolean;
  LbViewAccounts: boolean;
  LbCreateAccounts: boolean;
  UpdateFromLockedStatus: boolean;
  UpdateToLockedStatus: boolean;
  AddViewOthersAsWatcher: boolean;
  RemoveOthersAsWatcher: boolean;
  ReclassifyRequest: boolean;
  UpdatePriority: boolean;
  UpdateProperty: boolean;
  UpdateRequestType: boolean;
  UpdateRequestSubType: boolean;
  UpdateOriginationCode: boolean;
  LbAccessWo: boolean;
  LbExportWo: boolean;
  LbWoReports: boolean;
  LbWoProjectInvoicing: boolean;
  AccountsPayable: boolean;
  ChangeControlWos: boolean;
  LbViewEstimates: boolean;
  LbUpdateNte: boolean;
  WorkOrderUpdateLockedFinancial: boolean;
  HighLevelEstimateAccess: boolean;
  DetailedEstimateAccess: boolean;
  EstimateUpdate: boolean;
  WoInvoicePaymentsCreate: boolean;
  WorkOrderUpdateIntegrationLockedFields: boolean;
  LbViewMarkup: boolean;
  LbEditMarkup: boolean;
  WoViewParentChild: boolean;
  WoViewCostRollups: boolean;
  WoCreateMaintenanceProjects: boolean;
  WoManageMaintenanceProjectTemplates: boolean;
  AccessChartOfAccounts: boolean;
  JobCostingAdmin: boolean;
  LbCompanyAccess: boolean;
  LbCompanyFind: boolean;
  LbCompanyUpdate: boolean;
  LbCompanyUpdateComment: boolean;
  LbCompanyReports: boolean;
  LbCompanyAdmin: boolean;
  LbCompanyDocuments: boolean;
  LbCompanyDocumentUpdate: boolean;
  LbCompanyDocumentsRestricted: boolean;
  CompanyPropertyAssociationCreate: boolean;
  CompanyDelete: boolean;
  CompanyCommentDelete: boolean;
  PropAdmin: boolean;
  PropertyAccess: boolean;
  PropertyDetailUpdate: boolean;
  PropertyFind: boolean;
  PropertyReport: boolean;
  PropertyCreate: boolean;
  PropertyEdit: boolean;
  PropertyDocuments: boolean;
  PropertyBillingAccess: boolean;
  PropertyBillingCreate: boolean;
  PropertyBillingUpdate: boolean;
  PropertyBillingReports: boolean;
  InspectionAccess: boolean;
  InspectionCreate: boolean;
  InspectionFind: boolean;
  InspectionReport: boolean;
  InspectionUpdate: boolean;
  InspectionProcedure: boolean;
  InspectionDelete: boolean;
  InspectionAdmin: boolean;
  InspectionAttachment: boolean;
  SafetyAccess: boolean;
  SafetyCreate: boolean;
  SafetyFind: boolean;
  SafetyReport: boolean;
  SafetyUpdate: boolean;
  SafetyAdmin: boolean;
  SafetyViewEp: boolean;
  SafetyDocuments: boolean;
  SafetyOtherInfo: boolean;
  SafetyEpApprovePlan: boolean;
  SafetyIncidentOtherInfo: boolean;
  SafetyViewConfidential: boolean;
  SafetyEventAccess: boolean;
  SafetyEventCreate: boolean;
  SafetyEventFind: boolean;
  SafetyEventReport: boolean;
  SafetyEventAdmin: boolean;
  SafetyEventUpdate: boolean;
  SafetyEpAdmin: boolean;
  SafetyEpCreate: boolean;
  SafetyEpAccess: boolean;
  SafetyEpUpdate: boolean;
  SafetyEpReport: boolean;
  SafetyEpDashboard: boolean;
  TimecardAccess: boolean;
  TimecardCreate: boolean;
  TimecardFind: boolean;
  TimecardReport: boolean;
  TimecardDashboard: boolean;
  TimecardUpdate: boolean;
  TimecardAdmin: boolean;
  TeTimecardAccess: boolean;
  TeTimecardCreate: boolean;
  TeTimecardFind: boolean;
  TeTimecardDashboard: boolean;
  TeTimecardReport: boolean;
  TeTimecardAdmin: boolean;
  TePayrollAdmin: boolean;
  TimeSheetRequiresApproval: boolean;
  CreateTimeSheets: boolean;
  AssetAccess: boolean;
  AssetCreate: boolean;
  AssetFind: boolean;
  AssetReport: boolean;
  AssetUpdate: boolean;
  AssetAdmin: boolean;
  AssetViewer: boolean;
  AssetUpdateRestrictedAssets: boolean;
  VisitorAccess: boolean;
  VisitorUserAdministration: boolean;
  VisitorCreatePermanentVisitor: boolean;
  VisitorReceptionDesk: boolean;
  VisitorFrontDesk: boolean;
  VisitorFrontDeskCreateVisitor: boolean;
  VisitorRunReport: boolean;
  VisitorSelectVendor: boolean;
  VisitorFrontDeskViewVendor: boolean;
  VisitorDirectory: boolean;
  FrontDeskRestricted: boolean;
  HelpDeskShow: boolean;
  VisitorShareVisitors: boolean;
  LbScheduleAccess: boolean;
  LbScheduleFind: boolean;
  LbScheduleCreate: boolean;
  LbScheduleUpdate: boolean;
  LbScheduleReport: boolean;
  LbScheduleFinancials: boolean;
  ProcedureAdmin: boolean;
  ProcedureFind: boolean;
  KbCreateItem: boolean;
  KbFind: boolean;
  KbAccessWhereUsed: boolean;
  Projectaccess: boolean;
  Projectcreate: boolean;
  ProjectUpdate: boolean;
  ProjectFind: boolean;
  ProjectReports: boolean;
  ProjectDocumentUpdate: boolean;
  ProjectFinancialOtherData: boolean;
  ProjectAccountsPayable: boolean;
  ProjectBudgeting: boolean;
  ProjectAdmin: boolean;
  LbDashboard: boolean;
  InspectionDashboard: boolean;
  FlashUser: boolean;
  DashboardAccess: boolean;
  AssetDashboard: boolean;
  ProjectDashboard: boolean;
  DashboardSla: boolean;
  DashboardAging: boolean;
  DashboardSchedule: boolean;
  DashboardLogbookReport: boolean;
  DashboardInspectionReport: boolean;
  AssetSlaDashboard: boolean;
  BiAccess: boolean;
  InventoryAccess: boolean;
  InventoryUpdate: boolean;
  InventoryReceive: boolean;
  InventoryReports: boolean;
  InventoryFind: boolean;
  InventoryAdmin: boolean;
  InventoryCreate: boolean;
  InventoryPriceAdj: boolean;
  InventoryQuantityAdj: boolean;
  InventoryItemIssue: boolean;
  InventoryReturn: boolean;
  InventoryTransfer: boolean;
  InventoryPhysicalCount: boolean;
  InventoryViewUnitCost: boolean;
  InventoryFacReorder: boolean;
  InventoryCreateBin: boolean;
  InventoryAddBin: boolean;
  InventorySupplyIssue: boolean;
  InventoryAttachments: boolean;
  AccessShoppingCart: boolean;
  ReservationAccess: boolean;
  ReservationConfirm: boolean;
  ReservationDelete: boolean;
  ReservationCreate: boolean;
  ReservationUpdate: boolean;
  ReservationFind: boolean;
  ReservationManager: boolean;
  ReservationAdmin: boolean;
  ReservationReport: boolean;
  ReservationRunReports: boolean;
  ReservationViewCalendar: boolean;
  ProvisioningAccess: boolean;
  ProvisioningCreate: boolean;
  ProvisioningUpdate: boolean;
  ProvisioningFind: boolean;
  ProvisioningReports: boolean;
  ProvisioningAdmin: boolean;
  PurchasingAccess: boolean;
  PurchasingCreate: boolean;
  PurchasingFind: boolean;
  PurchasingReports: boolean;
  PurchasingUpdate: boolean;
  PurchasingAdmin: boolean;
  PurchasingPaymentDashboardView: boolean;
  PurchasingReceiptsUpdate: boolean;
  PurchasingReceiptsDelete: boolean;
  PurchasingReceiptsView: boolean;
  PurchasingInvoicePaymentsView: boolean;
  PurchasingReceiptsMyPoCreate: boolean;
  PurchasingInvoicePaymentsUpdate: boolean;
  PurchasingReceiptsServiceCreate: boolean;
  PurchasingReceiptsAllPoCreate: boolean;
  PurchasingInvoicePaymentsCreate: boolean;
  PurchasingBlanketPoCreate: boolean;
  PurchasingBlanketPoUpdate: boolean;
  PurchasingMyUpdate: boolean;
  PurchasingBlanketPoView: boolean;
  UpdateApprovedOtherType: boolean;
  EditPoNumber: boolean;
  EditPoDate: boolean;
  PreqAccess: boolean;
  PreqCreate: boolean;
  PreqUpdate: boolean;
  PreqFind: boolean;
  PreqReports: boolean;
  PreqBuyer: boolean;
  PurchasingUpdateLocked: boolean;
  PreqUpdateMy: boolean;
  PreqDeleteApprovedMaterialItem: boolean;
  ApprovalWo: boolean;
  ApprovalPo: boolean;
  WoApprovalLevelId?: null;
  PoApprovalLevelId?: null;
  ApprovalProject: boolean;
  ProjectApprovalLevelId?: null;
  ApprovalPr: boolean;
  PrApprovalLevelId?: null;
  EditProxyApprover: boolean;
  AssessmentAccess: boolean;
  AssessmentCreate: boolean;
  AssessmentUpdate: boolean;
  AssessmentReports: boolean;
  AssessmentAdmin: boolean;
  AssessmentStart: boolean;
  AssessmentCommit: boolean;
  AssessmentClose: boolean;
  AssessmentImageViewer: boolean;
  SpaceAdmin: boolean;
  SpaceAccess: boolean;
  SpaceLocationFind: boolean;
  SpaceLocationCreate: boolean;
  SpaceLocationReport: boolean;
  SpaceVisualMapsAccess: boolean;
  SpaceFloorCreate: boolean;
  SpaceFloorUpdate: boolean;
  SpaceFloorView: boolean;
  SpaceVisualMapsAdmin: boolean;
  SpaceSpaceCreate: boolean;
  SpaceSpaceUpdate: boolean;
  SpaceSpaceView: boolean;
  SpaceViewAllocations: boolean;
  SpaceSubspaceCreate: boolean;
  SpaceSubspaceUpdate: boolean;
  SpaceSubspaceView: boolean;
  SpaceLocationAudit: boolean;
  SpaceEditAllocations: boolean;
  SpaceSurveyAdmin: boolean;
  SpaceSurveyCreate: boolean;
  SpaceSurveyFind: boolean;
  SpaceSurveyApproval: boolean;
  SpaceSurveyEdit: boolean;
  MyAllocationsOnly: boolean;
  SpaceDepartmentsOnly: boolean;
  UtilityAccess: boolean;
  UtilitySystemsCreate: boolean;
  UtilityMeterSiteCreate: boolean;
  UtilityMeterReadingAccess: boolean;
  UtilityMeterWoCreate: boolean;
  UtilityMeterScheduleCreate: boolean;
  UtilityMeterInspectionCreate: boolean;
  UtilityInvoiceAccess: boolean;
  UtilityAdjustmentEntry: boolean;
  UtilityBillingPeriodClose: boolean;
  UtilityReports: boolean;
  UtilityAdmin: boolean;
  UtilityCreate: boolean;
  UtilityBillingAccess: boolean;
  UtilityReadingsImport: boolean;
  UtilityWeatherDataEntry: boolean;
  UtilityStatistics: boolean;
  UtilityMiscCostsEntry: boolean;
  UtilityStatementsCreate: boolean;
  LeaseAdminAccess: boolean;
  LeaseAdminAdmin: boolean;
  AtlasPimsProjectAccess: boolean;
  UserEdit: boolean;
  Admin: boolean;
  GuestAdmin: boolean;
  RegionAdmin: boolean;
  ApprovalAdmin: boolean;
  LoginAdmin: boolean;
  BulkToolsAdmin: boolean;
  ViewApiDocs: boolean;
  ThreeSixtyAdmin: boolean;
  BulkUploaderAdmin: boolean;
  KeysAdmin: boolean;
  SocUserAdmin: boolean;
  RegionCreate: boolean;
  RegionEdit: boolean;
  RegionView: boolean;
  RegionAssociation: boolean;
  RegionDeleteUserAssociations: boolean;
  KeysEdit: boolean;
  KeysAccess: boolean;
  AnalyticsUser: boolean;
  AccessMobileApp: boolean;
  BillOfMaterialsAccess: boolean;
  BillOfMaterialsEdit: boolean;
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
  EmployeeId?: number;
  ExternalEmployeeId?: string;
  TimeStarted?: string;
  TimeFinished?: string;
  Rate?: number;
  Hours?: number;
  RateTypeId?: number;
  RequestTypeActivityId?: number;
  ExternalRequestTypeActivityId?: string;
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
  CrewId?: number;
  Id?: number;
  InstallId?: number;
  RequestId?: number;
  RequestExternalId?: string;
  Date?: Date;
  Description?: string;
  VendorCompanyId?: number;
  TotalAmount?: number;
  MarkupFlag?: boolean;
  TotalMarkup?: number;
  AccountId?: number;
  UpdateDate?: Date;
  RecurrenceId?: number;
  UpdatedById?: number;
  AccountsPayableFlag?: boolean;
  ApExportFlag?: boolean;
  TaxableFlag?: boolean;
  CurrencySign?: string;
  CurrencyCode?: string;
  LineItemNumber?: number;
  ExternalId?: string;
  TaxRate?: number;
  ExternalUpdatedById?: string;
  ExternalRecurrenceId?: string;
  InvoiceNumber?: string;
  InvoiceDate?: Date;
}

export interface LaborEntry {
  Id: number;
  TotalHours: number;
  TimeType: string;
  ActivityId: number;
  ActivityExternalId: string;
  ActivityName: string;
  PropertyId: number;
  PropertyExternalId: string;
  PropertyName: string;
  Comments: string;
  RequestId: number;
  RequestExternalId: string;
  UserId: number;
  UserExternalId: string;
  EntryDate: Date;
  PayPeriodId: number;
  PayYear: number;
  CrewId: number;
  CrewExternalId: string;
  StartTime: Date;
  EndTime: Date;
  PositionId: number;
  PositionExternalId: string;
  LaborReasonId: number;
  StatusId: number;
  Status: {
    StatusId: number;
    Name: string;
    ReadyFlag: boolean;
    PendingFlag: boolean;
    ApprovedFlag: boolean;
    RejectedFlag: boolean;
  };
}

export interface OtherCost {
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
  Id?: number;
  InstallId?: number;
  RequestId?: number;
  RequestExternalId?: string;
  Date?: Date;
  Description?: string;
  VendorCompanyId?: number;
  TotalAmount?: number;
  MarkupFlag?: boolean;
  TotalMarkup?: number;
  AccountId?: number;
  UpdateDate?: Date;
  RecurrenceId?: number;
  UpdatedById?: number;
  AccountsPayableFlag?: boolean;
  ApExportFlag?: boolean;
  TaxableFlag?: boolean;
  CurrencySign?: string;
  CurrencyCode?: string;
  LineItemNumber?: number;
  ExternalId?: string;
  TaxRate?: number;
  ExternalUpdatedById?: string;
  ExternalRecurrenceId?: string;
  InvoiceNumber?: string;
  InvoiceDate?: Date;
}

export interface Account {
  Id?: number;
  RequestId?: number;
  RequestExternalId?: string;
  Description?: string;
  Number?: string;
  IsDefault?: boolean;
}

export interface OtherCostType {
  Id?: number;
  Name?: string;
  Active?: boolean;
  TaxableFlag?: boolean;
  IncomeCategory?: string;
  ContraAccountNumber?: string;
  OtherCostGLAccount?: string;
  GLAccountId?: number;
  GLAccountIdForMarkup?: number;
  StandardChargeAmount?: number;
  DiscountedFlag?: boolean;
}

export interface MaterialCost {
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

export interface InstallationConfig {
  Id?: number;
  IntegrationSecurity?: boolean;
  HealthCareModule?: boolean;
  GuestUserEmailRequired?: boolean;
  AssetModule?: boolean;
  AssetHierarchyModule?: boolean;
  WorkOrderEstimates?: boolean;
  AdvancedInventoryModule?: boolean;
  Crews?: boolean;
  ApprovalModule?: boolean;
  WsResponseEnabled?: boolean;
  MobileApis?: boolean;
  LogbookModule?: boolean;
  WorkOrderModule?: boolean;
  InspectionModule?: boolean;
  VisitorModule?: boolean;
  IncidentModule?: boolean;
  TimecardTeModule?: boolean;
  ProjectModule?: boolean;
  InventoryModule?: boolean;
  InventoryBillOfMaterialsModule?: boolean;
  ProvisioningModule?: boolean;
  EmergencyPlanningModule?: boolean;
  PurchasingModule?: boolean;
  EventModule?: boolean;
  PropertyModule?: boolean;
  PropertyBillingModule?: boolean;
  ReservationModule?: boolean;
  WorkOrderForms?: boolean;
  AssessmentsModule?: boolean;
  LeaseAdminModule?: boolean;
  UtilityModule?: boolean;
  SpaceModule?: boolean;
  VisualMapModule?: boolean;
  MaintenanceProjects?: boolean;
  SpaceSurveyModule?: boolean;
  TowerWingsOn?: boolean;
  FloorsOn?: boolean;
  SubspacesOn?: boolean;
  TowerWingAutoCreated?: boolean;
  TowerWingRequired?: boolean;
  TimeCardV2Module?: boolean;
  ApiDocs?: boolean;
  KeysModule?: boolean;
  AccruentAnalyticsModule?: boolean;
  HelpLinkUrl?: string;
  NpfaAccess?: boolean;
  FavoritesFlag?: boolean;
  Description?: string;
  InstallUrl?: string;
  CustomerDocumentExternalPath?: string;
  NavigationFooterLogoFile?: string;
  NavigationFooterLogoUrl?: string;
  NavigationHeaderLogoFile?: string;
  NavigationHeaderLogoUrl?: string;
  NavigationFooterText?: string;
  NavigationHeaderColor?: string;
  AssetIntegration?: boolean;
  InvoiceIntegration?: boolean;
  ProjectIntegration?: boolean;
  PropertyIntegration?: boolean;
  PurchaseOrderIntegration?: boolean;
  RegionIntegration?: boolean;
  UserIntegration?: boolean;
  WorkOrderIntegration?: boolean;
  WorkOrderFinancialIntegration?: boolean;
  SpaceFloorSelectorAssetForOn?: boolean;
  AllowDateFormatUserOverride?: boolean;
  DateFormatId?: number;
  DateFormat?: string;
  CreateRequestReactParentChild?: boolean;
  ExternalEmployeeId2RequiredForFullUser?: boolean;
  SocSoxCompliance?: boolean;
  MaxHumanUserAdmins?: number;
  FromEmailName?: string;
  FromEmailAddr?: string;
  SessionTimeoutMinutes?: number;
  SecureSite?: boolean;
  MobileDateFormat?: string;
  MobileDateFormatId?: number;
  SsoEnabledFlag?: boolean;
  IntegrationApiEnabled?: boolean;
  WoFinancialsV2?: boolean;
  Mobile?: boolean;
  BlanketPo?: boolean;
  BulkUploaderFlag?: boolean;
  PurchasingV2?: boolean;
  Timesheet?: boolean;
  Timecard?: boolean;
  ProjectManagement?: boolean;
  CompanyDocumentEmailService?: boolean;
  MultipleCurrencyInstallation?: boolean;
  ImageViewer?: boolean;
  RequestHub?: boolean;
  RouteBasedTaskSchedule?: boolean;
  ViewAssessmentDetailsExtProjectInfo?: boolean;
  FileSignatureValidation?: boolean;
  ReactNavigation?: boolean;
  CreateRequestReact?: boolean;
  CreateRequestReactFullUser?: boolean;
  LoginPageText?: string;
  LoginPageLegalText?: string;
  ShowPrivacyPolicy?: boolean;
  DefaultMessageBody?: string;
  DefaultMessageSubject?: string;
  DefaultMobileBody?: string;
  DefaultMobileSubject?: string;
  FollowupMessagePrefix?: string;
  FollowupMobilePrefix?: string;
  CloseNotificationBody?: string;
  CloseNotificationSubject?: string;
  RequestCloseNotification?: boolean;
  UpdateNotificationBody?: string;
  UpdateNotificationBodyMobile?: string;
  UpdateNotificationSubject?: string;
  UpdateNotificationSubjectMobile?: string;
  SchedNotificationBody?: string;
  SchedNotificationBodyMobile?: string;
  SchedNotificationSubject?: string;
  SchedNotificationSubjectMobile?: string;
  DefaultRequestConfirmationMsg?: string;
  SurveyLink?: string;
  SurveyConfirmationText?: string;
  SurveyText?: string;
  SurveyApprovalFlag?: boolean;
  ServiceProviderUrl?: string;
  ServiceConsumerUrl?: string;
  SsoSamlValidationTypeEnum?: string;
  SamlDebugMode?: boolean;
  CustomLoginErrorMessage?: string;
  PasswordMinLength?: number;
  PasswordRequirements?: string;
  PasswordExpirationDays?: number;
  AlsAdvancedLoginSecurity?: boolean;
  FCA?: boolean;
  EmployeeDashboard?: boolean;
  LogbookGeographicInformationSystem?: boolean;
  Bi?: boolean;
  BiProvider?: string;
  AdvancedValidate?: boolean;
  InsecureValues?: string;
  ForgotPasswordFlag?: boolean;
  AlsPasswordFreezeHours?: number;
  AlsNumberUnusableOldPasswords?: number;
  AlsMaxFailedLogins?: number;
  AlsPasswordLockedTextMobile?: string;
  AlsForcePasswordChangeText?: string;
  AlsForcePasswordChangeTextMobile?: string;
}

export interface PriorityTypeSLADetails {
  Id: number;
  RequestPriorityId: number;
  RequestTypeId: number;
  Active: boolean;
  DefaultFollowupAlert: number;
  EscalateToId: number;
  DefaultSlaResponseTime: number;
  DefaultSlaCompletionTime: number;
  SlaOverdueAlert: number;
  SlaEscalateToId: number;
  SlaSendNotificationsFlag: boolean;
  UpdateDate: Date;
  UpdatedById: number;
  Sla247OverrideFlag: boolean;
  RequestSubTypeId: number;
  DefaultPriorityFlag: boolean;
  SlaCompletionInHours: boolean;
  SlaResponseInHours: boolean;
  UpdatedByExternalId: string;
}

// Region Shopping Cart
export interface ShoppingCart {
  Id: number;
  Description: string;
  RequestId: number;
  RequestExternalId: string;
  StatusId: number;
  DeliveryDescription: string;
  RequestedDeliveryDate: string;
  UpdatedByName: string;
  UpdateDate: string;
  CreateDate: string;
  MyCartsOnly: boolean;
  CreatedById: number;
  CrewUserAssociations?: CrewUserAssociation[];
}

export interface ShoppingCartItem {
  Id: number;
  ShoppingCartId: number;
  MaterialId: number;
  WarehouseId: number;
  QuantityRequested: number;
  QuantityReceived: number;
  UpdateDate: string;
  UpdatedByName: string;
  MaterialExternalId: string;
  WarehouseExternalId: string;
}

export interface ShoppingCartStatus {
  Id: number;
  Description: string;
  UpdateDate: Date;
  UpdatedByName: string;
  DefaultOpen: boolean;
  DefaultNoneIssued: boolean;
  DefaultPartialIssue: boolean;
  DefaultClosed: boolean;
  DefaultExpired: boolean;
}

// End Region Shopping Cart

//Region Purchase Requisition
export interface PurchaseRequisitionHeader {
  Id: number;
  Number: string;
  RequestorName: string;
  RequestorEmail: string;
  RequestorPhone: string;
  CreatedById: number;
  CreatedByExternalId: string;
  AttentionTo: string;
  Description: string;
  TypeId: number;
  TotalAmount: number;
  CreateDate: Date;
  UpdateDate: Date;
  StatusId: number;
  PropertyId: number;
  PropertyExternalId: string;
  ShipToAddress: string;
  RequestId: number;
  RequestExternalId?: null;
  NTE: number;
  NTEApproved: number;
}

export interface PurchaseRequisitionLine {
  Id: number;
  PRId: number;
  Number: string;
  RequestorName: string;
  RequestorEmail: string;
  RequestorPhone: string;
  CreatedById: number;
  CreatedByExternalId: string;
  AttentionTo: string;
  Description: string;
  TypeId: number;
  TotalAmount: number;
  CreateDate: Date;
  UpdateDate: Date;
  StatusId: number;
  PropertyId: number;
  PropertyExternalId: string;
  ShipToAddress: string;
  RequestId: number;
  RequestExternalId?: null;
  NTE: number;
  NTEApproved: number;
}

export interface PurchaseRequisitionHeaderStatus {
  Id: number;
  Description: string;
  OpenStatusFlag: boolean;
  ClosedStatusFlag: boolean;
  CancelledStatusFlag: boolean;
  DefaultClosedStatusFlag: boolean;
  DefaultSubmitStatusFlag: boolean;
  Active: boolean;
  UpdateDate: Date;
  UpdatedByName: string;
  TabOrder: number;
}

export interface PurchaseRequisitionType {
  Id: number;
  Name: string;
  ApprovalRequired: boolean;
  Active: boolean;
  FacilitatedReorder: boolean;
  TabOrder: number;
}

//End Region Purchase Requisition

//Region Purchase Order
export interface PurchaseOrderHeader {
  Id: number;
  Number: string;
  BlanketId: number;
  BlanketNumber: string;
  ReleaseNumber: string;
  RequestorId: number;
  RequestorExternalId: string;
  RequestorName: string;
  RequestorEmail: string;
  RequestorPhone: string;
  TypeId: number;
  AuthorizationNumber: string;
  BillableFlag: number;
  NoeAmount: number;
  StatusId: number;
  AttentionToId: number;
  ExpirationDate?: Date;
  VendorEmployee?: number;
  AttentionToExternalId: string;
  BillToAddress: string;
  DefaultRequestId: number;
  DefaultRequestExternalId: string;
  Description: string;
  VendorId: number;
  VendorExternalId: string;
  VendorName: string;
  VendorAddress: string;
  ShipToName: string;
  Terms: string;
  Fob: string;
  TotalAmount: number;
  UpdateDate: string;
  UpdateById: number;
  Date: string;
  ApprovalDate: string;
  OrderedById: number;
  ApprovedById: number;
  PaymentTermId: number;
  ShippingMethodId: number;
  FreeOnBoardId: number;
  IsNewPOFlag: boolean;
  DeliveryDate?: Date;
  IntegrateInitialApprovedFlag: boolean;
  IntegrationStatusEnum: string;
  BuyerId: number;
  WarehouseId: number;
  WarehouseExternalId: string;
  PropertyId: number;
  RegionId: number;
  PropertyExternalId: string;
  ShipToAddress: string;
  SpendLimit: number;
  ContractId: string;
  VendorCurrencyAbbreviation: string;
  CreatorId: number;
  CreatorExternalId: string;
  PoNumbeCalculatedAlphanumericSortValue: string;
}

export interface PurchaseOrderLine {
  Id: number;
  POLineNumber: number;
  UpdatedById: number;
  UpdatedByExternalId: string;
  UpdateDate: Date;
  TotalAmount: number;
  POId: number;
  PONumber: string;
  Active: boolean;
  QuantityOrdered: number;
  Description: string;
  DateRequired: Date;
  PropertyId: number;
  PropertyExternalId: string;
  TaxableFlag: boolean;
  TaxRate: number;
  ShippingHandling: number;
  UnitCost: number;
  OtherCostsFlag: boolean;
  OtherCostId: string;
  MaterialsFlag: boolean;
  UOMId: number;
  MaterialItemId: number;
  MaterialItemExternalId: string;
  MaterialItemPartNumber: string;
  WarehouseMaterialId: number;
  WarehouseId: number;
  WarehouseExternalId: string;
  RequestId: number;
  RequestExternalId: string;
  PRId: number;
  PRNumber: string;
  PRLineId: number;
  PRLineNumber: string;
}

export interface PurchaseOrderStatus {
  Id: number;
  Name: string;
  Active: boolean;
  TabOrder: number;
  DefaultOpenStatusFlag: boolean;
  EnteredInErrorFlag: boolean;
  DefaultApprovedStatusFlag: boolean;
  DefaultDeclinedStatusFlag: boolean;
  CanceledStatusFlag: boolean;
  DefaultApprovalWaitingStatusFlag: boolean;
  DefaultClosedStatusFlag: boolean;
  DefaultAlterationDeclinedStatusFlag: boolean;
  AlterationInProgressStatusFlag: boolean;
  DefaultAutoUpdatePartialFlag: boolean;
  DefaultAutoUpdateFullFlag: boolean;
  LockedStatusFlag: boolean;
}

export interface PurchaseOrderType {
  Id: number;
  Name: string;
  DefaultPO: boolean;
  TabOrder: number;
  SingleWarehouse: boolean;
  SingleProperty: boolean;
  Release: boolean;
  DefaultRelease: boolean;
  Active: boolean;
  ApprovalRequired: boolean;
}

//End Region Purchase Order

//Region Meter Site

export interface MeterSite {
  Id?: number;
  Name?: string;
  Description?: string;
  StatusId?: number;
  TypeId?: number;
  On?: boolean;
  UtilitySystemId?: number;
  FromMeterSiteId?: number;
  Level?: string;
  AssociateMeterSiteId?: number;
  GroupId?: number;
  GroupOrderNumber?: number;
  CalculatedCostUsingRate?: boolean;
  InitialReadDate?: Date;
  OverrideChargeRate?: number;
  RecentConsumption?: number;
  PropertyId?: number;
  PropertyExternalId?: string;
  SpaceId?: number;
  SpaceExternalId?: string;
  Comments?: string;
  Directions?: string;
  SpecialInstructions?: string;
  EstimateCodeId?: number;
  EstimateActive?: boolean;
  EstimateComment?: string;
  EstimateConsumption?: number;
  FloorId?: number;
  SubspaceId?: number;
  RoomArea?: string;
  AllocBasedOnArea?: boolean;
  UpdatedbyName?: string;
  UpdateDate?: string;
  MeterInstalled?: boolean;
  RecentReadDate?: Date;
  PreviousReadDate?: Date;
  PreviousReading?: number;
  PreviousDemand?: number;
  PreviousConsumption?: number;
  RecentReading?: number;
  RecentDemandReading?: number;
  ReadingUpdateDate?: Date;
  SwapConsumption?: number;
  SwapConsumptionDate?: Date;
  RecentDemandConsumption?: number;
  MeterGroup?: string;
  CurrentChargeRate?: number;
}

export interface MeterSiteGroup {
  Id?: number;
  Name?: string;
  Description?: string;
  TabOrder?: number;
  UpdatedByName?: string;
  UpdateDate?: Date;
}

export interface MeterSiteStatus {
  Id?: number;
  Name?: string;
  Description?: null;
  ActiveFlag?: boolean;
  DefaultFlag?: boolean;
  TabOrder?: number;
  UpdatedByName?: string;
  UpdateDate?: Date;
}

export interface MeterReading {
  InstallId?: number;
  Id?: number;
  CreateDate?: string;
  MeterSiteId?: number;
  BillingperiodId?: number;
  EstimateCodeId?: number;
  EntryMethod?: number;
  PreviousReadDate?: Date;
  PreviousReading?: number;
  PreviousDemand?: number;
  PreviousConsumption?: number;
  RecentReadDate?: Date;
  RecentReading?: number;
  RecentDemandReading?: number;
  RecentConsumption?: number;
  RecentDemandConsumption?: number;
}

//End Region Meter Site

export interface ExternalSystem {
  Id: number;
  ActiveFlag: boolean;
  ExternalSystemName: string;
  UpdatedDate: Date;
  AdvancedIntegrationOptions: string;
  CloseEmailMessageFormat: string;
  CloseEmailMessageSubject: string;
  CloseEmailSendMessageFlag: boolean;
  CloseVerifyEmailMessageFormat: string;
  CloseVerifyEmailMessageSubject: string;
  CloseVerifyEmailSendMessageFlag: boolean;
  DefaultEmployeeId: number;
  DefaultEmployeeExternalId: string;
  DestinationEmailAddress: string;
  DestinationEmailName: string;
  DispatchVerifyEmailMessageFormat: string;
  DispatchVerifyEmailMessageSubject: string;
  DispatchVerifyEmailSendMessageFlag: boolean;
  ExternalInstallationId: string;
  ExternalPropertyIdPrefix: string;
  InstallationId: number;
  OriginationSystemName: string;
  PriorityOverrideFlag: boolean;
  SourceEmailAddress: string;
  SourceEmailName: string;
  UpdateEmailMessageFormat: string;
  UpdateEmailMessageSubject: string;
  UpdatedById: number;
  UpdatedByExternalId: string;
  WebServiceFlag: boolean;
  WebServiceUrl: string;
  WebServiceAdvancedTransportOptions: string;
  WebServiceAdvancedTransportOptionsFlag: boolean;
  WebServiceInboundDatesUtcFlag: boolean;
  WebServiceLinkedSystemsFlag: boolean;
  WebServiceSendReactiveFlag: boolean;
  UseHierarchyFlag: boolean;
  Alias: string;
  Type: string;
}

export interface Position {
  Id: number;
  Description: string;
  ExternalId: string;
  Active: boolean;
  UpdatedById: number;
  UpdatedByExternalId: string;
  UpdateDate: Date;
}

