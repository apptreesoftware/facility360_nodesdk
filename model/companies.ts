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
    ContractTypeId?: any;
    ContractComments?: string;
    MobilePhone?: string;
    InternalVendorCode2?: string;
    RiskRating?: string;
    TypeOfAccessId?: any;
    PaymentTermId?: number;
    ShippingMethodId?: any;
    FreeOnBoardId?: any;
    Addr3?: string;
    RemAddr1?: string;
    RemAddr2?: string;
    RemAddr3?: string;
    RemCity?: string;
    RemZip?: string;
    RemStateId?: any;
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
    ContractTypeId?: any;
    ContractComments?: string;
    MobilePhone?: string;
    InternalVendorCode2?: string;
    RiskRating?: string;
    TypeOfAccessId?: any;
    PaymentTermId?: number;
    ShippingMethodId?: any;
    FreeOnBoardId?: any;
    Addr3?: string;
    RemAddr1?: string;
    RemAddr2?: string;
    RemAddr3?: string;
    RemCity?: string;
    RemZip?: string;
    RemStateId?: any;
    Description?: string;
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