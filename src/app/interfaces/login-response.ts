export default interface LoginResponse {
    status: string;
    message?: string;
    access_token?: string;
    token_type?: string;
    cart?: string;
    watchlist?: string;
    affiliate?: string;
    is_super_admin?: boolean;
    is_external_user?: boolean;
}