import { syncSavedColleges } from "@/api/college.api";
import getSaved from "@/lib/getSaved";
import setSaved from "@/lib/setSaved";
import { setSaved as setSavedRedux } from "@/redux/slices/save.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import SavedType from "@/types/Saved.type";
import { useEffect, useRef, useState } from "react";
import useNetwork from "./useNetwork.hook";

export default function useSyncSavedColleges(isAuthLoading: boolean) {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.user);
    const { saved } = useAppSelector((state) => state.saved);
    const isFirstRender = useRef(true);
    const [isSyncSavedLoading, setIsSyncSavedLoading] = useState(false);
    const { isConnected } = useNetwork();

    useEffect(() => {
        (async () => {
            try {
                const localSaved = await getSaved();

                if (localSaved != null) {
                    dispatch(setSavedRedux(localSaved));
                } else {
                    dispatch(setSavedRedux([]));
                }
            } catch (e) {
                console.error("Error loading local saved colleges:", e);
            }
        })();
    }, []);

    useEffect(() => {
        if (isConnected == null || isConnected === false) return;

        if (isAuthLoading || !isAuthenticated) return;

        setIsSyncSavedLoading(true);

        (async () => {
            try {
                const clientSaved = await getSaved();
                let syncData: string[] = [];

                if (clientSaved != null) {
                    syncData = clientSaved.map((item) => item.id);
                }

                const res = await syncSavedColleges(syncData);

                if (res.data != null && res.data.length > 0) {
                    const savedData: SavedType[] = res.data.map((item) => {
                        const categoryName = item.categories.at(-1)?.name!;

                        return {
                            id: item.uid,
                            name: item.name,
                            image: item.images.cover[0]?.path ?? "",
                            address: {
                                area: item.address.area,
                                city: item.address.city,
                                state: item.address.state,
                                nearBy: item.address.near_by,
                                pincode: item.address.pincode,
                            },
                            categoryName,
                        };
                    });

                    dispatch(setSavedRedux(savedData));
                } else {
                    dispatch(setSavedRedux([]));
                }
            } catch (error) {
                // console.error("use sync saved colleges:", error);
            } finally {
                setIsSyncSavedLoading(false);
            }
        })();
    }, [isConnected, isAuthLoading, isAuthenticated]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        (async () => {
            await setSaved(saved);
        })();
    }, [saved]);

    return { isSyncSavedLoading };
}
