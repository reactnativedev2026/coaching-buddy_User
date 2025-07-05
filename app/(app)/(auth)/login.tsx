import { login } from "@/api/users.api";
import CustomButton from "@/components/common/CustomButton";
import CustomImage from "@/components/common/CustomImage";
import FormField from "@/components/common/FormField";
import IMAGES from "@/constants/images.contant";
import errorToast from "@/lib/errorToast";
import successToast from "@/lib/successToast";
import { emailValidation } from "@/lib/validation";
import content from "@/locales/en/login.json";
import { setIsLoading, setUser } from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.user);

    async function handleLogin() {
        if (!emailValidation.regex.test(email)) {
            errorToast(emailValidation.message1);
            return;
        }

        try {
            dispatch(setIsLoading(true));

            const res = await login(email);

            successToast(res.message);

            if (res.data != null) {
                dispatch(
                    setUser({
                        email,
                        id: res.data.userId,
                    })
                );
            }

            router.replace("/verify-otp");
        } catch (error) {
            // console.error("Login error ", error);
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <KeyboardAvoidingView className="flex-1" behavior="padding">
            <ScrollView contentContainerClassName="min-h-full bg-secondary gap-6 pb-20">
                <CustomImage
                    image={IMAGES.LoginImage}
                    className="w-full aspect-square"
                />

                <View className="px-4 gap-6">
                    <Text className="text-primary font-pSemiBold text-lg">
                        {content.heading}
                    </Text>

                    <FormField
                        label={content.emailFieldLabel}
                        placeholder={content.emailFieldPlaceholder}
                        value={email}
                        handleChangeText={setEmail}
                        inputType="email-address"
                    />
                </View>

                <CustomButton
                    className="bg-accent1 rounded-full items-center justify-center px-6 py-3 w-11/12 self-center mt-2 disabled:opacity-50"
                    disabled={isLoading}
                    onPress={handleLogin}
                >
                    <Text className="text-secondary font-pSemiBold">
                        {content.buttonText}
                    </Text>
                </CustomButton>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
