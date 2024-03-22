export default interface LoginResponse {
    status: string;
    message?: string;
    access_token?: string;
    token_type?: string;
    cart?: string;
    watchlist?: string;
    affiliate?: string;
}