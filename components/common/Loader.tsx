import { BlurView } from "expo-blur";
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    Text,
    useColorScheme,
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
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const Container = fullscreen ? BlurView : View;
    
    // Using a safe fallback cast for BlurView props
    const containerProps: any = fullscreen
        ? {
              intensity: 80,
              tint: (isDark ? "dark" : "light") as any,
              className: "flex-1 justify-center items-center w-full h-full",
          }
        : {
              className: "items-center px-4 py-4",
          };

    return (
        <Container {...containerProps}>
            <View 
                className={`w-32 h-32 rounded-3xl justify-center items-center shadow-lg ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 5,
                }}
            >
                <ActivityIndicator size={size} color="#009688" style={{ transform: [{ scale: 1.2 }] }} />
                
                {message ? (
                    <Text className={`text-xs mt-4 font-pSemiBold text-center px-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {message}
                    </Text>
                ) : null}
            </View>
        </Container>
    );
}
