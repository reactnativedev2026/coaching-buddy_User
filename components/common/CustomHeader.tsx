import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";

type CustomHeaderPropsType = {
    title: string;
    rightIconName?: string;
    onRightPress?: () => void;
};
export default function CustomHeader({
    title,
    rightIconName,
    onRightPress,
}: CustomHeaderPropsType) {
    return (
        <View className="bg-accent1 px-4 py-6 flex-row items-center justify-between">

            {/* LEFT SIDE (Back + Title) */}
            <View className="flex-row items-center">
                <CustomButton
                    onPress={() => {
                        if (router.canGoBack()) router.back();
                    }}
                    className="p-2 mr-2"
                >
                    <Ionicons name="arrow-back-outline" size={24} color="#fff" />
                </CustomButton>

                <Text className="text-secondary text-lg font-pSemiBold">
                    {title}
                </Text>
            </View>

            {/* RIGHT ICON */}
            {rightIconName ? (
                <CustomButton onPress={onRightPress} className="p-2">
                    <MaterialCommunityIcons
                        name={rightIconName as any}
                        size={24}
                        color="#fff"
                    />
                </CustomButton>
            ) : (
                <View className="w-8" />
            )}
        </View>
    );
}