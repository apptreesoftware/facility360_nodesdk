export interface Info {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    user_id: string;
    first_name: string;
    last_name: string;
    installation_id: string;
    installation_name: string;
}

export interface LoginResponse {
    Item: Info;
    Result: boolean;
    Context: number;
    Message: string;
}