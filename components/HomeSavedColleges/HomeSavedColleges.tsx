import { useAppSelector } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import SavedItem from "../SavedItem/SavedItem";
import CustomButton from "../common/CustomButton";

export default function HomeSavedColleges() {
    const { saved } = useAppSelector((state) => state.saved);

    if (saved.length === 0) return null;

    const savedSubList = saved.slice(0, 5);

    return (
        <View className="px-4 py-2">
            <View className="flex-row items-center justify-between">
                <Text className="text-primary text-xl font-pBold">
                    Saved Colleges
                </Text>

                {saved.length > 5 && (
                    <CustomButton
                        className="flex-row items-center gap-2 px-4 py-2"
                        debounce
                        onPress={() => router.push("/favorite")}
                    >
                        <Text className="text-accent1 font-pSemiBold text-sm">
                            See all
                        </Text>

                        <MaterialIcons
                            name="arrow-forward"
                            size={18}
                            color="#006EFF"
                        />
                    </CustomButton>
                )}
            </View>

            <View className="gap-2">
                {savedSubList.map((college, i) => (
                    <SavedItem item={college} key={i} />
                ))}
            </View>
        </View>
    );
}
