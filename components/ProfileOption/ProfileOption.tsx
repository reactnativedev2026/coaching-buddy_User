import { Href, router } from "expo-router";
import { ReactNode } from "react";
import { Text } from "react-native";
import CustomButton from "../common/CustomButton";

type ProfileOptionPropsType = {
    icon: ReactNode;
    title: string;
    href?: Href;
    handleOnPress?: () => void;
};

export default function ProfileOption({
    icon,
    title,
    href,
    handleOnPress,
}: ProfileOptionPropsType) {
    return (
        <CustomButton
            onPress={() => {
                if (href != null) router.push(href);
                else if (handleOnPress != null) handleOnPress();
            }}
            debounce
            className="flex-row items-center gap-4 px-4 py-2 rounded-lg"
        >
            {icon}

            <Text className="text-primary font-pRegular">{title}</Text>
        </CustomButton>
    );
}
