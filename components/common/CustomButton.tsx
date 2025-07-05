import { useRef } from "react";
import {
    GestureResponderEvent,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

type CustomButtonProps = TouchableOpacityProps & {
    debounceTime?: number;
    debounce?: boolean;
};

export default function CustomButton({
    onPress,
    debounceTime = 3000,
    debounce = false,
    ...props
}: CustomButtonProps) {
    const lastPress = useRef<number>(0);

    const handlePress = (event: GestureResponderEvent) => {
        const now = Date.now();

        if (debounce && now - lastPress.current < debounceTime) return;

        lastPress.current = now;
        onPress?.(event);
    };

    return <TouchableOpacity onPress={handlePress} {...props} />;
}
