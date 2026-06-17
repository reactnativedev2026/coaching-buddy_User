import { setIsAuthenticated, setUser } from "@/redux/slices/user.slice";
import store from "@/redux/store";
import { router } from "expo-router";
import deleteAuthToken from "../deleteAuthToken";
import errorToast from "../errorToast";
import getAuthToken from "../getAuthToken";

export const handleApiError = async (error: any) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        const { status, data } = error.response;

        // console.log(error.config.url);

        // console.log(status, data);

        // errorToast(
        //     error.config.url,
        //     `status: ${status} - data: ${data.message}`
        // );

        const message = data?.message || data?.error || "Something went wrong!";
console.log(message,status,"::::::::::::::",error?.config?.url)
        if (status === 401) {
            const token = await getAuthToken();

            if (token != null && token?.trim() !== "")
                errorToast("Session expired", "Please log in again.");

            await deleteAuthToken();
            store.dispatch(setUser(null));
            store.dispatch(setIsAuthenticated(false));

            if (error?.config?.url !== "/user/auth") router.replace("/login");
        } else if (status === 500) {
            errorToast("Server Error", "Something went wrong on our side.");
        } else {
            // Ignore errors for specific endpoints or messages where empty states are expected
            const isExpectedEmptyState =
                (status === 404 || status === 400 || status === 200) &&
                (error?.config?.url?.includes("/store/sync-saved") ||
                    error?.config?.url?.includes("/store/search") ||
                    error?.config?.url?.includes("/user/orders") ||
                    error?.config?.url?.includes("cid=") ||
                    message?.toLowerCase()?.includes("not found") ||
                    message?.toLowerCase()?.includes("no saved stores") ||
                    message?.toLowerCase()?.includes("no results"));

            if (isExpectedEmptyState) {
                // Do nothing
            } else {
                errorToast("Oops!", message);
            }
        }
    } else if (error.request) {
        errorToast("Network Error", "Unable to connect to the server.");
    } else {
        errorToast("Error", error.message || "Unknown error");
    }
};
