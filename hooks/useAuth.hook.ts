import { auth } from "@/api/users.api";
import { setIsAuthenticated, setUser } from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.user);

    useEffect(() => {
        setIsAuthLoading(true);

        (async function () {
            try {
                const res = await auth();

                if (res.data != null) {
                    dispatch(setUser(res.data));
                    dispatch(setIsAuthenticated(true));
                }
            } catch (error) {
                // console.error("Auth error ", error);
                dispatch(setUser(null));
                dispatch(setIsAuthenticated(false));
            } finally {
                setIsAuthLoading(false);
            }
        })();
    }, []);

    return { isAuthLoading, isAuthenticated };
}
