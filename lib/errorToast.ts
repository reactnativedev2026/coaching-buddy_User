import Toast from "react-native-toast-message";

export default function errorToast(
    text1: string,
    text2: string | undefined = undefined,
    position: "bottom" | "top" = "top"
) {
    Toast.show({
        type: "error",
        text1,
        text2,
        position,
    });
}
