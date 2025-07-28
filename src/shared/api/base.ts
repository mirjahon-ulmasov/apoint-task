import axios from "axios";

const BASE_URL = "http://apialfa.apoint.uz/v1";

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