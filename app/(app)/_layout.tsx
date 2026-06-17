import Loader from "@/components/common/Loader";
import useAuth from "@/hooks/useAuth.hook";
import useNetwork from "@/hooks/useNetwork.hook";
import useSyncSavedColleges from "@/hooks/useSyncSavedColleges.hook";
import { useAppSelector } from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Offline from "./offline";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
      const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
    const [fontsLoaded, fontsError] = useFonts({
        "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
        "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    });

    const { isAuthLoading } = useAuth();
    const { isSyncSavedLoading } = useSyncSavedColleges(isAuthLoading);
    const { isConnected } = useNetwork();
    const { isAuthenticated, isOnboarding } = useAppSelector(
        (state) => state.user
    );

    const isReady =
        !isAuthLoading &&
        !isSyncSavedLoading &&
        (fontsLoaded || fontsError) &&
        isConnected !== null;

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return <Loader fullscreen />;
    }

    if (isConnected === false) {
        return <Offline />;
    }

    return (
        <SafeAreaView className="flex-1">
            <StatusBar
          backgroundColor={isDark ? "#1e1e1e" : "#ffffff"}
          barStyle={isDark ? "light-content" : "dark-content"}
        />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name={isOnboarding ? "index" : "(tabs)"} />

                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
            </Stack>
        </SafeAreaView>
    );
}
