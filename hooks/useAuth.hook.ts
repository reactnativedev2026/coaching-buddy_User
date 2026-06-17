import { auth } from "@/api/users.api";
import { setIsAuthenticated, setUser } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
// import useNetwork from "./useNetwork.hook";

export default function useAuth() {
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const dispatch = useAppDispatch();
    // const { isConnected } = useNetwork();


    useEffect(() => {
        // if (isConnected == null || isConnected === false) return;
        setIsAuthLoading(true);

        (async function () {
            try {
                const res = await auth();
                if (res.data != null) {
                    dispatch(setUser(res.data));
                    console.log("User authenticated successfully");
                    console.log(res.data);
                    dispatch(setIsAuthenticated(true));
                }
            } catch (error) {
                dispatch(setUser(null));
                dispatch(setIsAuthenticated(false));
            } finally {
                setIsAuthLoading(false);
            }
        })();
    }, []);

    return { isAuthLoading };
}
