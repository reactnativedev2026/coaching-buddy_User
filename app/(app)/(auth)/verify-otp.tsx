import { resendOTP, verifyOTP } from "@/api/users.api";
import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
import OTPInput from "@/components/common/OTPInput/OTPInput";
import formatTimer from "@/lib/formatTimer";
import setAuthToken from "@/lib/setAuthToken";
import successToast from "@/lib/successToast";
import {
    setIsAuthenticated,
    setIsLoading,
    setUser,
} from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// 30 seconds
const RESEND_TIME = 30;

export default function VerifyOtp() {
    const dispatch = useAppDispatch();

    const [timer, setTimer] = useState(RESEND_TIME);
    const [isResendOTP, setIsResendOTP] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);

    const { user, isLoading } = useAppSelector((state) => state.user);

    const startTimeRef = useRef<number | null>(null);
    const [timerRestartKey, setTimerRestartKey] = useState(0);

    useEffect(() => {
        startTimeRef.current = Date.now();

        const intervalId = setInterval(() => {
            if (startTimeRef.current === null) return;

            const elapsed = Math.floor(
                (Date.now() - startTimeRef.current) / 1000
            );

            const remaining = RESEND_TIME - elapsed;

            if (remaining <= 0) {
                clearInterval(intervalId);
                setTimer(0);
            } else {
                setTimer(remaining);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timerRestartKey]);

    async function handleVerifyOtp(otp: string) {
        if (user == null || isNavigating) return;

        try {
            setIsNavigating(true);
            dispatch(setIsLoading(true));

            const res = await verifyOTP(otp, user.id);

            successToast(res.message);

            if (res.data != null) {
                dispatch(setUser(res.data.user));
                console.log("OTP verified successfully");
                console.log(res.data.user);

                if (res.data.token != null) {
                    await setAuthToken(res.data.token);
                }

                if (!res.data?.isNew) {
                    dispatch(setIsAuthenticated(true));
                }

                setTimeout(() => {
                    if (res.data!.isNew) {
                        router.replace("/complete-profile");
                    } else {
                        router.replace("/home");
                    }
                }, 200);
            }
        } catch {
            setIsNavigating(false);
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    async function handleResendOTP() {
        if (user == null || isNavigating) return;

        setTimerRestartKey((prev) => prev + 1);
        setTimer(RESEND_TIME);
        setIsResendOTP(true);

        try {
            dispatch(setIsLoading(true));

            const res = await resendOTP(user.id);

            successToast(res.message);
        } catch {
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-[#f5f5f5]"
            behavior="padding"
        >
            <CustomHeader
                title="Coaching Buddy"
            />

            <ScrollView
                contentContainerClassName="flex-grow justify-center px-4"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* CARD */}
                <View className="bg-white rounded-2xl p-6 shadow-md">

                    {/* TITLE */}
                    <Text className="text-center text-4xl font-pBold text-primary leading-[42px]">
                        Verify OTP
                    </Text>

                    <Text className="text-center text-gray-500 mt-2 mb-6">
                        Enter the OTP sent to your email
                    </Text>

                    {/* OTP INPUT */}
                    <OTPInput
                        isLoading={isLoading || isNavigating}
                        handleVerifyOTP={handleVerifyOtp}
                        isResendOTP={isResendOTP}
                        setIsResendOTP={setIsResendOTP}
                    />

                    {/* VERIFY BUTTON LOADER */}
                    {(isLoading || isNavigating) && (
                        <View className="mt-6 items-center">
                            <ActivityIndicator size="small" color="#0B1F3A" />
                        </View>
                    )}

                    {/* DIVIDER */}
                    <View className="h-0.5 bg-gray-200 mt-8 mb-6" />

                    {/* RESEND */}
                    <View className="flex-row items-center justify-center gap-2">
                        <Text className="text-sm text-gray-500">
                            Didn’t receive OTP?
                        </Text>

                        {timer === 0 ? (
                            <CustomButton
                                onPress={handleResendOTP}
                                disabled={
                                    timer !== 0 ||
                                    isLoading ||
                                    isNavigating
                                }
                            >
                                <Text className="text-sm font-pSemiBold text-[#0B1F3A] underline">
                                    Resend
                                </Text>
                            </CustomButton>
                        ) : (
                            <Text className="text-sm font-pSemiBold text-[#0B1F3A] opacity-50 underline">
                                {formatTimer(timer)}
                            </Text>
                        )}
                    </View>

                    {/* TERMS */}
                    <View className="items-center mt-6">
                        <Text className="text-center text-xs text-gray-400">
                            By continuing, you agree to Coaching Buddy&apos;s
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