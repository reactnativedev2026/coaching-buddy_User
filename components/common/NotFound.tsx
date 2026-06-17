import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";

type NotFoundPropsType = {
    heading: string;
    body: string;
    isHideGoBack?: boolean;
};

export default function NotFound({
    heading,
    body,
    isHideGoBack = false,
}: NotFoundPropsType) {
    return (
        <View className="flex-1 items-center justify-center px-6 bg-secondary">
            <MaterialIcons
                name="error-outline"
                size={96}
                color="#FF5A5F"
                style={{ marginBottom: 24 }}
            />

            <Text className="text-primary font-pBold text-2xl text-center mb-2">
                {heading || "Oops! Page not found"}
            </Text>

            <Text className="text-primary font-pMedium text-base text-center mb-6 opacity-80">
                {body ||
                    "The page you’re looking for doesn’t exist or has been moved."}
            </Text>

            {!isHideGoBack && (
                <CustomButton
                    onPress={() => {
                        if (router.canGoBack()) router.back();
                        else router.replace("/home");
                    }}
                    className="px-6 py-3 rounded-lg bg-accent1"
                    debounce
                >
                    <Text className="text-secondary text-sm font-pSemiBold">
                        Go Back
                    </Text>
                </CustomButton>
            )}
        </View>
    );
}
