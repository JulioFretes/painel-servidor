import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    window.location.href =
                        "/login?next=" + window.location.pathname;
                    break;
                case 403:
                    window.location.href = "/forbidden";
                    break;
                case 418:
                    window.location.href = "/";
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export const api = {
    get: async (url: string, params?: any) => {
        return axiosInstance.get(
            (url.startsWith("/") ? url : "/" + url) +
                `${params ? "?" : ""}${Object.keys(params || {})
                    .map((key) => `${key}=${params[key]}`)
                    .join("&")}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    },
    post: async (url: string, data: any) => {
        return axiosInstance.post(url.startsWith("/") ? url : "/" + url, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    },
    delete: async (url: string) => {
        return axiosInstance.delete(url.startsWith("/") ? url : "/" + url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    },
    put: async (url: string, data: any) => {
        return axiosInstance.put(url.startsWith("/") ? url : "/" + url, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    },
    patch: async (url: string, data: any) => {
        return axiosInstance.patch(
            url.startsWith("/") ? url : "/" + url,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    },
} as {
    get: (url: string, params?: any) => Promise<any>;
    post: (url: string, data: any) => Promise<any>;
    delete: (url: string) => Promise<any>;
    put: (url: string, data: any) => Promise<any>;
    patch: (url: string, data: any) => Promise<any>;
};
