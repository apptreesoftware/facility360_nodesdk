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