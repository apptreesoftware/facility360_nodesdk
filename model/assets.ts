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

export interface AssetCreateRequest {
    Name: string;
    Description: string;
    AssetNumber: string;
    SerialNumber: string;
    AssetClassId: number;
    AssetRankId: number;
    MakeId: number;
    ModelId: number;
    AssetStatusId: number;
    AssetKeywordId: number;
    AssetTypeId: number;
    SpaceId: number;
    QuantityAvailable: number;
    ActiveFlag: boolean;
    FloorId: number;
    PurchaseDate: Date;
    EstimatedLifeInYears: number;
    EstimatedLifeInHours: number;
    AnnualRuntimeInHours: number;
    CapitalRepairCost: number;
    SpaceExternalId: string;
    FloorExternalId: string;
}