export interface AuthResponse {
    status: string;
    message?: string;
    is_admin?: boolean;
    access_token?: string;
    token_type?: string;
}