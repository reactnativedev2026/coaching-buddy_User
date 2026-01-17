import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    Text,
    View,
} from "react-native";

type LoaderPropsType = {
    message?: string;
    size?: ActivityIndicatorProps["size"];
    fullscreen?: boolean;
};

export default function Loader({
    message = "Loading...",
    size = "large",
    fullscreen = false,
}: LoaderPropsType) {
    const blurIntensity = 60;
    const blurTint: "light" | "dark" | "default" = "dark"; // ✅ safe literal

    const Container = fullscreen ? BlurView : View;
    const containerProps = fullscreen
        ? {
              intensity: blurIntensity,
              tint: blurTint,
              className: "flex-1 justify-center items-center px-4",
          }
        : {
              className: "items-center px-4 py-2",
          };

    return (
        <Container {...containerProps}>
            <View className="w-20 h-20 rounded-2xl justify-center items-center shadow-lg bg-white/10 backdrop-blur-md">
                <View className="rounded-2xl overflow-hidden">
                    <LinearGradient
                        colors={["#0d9488", "#6C63FF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="p-3 rounded-full"
                    >
                        <ActivityIndicator size={size} color="#ffffff" />
                    </LinearGradient>
                </View>
            </View>
            <Text className="text-sm text-white mt-4 font-pSemiBold">
                {message}
            </Text>
        </Container>
    );
}
