import content from "@/locales/en/homeHeader.json";
import { useAppSelector } from "@/redux/store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomImage from "../common/CustomImage";

export default function HomeHeader() {
    const { user, isAuthenticated } = useAppSelector((state) => state.user);

    return (
        <View className="bg-accent1 px-4 py-6 gap-4">
            <View className="flex-row items-center justify-between">

                {/* LEFT SIDE */}
                <View className="flex-row items-center gap-4">
                    <CustomImage
                        image={require("@/assets/images/appIcon.png")}
                        className="w-16 h-16"
                        imageClassName="w-full h-full"
                    />

                    <View>
                        <Text className="text-secondary text-xl font-pSemiBold">
                            {content.heading}
                        </Text>

                        <Text className="text-secondary text-lg font-pSemiBold">
                            {user?.name != null ? user.name : "Guest"}
                        </Text>
                    </View>
                </View>

                {/* RIGHT ICON */}
                <CustomButton
                    onPress={() => {
                        if (!isAuthenticated) {
                            router.push("/login");
                            return;
                        }

                        // router.push("/profile");
                    }}
                    className="p-2"
                >
                    <MaterialCommunityIcons
                        name="bell-outline"
                        size={32}
                        color="#fff"
                    />
                </CustomButton>

            </View>
        </View>
    );
}