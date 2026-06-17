import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export default function useNetwork() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const online = state.isConnected && state.isInternetReachable;

            setIsConnected(online);
        });

        return () => unsubscribe();
    }, []);

    return { isConnected };
}
