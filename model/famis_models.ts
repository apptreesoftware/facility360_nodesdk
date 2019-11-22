import {Asset} from "./assets";
import {Crew} from "./crews";
import {Property} from "./properties";
import {FamisUser} from "./user";

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