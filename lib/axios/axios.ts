import envConfig from "@/config/env.config";
import axios from "axios";
import getAuthToken from "../getAuthToken";
import { handleApiError } from "./interceptors";

const api = axios.create({
    baseURL: envConfig.serverUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await getAuthToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    async (error) => {
        await handleApiError(error);
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        await handleApiError(error);
        return Promise.reject(error);
    }
);

export default api;
