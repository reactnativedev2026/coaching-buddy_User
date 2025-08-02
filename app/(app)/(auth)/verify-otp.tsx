import { resendOTP, verifyOTP } from "@/api/users.api";
import CustomButton from "@/components/common/CustomButton";
import CustomImage from "@/components/common/CustomImage";
import OTPInput from "@/components/common/OTPInput/OTPInput";
import IMAGES from "@/constants/images.contant";
import formatTimer from "@/lib/formatTimer";
import setAuthToken from "@/lib/setAuthToken";
import successToast from "@/lib/successToast";
import content from "@/locales/en/verifyOtp.json";
import {
    setIsAuthenticated,
    setIsLoading,
    setUser,
} from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

// 30 seconds
const RESEND_TIME = 30;

export default function VerifyOtp() {
    const dispatch = useAppDispatch();
    const [timer, setTimer] = useState(RESEND_TIME);
    const [isResendOTP, setIsResendOTP] = useState(true);
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
        if (user == null) return;

        try {
            dispatch(setIsLoading(true));

            const res = await verifyOTP(otp, user.id);

            successToast(res.message);

            if (res.data != null) {
                dispatch(setUser(res.data.user));

                if (res.data.token != null) {
                    await setAuthToken(res.data.token);
                    dispatch(setIsAuthenticated(true));
                }

                if (res.data.isNew) router.replace("/complete-profile");
                else {
                    // setTimeout(() => {
                    //     router.replace("/home");
                    // }, 100);
                }
            }
        } catch (error) {
            // console.error("Verify OTP error ", error);
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    async function handleResendOTP() {
        if (user == null) return;

        setTimerRestartKey((prev) => prev + 1);
        setTimer(RESEND_TIME);
        setIsResendOTP(true);

        try {
            dispatch(setIsLoading(true));

            const res = await resendOTP(user.id);

            successToast(res.message);
        } catch (error) {
            // console.error("Resend OTP error ", error);
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

                    <OTPInput
                        isLoading={isLoading}
                        handleVerifyOTP={handleVerifyOtp}
                        isResendOTP={isResendOTP}
                        setIsResendOTP={setIsResendOTP}
                    />
                </View>

                <View
                    className={
                        "flex-row items-center mx-auto px-2 justify-between w-3/4 mt-4"
                    }
                >
                    <Text className="text-md font-pRegular text-accent1">
                        Didn't get the OTP?
                    </Text>

                    <View className="flex-row">
                        {timer === 0 ? (
                            <CustomButton
                                onPress={handleResendOTP}
                                disabled={timer !== 0 || isLoading}
                            >
                                <Text className="text-base font-pSemiBold text-accent2 underline">
                                    Resend
                                </Text>
                            </CustomButton>
                        ) : (
                            <Text className="text-base font-pSemiBold text-accent2 opacity-50 underline">
                                {formatTimer(timer)}
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
