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