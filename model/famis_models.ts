import {Asset} from "./assets";
import {Crew} from "./crews";

export interface FamisResponse<T>{
    "@odata.nextLink"? : string;
    value : T[]
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