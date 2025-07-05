import useAuth from "@/hooks/useAuth.hook";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
    const [fontsLoaded, fontsError] = useFonts({
        "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
        "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    });

    const { isAuthLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthLoading) return;

        if (fontsLoaded || fontsError) {
            SplashScreen.hideAsync();
        }
    }, [isAuthLoading, fontsLoaded, fontsError]);

    if (isAuthLoading || (!fontsLoaded && !fontsError)) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1">
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />

                {/* <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected> */}
            </Stack>
        </SafeAreaView>
    );
}
