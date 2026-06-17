import { Href, router } from "expo-router";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import CustomButton from "../common/CustomButton";

type ProfileOptionPropsType = {
    icon: ReactNode;
    title: string;
    href?: Href;
    handleOnPress?: () => void;
    isLogout?: boolean;
    containerColor?: string;
    textColor?: string;
};

export default function ProfileOption({
    icon,
    title,
    href,
    handleOnPress,
    isLogout = false,
    containerColor = "bg-gray-200",
    textColor = "text-primary",
}: ProfileOptionPropsType) {
    return (
        <CustomButton
            onPress={() => {
                if (href != null) router.push(href);
                else if (handleOnPress != null) handleOnPress();
            }}
            debounce
            className="flex-row items-center gap-4 py-1"
        >
            {/* ICON CONTAINER */}
            <View
                className={`w-10 h-10 rounded-2xl items-center justify-center ${containerColor}`}
            >
                {icon}
            </View>

            {/* TITLE */}
            <Text
                className={`text-[14px] font-pMedium ${
                    isLogout ? "text-red-700" : textColor
                }`}
            >
                {title}
            </Text>
        </CustomButton>
    );
}