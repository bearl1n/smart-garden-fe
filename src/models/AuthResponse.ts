export interface AuthResponse {
    user: string;
    accessToken: string;
    refreshToken: string;
    expiredDate: string;
}