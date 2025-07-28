import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let getToken: (() => string | null) | null = null;

export const setTokenGetter = (getter: () => string | null) => {
    getToken = getter;
};

instance.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);