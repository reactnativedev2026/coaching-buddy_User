import { login } from "@/api/users.api";
import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
import FormField from "@/components/common/FormField";
import errorToast from "@/lib/errorToast";
import successToast from "@/lib/successToast";
import { emailValidation } from "@/lib/validation";
import { setIsLoading, setUser } from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.user);
    const navigation = useNavigation();

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
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <KeyboardAvoidingView className="flex-1 bg-[#f5f5f5]" behavior="padding">
            <CustomHeader title="Coaching Buddy" />
            <ScrollView contentContainerClassName="flex-grow justify-center px-4">

                {/* CARD */}
                <View className="bg-white rounded-2xl p-6 shadow-md">

                    {/* TITLE */}
                    <Text className="text-center text-4xl font-pBold text-primary leading-[42px]">
                        Login
                    </Text>

                    <Text className="text-center text-gray-500 mt-2 mb-6">
                        Enter your email address to continue
                    </Text>

                    {/* INPUT */}
                    <FormField
                        label="EMAIL ADDRESS"
                        placeholder="yourname@gmail.com"
                        value={email}
                        handleChangeText={setEmail}
                        inputType="email-address"
                    />

                    {/* BUTTON */}
                    <CustomButton
                        className="bg-[#0B1F3A] rounded-xl items-center justify-center py-4 mt-6"
                        disabled={isLoading}
                        onPress={handleLogin}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className="text-white font-pSemiBold text-base">
                                Continue →
                            </Text>
                        )
                        }
                    </CustomButton>
                    <View className="h-0.5 bg-gray-200 mt-8 mb-8" />

                    <View className="items-center mt-6">
                        <Text className="text-center text-xs text-gray-400">
                            By continuing, you agree to Coaching Buddy's
                        </Text>

                        <View className="flex-row flex-wrap justify-center mt-1">
                            <TouchableOpacity
                                onPress={() => router.push("/terms")}
                            >
                                <Text className="text-xs underline font-pBold text-black">
                                    Terms & Conditions
                                </Text>
                            </TouchableOpacity>

                            <Text className="text-xs text-gray-400"> and </Text>

                            <TouchableOpacity
                                onPress={() => router.push("/privacypolicy")}
                            >
                                <Text className="text-xs underline font-pBold text-black">
                                    Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* ENCRYPTION BADGE */}
                <View className="bg-gray-200 rounded-full px-4 py-2 mt-6 self-center flex-row items-center gap-2">
                    <View className="w-2 h-2 bg-blue-500 rounded-full" />
                    <Text className="text-xs text-gray-600">
                        SECURE 256-BIT ENCRYPTION
                    </Text>
                </View>

                {/* FOOTER */}
                <Text className="text-center text-xs text-gray-400 mt-6">
                    © 2026 ADVAMINDS EDUSERVE PVT. LTD.
                </Text>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}