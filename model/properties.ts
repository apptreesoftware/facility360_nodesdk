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