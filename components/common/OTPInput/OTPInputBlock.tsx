import { Text, View } from "react-native";

type OTPInputBlockPropsType = {
    isActive: boolean;
    value: string;
};

export default function OTPInputBlock({
    isActive,
    value,
}: OTPInputBlockPropsType) {
    return (
        <View
            className={`w-16 aspect-square rounded-lg pointer-events-none items-center justify-center bg-secondary3 ${
                isActive
                    ? "border-2 border-accent1"
                    : "border-2 border-accent1/50"
            }`}
        >
            <Text
                className={`text-2xl ${
                    isActive && value.length === 0
                        ? "text-accent1"
                        : "text-primary font-pSemiBold"
                }`}
            >
                {isActive && value.length === 0 ? "|" : value}
            </Text>
        </View>
    );
}
