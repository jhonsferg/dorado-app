import {ROLE_PERMISSIONS} from "@/utils/constants/roles.ts";
import {authService} from "@/services/api/auth.ts";

export const createAuthSlice = (set: any, get: any, _: any) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,

    login: async (credentials: any) => {
        set({ isLoading: true });
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            set({
                user: response,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
            });
            return response;
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    initializeAuth: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            set({
                token,
                user: JSON.parse(user),
                isAuthenticated: true,
            });
        }
    },

    hasPermission: (permission: any) => {
        const { user } = get();
        if (!user || !user.roles) return false;

        return user.roles.some((role: any) => {
            const permissions = ROLE_PERMISSIONS[role];
            return permissions.includes('*') || permissions.includes(permission);
        });
    },
});
