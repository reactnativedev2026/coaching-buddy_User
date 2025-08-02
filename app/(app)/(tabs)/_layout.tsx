import Loader from "@/components/common/Loader";
import CustomTabBar from "@/components/CustomTabBar/CustomTabBar";
import { useAppSelector } from "@/redux/store";
import { router, Tabs, useSegments } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
    const { isAuthenticated } = useAppSelector((state) => state.user);
    const segments = useSegments();

    useEffect(() => {
        if (
            !isAuthenticated &&
            segments[1] === "(tabs)" &&
            segments[2] !== "home"
        ) {
            router.push("/login");
        }
    }, [segments, isAuthenticated]);

    if (!isAuthenticated && segments[1] === "(tabs)" && segments[2] !== "home")
        return <Loader fullscreen />;

    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="home" />

            <Tabs.Screen name="booking" />

            <Tabs.Screen name="favorite" />

            <Tabs.Screen
                name="(profile)"
                options={{
                    tabBarLabel: "Profile",
                }}
            />
        </Tabs>
    );
}
