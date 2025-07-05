import Toast from "react-native-toast-message";

export default function successToast(
    text1: string,
    text2: string | undefined = undefined,
    position: "bottom" | "top" = "top"
) {
    Toast.show({
        type: "success",
        text1,
        text2,
        position,
    });
}
