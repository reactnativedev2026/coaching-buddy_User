import CustomButton from "@/components/common/CustomButton";
import content from "@/locales/en/accountSuccess.json";
import { useAppSelector } from "@/redux/store";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AccountSuccess() {
    const { user } = useAppSelector((state) => state.user);

    return (
        <ScrollView contentContainerClassName="min-h-full flex-1 bg-secondary pt-20 pb-4 justify-between">
            <View className="gap-6">
                <View className="bg-accent1 rounded-full w-32 aspect-square items-center justify-center self-center">
                    <Feather name="check" size={56} color="#fff" />
                </View>

                <View className="gap-6 px-4 items-center border-b-2 border-dashed border-primary/50 pb-10">
                    <Text className="text-primary font-pBold text-3xl">
                        {content.heading}
                    </Text>

                    <Text className="text-primary font-pSemiBold text-sm">
                        {new Date().toDateString()}
                    </Text>
                </View>

                <CustomButton
                    className="px-6 py-4 flex-row items-center gap-4"
                    onPress={() => router.push("/home")}
                >
                    <View className="w-16 aspect-square rounded-full bg-accent1/50 p-2 items-center justify-center">
                        <FontAwesome5 name="user-alt" size={24} color="#000" />
                    </View>

                    <View className="">
                        <Text className="text-primary font-pSemiBold text-sm underline">
                            {user?.name}
                        </Text>
                        <Text className="text-primary/50 font-pSemiBold text-xs">
                            Student
                        </Text>
                    </View>

                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={18}
                        color="#666"
                        className="ml-auto"
                    />
                </CustomButton>
            </View>

            <View className="border-t-2 border-primary/10 py-4">
                <CustomButton
                    className="bg-accent1 rounded-full items-center justify-center px-6 py-3 w-11/12 self-center mt-2"
                    onPress={() => router.push("/home")}
                >
                    <Text className="text-secondary font-pSemiBold">
                        {content.buttonText}
                    </Text>
                </CustomButton>
            </View>
        </ScrollView>
    );
}
