import CustomImage from "@/components/common/CustomImage";
import IMAGES from "@/constants/images.contant";
import { ScrollView, Text } from "react-native";

export default function MyBookings() {
    return (
        <ScrollView contentContainerClassName="min-h-full flex-1 bg-secondary gap-6 pb-20">
            <CustomImage
                image={IMAGES.WelcomeImage}
                className="w-full aspect-square"
            />

            <Text className="text-primary font-pBold text-3xl self-center">
                My Bookings
            </Text>
        </ScrollView>
    );
}
