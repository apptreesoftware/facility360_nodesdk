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

export interface CrewUserAssoc {
    Id: number;
    UserId: number;
    UserExternalId: string;
    CrewId: number;
    CrewExternalId: string;
    UpdateDate: Date;
    UpdatedById: number;
    UpdatedByExternalId: string;
    Rate?: number;
    OT?: number;
    DT?: number;
    UseCrewRatesFlag: boolean;
    DefaultCrewFlag: boolean;
    CrewLeaderFlag: boolean;
}