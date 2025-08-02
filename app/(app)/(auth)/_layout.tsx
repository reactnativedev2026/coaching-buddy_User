import { useAppSelector } from "@/redux/store";
import { router, Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function AuthLayout() {
    const pathname = usePathname();
    const { isAuthenticated } = useAppSelector((state) => state.user);

    useEffect(() => {
        function backButtonPressHandler() {
            if (pathname === "/login") {
                router.replace("/home");
                return true;
            }

            if (router.canGoBack()) router.back();
            else router.replace("/home");

            return true;
        }

        const backhandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backButtonPressHandler
        );

        return () => backhandler.remove();
    }, [pathname]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="login" />
                <Stack.Screen name="verify-otp" />
                <Stack.Screen name="complete-profile" />
                <Stack.Screen name="account-success" />
            </Stack.Protected>
        </Stack>
    );
}
