import CustomButton from "@/components/common/CustomButton";
import CustomImage from "@/components/common/CustomImage";
import IMAGES from "@/constants/images.contant";
import useNetwork from "@/hooks/useNetwork.hook";
import errorToast from "@/lib/errorToast";
import { useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function Offline() {
    const router = useRouter();
    const { isConnected } = useNetwork();

    function handleTryAgain() {
        if (isConnected) router.replace("/home");
        else errorToast("Oops you are still offline! 🌐❌");
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="min-h-full px-4 py-2 bg-secondary items-center justify-center gap-6"
        >
            <CustomImage
                image={IMAGES.OfflineImage}
                className="w-full aspect-square"
                imageClassName="min-w-full min-h-full"
            />

            <Text className="text-primary font-pSemiBold text-lg text-center">
                No Internet Connection
            </Text>

            <Text className="text-primary/50 text-sm font-pSemiBold text-center">
                Please check your Wi-Fi or mobile data connection. The app
                requires an internet connection to function properly.
            </Text>

            <Text className="text-primary/50 text-sm text-center font-pSemiBold">
                If problems persist after reconnecting, please restart the app.
            </Text>

            <CustomButton
                className="bg-accent1 rounded-lg px-6 py-4 items-center justify-center"
                onPress={handleTryAgain}
            >
                <Text className="text-secondary text-sm font-pSemiBold">
                    Try Again
                </Text>
            </CustomButton>
        </ScrollView>
    );
}
