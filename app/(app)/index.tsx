import content from "@/locales/en/welcome.json";
import { setIsOnboarding } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Welcome() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.replace("/home");
            dispatch(setIsOnboarding(false));
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <View className="flex-1 bg-secondary">

            {/* CENTER CONTENT */}
            <View className="items-center flex-1 justify-center">
                <Image
                    source={require("@/assets/images/adaptive-icon.png")}
                    style={{ width: 250, height: 250 }}
                />

                <View className="gap-6 px-4">
                    <View className="items-center px-4 gap-2">
                        <Text className="text-accent4 font-pBold text-3xl">
                            {content.heading1}
                        </Text>

                        <Text className="text-primary text-center text-md leading-6">
                            {content.heading2}
                        </Text>
                    </View>
                </View>
            </View>

            {/* FOOTER */}
            <View className="pb-8 items-center">
                <View
                    style={{
                        width: 50,
                        height: 1,
                        backgroundColor: "#D1D5DB",
                        marginBottom: 12,
                    }}
                />

                <Text
                    style={{
                        fontSize: 12,
                        color: "#9CA3AF",
                        letterSpacing: 0.5,
                    }}
                >
                    © 2026 ADVAMINDS EDUSERVE PVT. LTD.
                </Text>
            </View>
        </View>
    );
}
