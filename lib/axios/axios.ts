import envConfig from "@/config/env.config";
import axios from "axios";
import getAuthToken from "../getAuthToken";
import { handleApiError } from "./interceptors";

const api = axios.create({
    baseURL: envConfig.serverUrl,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();

    // 🔑 Add token if present
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🕵️‍♂️ Log the FULL URL
    const fullUrl = `${config.baseURL || ""}${config.url || ""}`;
    console.log("Request URL:", fullUrl);
    console.log("Method:", config.method?.toUpperCase());
    console.log("Params:", config.params);
    console.log("Data:", config.data);

    return config;
  },
  async (error) => {
    await handleApiError(error);
    return Promise.reject(error); // ⬅️ return to stop the chain
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
