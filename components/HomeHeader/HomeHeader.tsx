import IMAGES from "@/constants/images.contant";
import content from "@/locales/en/homeHeader.json";
import { useAppSelector } from "@/redux/store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomImage from "../common/CustomImage";
import SearchBar from "../common/SearchBar";

export default function HomeHeader() {
    const { user } = useAppSelector((state) => state.user);

    return (
        <View className="bg-secondary px-4 py-6 gap-4">
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-primary/50 text-xl font-pSemiBold">
                        {content.heading}
                    </Text>

                    <Text className="text-primary text-lg font-pSemiBold">
                        {user?.name != null ? user.name : "Guest"}
                    </Text>
                </View>

                <CustomButton
                    onPress={() => router.push("/profile")}
                    debounce
                    debounceTime={2000}
                >
                    {user?.avatarName != null ? (
                        <CustomImage
                            image={IMAGES[user.avatarName ?? "EduBee"]}
                            className="w-20 aspect-square rounded-full bg-primary/10"
                            imageClassName="w-full h-full"
                        />
                    ) : (
                        <View className="w-20 aspect-square p-2 items-center justify-center rounded-full bg-secondary shadow-md">
                            <FontAwesome5
                                name="user-alt"
                                size={28}
                                color="black"
                            />
                        </View>
                    )}
                </CustomButton>
            </View>

            {/* search bar */}
            <SearchBar />
        </View>
    );
}
