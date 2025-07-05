import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Toast, {
    BaseToast,
    ErrorToast,
    InfoToast,
} from "react-native-toast-message";

const colors = {
    primary: "#000",
    secondary: "#fff",
    accent1: "#006EFF", // info/success
    accent2: "#EB001B", // error
    text: "#333",
    subtext: "#666",
};

const commonStyle = {
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 6,
};

const commonText1Style = {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
};

const commonText2Style = {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    opacity: 0.85,
};

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{
                backgroundColor: colors.secondary,
                borderLeftWidth: 0,
                borderRadius: 14,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
                width: "92%",
            }}
            contentContainerStyle={commonStyle}
            renderLeadingIcon={() => (
                <View className="mr-2">
                    <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={colors.accent1}
                    />
                </View>
            )}
            text1Style={{
                ...commonText1Style,
                color: colors.accent1,
            }}
            text2Style={{
                ...commonText2Style,
                color: colors.text,
            }}
        />
    ),

    info: (props: any) => (
        <InfoToast
            {...props}
            style={{
                backgroundColor: colors.secondary,
                borderLeftWidth: 0,
                borderRadius: 14,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
                width: "92%",
            }}
            contentContainerStyle={commonStyle}
            renderLeadingIcon={() => (
                <View className="mr-2">
                    <Ionicons
                        name="information-circle"
                        size={22}
                        color={colors.accent1}
                    />
                </View>
            )}
            text1Style={{
                ...commonText1Style,
                color: colors.accent1,
            }}
            text2Style={{
                ...commonText2Style,
                color: colors.text,
            }}
        />
    ),

    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{
                backgroundColor: colors.secondary,
                borderLeftWidth: 0,
                borderRadius: 14,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
                width: "92%",
            }}
            contentContainerStyle={commonStyle}
            renderLeadingIcon={() => (
                <View className="mr-2">
                    <Ionicons
                        name="close-circle"
                        size={22}
                        color={colors.accent2}
                    />
                </View>
            )}
            text1Style={{
                ...commonText1Style,
                color: colors.accent2,
            }}
            text2Style={{
                ...commonText2Style,
                color: colors.text,
            }}
        />
    ),
};

export function CustomToast() {
    return <Toast config={toastConfig} position="top" />;
}
