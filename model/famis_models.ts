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
    RequestExternalId: string;
    Contents?: any;
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

export interface Asset {
    Id: number;
    Name: string;
    Description: string;
    AssetNumber: string;
    SerialNumber: string;
    AssetClassId: number;
    AssetRankId: number;
    EcriCodeId?: any;
    MakeId: number;
    ModelId: number;
    InServiceDate?: Date;
    PurchasedFromVendor?: any;
    AssetStatusId: number;
    StatusComment?: string;
    BarcodeNumber: string;
    FinancialSystemId: string;
    AssetSafetyComments?: any;
    AssetKeywordId?: number;
    ExternalId: string;
    AssetTypeId?: number;
    RiskAssessment?: any;
    ExternalSystemId?: any;
    Guid: string;
    PropertyId: number;
    SpaceId: number;
    EmployeeId?: any;
    Room: string;
    QuantityAvailable: number;
    Comments: string;
    ActiveFlag: boolean;
    FloorId: number;
    SubSpaceId?: any;
    AutoAssignedToId?: any;
    WarrantyContractNumber?: any;
    WarrantyEffectiveDate?: Date;
    WarrantyExpirationDate?: Date;
    WarrantyExpirationContact?: any;
    WarrantyExpirationContactPhone?: any;
    WarrantyVendorId?: any;
    WarrantyPoNumberId?: any;
    MaintenanceContractNumber?: any;
    MaintenanceContractVendorId?: any;
    MaintenanceContractExpirationDate?: any;
    MaintenanceContractNotificationDays?: any;
    PurchaseDate?: Date;
    PurchaseAmount?: number;
    ExternalCostCenterId?: any;
    PurchaseCostCenter?: any;
    PoNumber?: any;
    EstimatedLifeInYears: number;
    EstimatedLifeInHours: number;
    AnnualRuntimeInHours: number;
    CapitalRepairCost: number;
    EstimatedReplacementCost?: any;
    LifeExpectancy?: any;
    UnitMultiplier?: any;
    MeterMultiplier?: any;
    MeterFormat?: any;
    UomId?: any;
    UtilityId?: any;
    LastCalibrationDate?: any;
    MeterSiteId?: any;
    MeterInstallationDate?: any;
    MeterInitialReading?: any;
    MeterLastReadingDate?: any;
    MeterLastReading?: any;
    UpdateDate: Date;
    UpdatedById: number;
    FcaRankId?: number;
    PropertyExternalId: string;
    SpaceExternalId: string;
    EmployeeExternalId?: any;
    WarrantyVendorExternalId?: any;
    MaintenanceContractVendorExternalId?: any;
    UpdatedByExternalId: string;
    FloorExternalId: string;
    SubSpaceExternalId?: any;
    AutoAssignedToExternalId?: any;
}