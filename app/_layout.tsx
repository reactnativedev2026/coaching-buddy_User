import { CustomToast } from "@/components/CustomToast/CustomToast";
import ReduxProvider from "@/context/Redux.context";
import "@/global.css";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <GestureHandlerRootView className="flex-1">
            <ReduxProvider>
                <Slot />
                <CustomToast />
            </ReduxProvider>
        </GestureHandlerRootView>
    );
}
