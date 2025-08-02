import CustomButton from "@/components/common/CustomButton";
import CustomImage from "@/components/common/CustomImage";
import IMAGES from "@/constants/images.contant";
import content from "@/locales/en/welcome.json";
import { setIsOnboarding } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Welcome() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.replace("/home");
            dispatch(setIsOnboarding(false));
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <ScrollView contentContainerClassName="min-h-full flex-1 bg-secondary gap-6 pb-20">
            <CustomImage
                image={IMAGES.WelcomeImage}
                className="w-full aspect-square"
            />

            <View className="gap-6 px-4">
                <View className="items-center px-4 gap-2">
                    <Text className="text-accent1 font-pBold text-3xl">
                        {content.heading1}
                    </Text>
                    <Text className="text-primary font-pBold text-center text-lg leading-6">
                        {content.heading2}
                    </Text>
                </View>

                <Text className="text-primary font-pRegular text-sm text-center">
                    {content.body}
                </Text>
            </View>

            <CustomButton
                className="bg-accent1 self-center w-14 aspect-square rounded-full items-center justify-center mt-auto"
                debounce
                onPress={() => {
                    dispatch(setIsOnboarding(false));
                    router.push("/home");
                }}
            >
                <FontAwesome5 name="arrow-right" size={24} color="#fff" />
            </CustomButton>
        </ScrollView>
    );
}
