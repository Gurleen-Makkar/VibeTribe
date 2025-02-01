export interface RegisterData {
    name: string;
    email: string;
    password: string;
    location: string;
    bio: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    location: string;
    bio: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}
