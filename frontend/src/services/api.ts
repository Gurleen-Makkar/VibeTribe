import axios from 'axios';
import { RegisterData, LoginData, AuthResponse } from '../types/auth';
import { GroupedPreferenceOptions, UserPreferences, ProfileStatus } from '../types/preferences';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
};

export const preferenceService = {
    async getPreferenceOptions(): Promise<GroupedPreferenceOptions> {
        const response = await api.get<GroupedPreferenceOptions>('/preferences/options');
        return response.data;
    },

    async getUserPreferences(): Promise<UserPreferences> {
        const response = await api.get<UserPreferences>('/preferences/user-preferences');
        return response.data;
    },

    async saveUserPreferences(preferences: Omit<UserPreferences, '_id' | 'user' | 'isProfileComplete'>): Promise<UserPreferences> {
        const response = await api.post<UserPreferences>('/preferences/user-preferences', preferences);
        return response.data;
    },

    async getProfileStatus(): Promise<ProfileStatus> {
        const response = await api.get<ProfileStatus>('/preferences/profile-status');
        return response.data;
    }
};

export default api;
