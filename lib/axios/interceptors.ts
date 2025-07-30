import { setIsAuthenticated, setUser } from "@/redux/slices/user.slice";
import store from "@/redux/store";
import { router } from "expo-router";
import deleteAuthToken from "../deleteAuthToken";
import errorToast from "../errorToast";

export const handleApiError = async (error: any) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        const { status, data } = error.response;

        // console.log(error.config.url);
        // console.log(status, data);

        const message =
            data?.message ||
            data?.error ||
            "Something went wrong on the server.";

        if (status === 401) {
            errorToast("Session expired", "Please log in again.");

            await deleteAuthToken();
            store.dispatch(setUser(null));
            store.dispatch(setIsAuthenticated(false));

            if (error?.config?.url !== "/user/auth") router.replace("/login");
        } else if (status === 500) {
            errorToast("Server Error", "Something went wrong on our side.");
        } else {
            errorToast("Error", message);
        }
    } else if (error.request) {
        // Request was made but no response received
        errorToast("Network Error", "Unable to connect to the server.");
    } else {
        errorToast("Error", error.message || "Unknown error");
    }
};
