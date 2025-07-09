import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";

type CustomHeaderPropsType = {
    title: string;
};

export default function CustomHeader({ title }: CustomHeaderPropsType) {
    return (
        <View className="bg-accent1 items-center justify-center px-4 py-6">
            <CustomButton
                onPress={() => {
                    if (router.canGoBack()) router.back();
                }}
                className="absolute left-2 p-6"
            >
                <Ionicons name="arrow-back-outline" size={24} color="#fff" />
            </CustomButton>

            <Text className="text-secondary text-lg font-pSemiBold text-center">
                {title}
            </Text>
        </View>
    );
}
