import errorToast from "@/lib/errorToast";
import { OTPValidation } from "@/lib/validation";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import OTPInputBlock from "./OTPInputBlock";

type OTPInputPropsType = {
    isLoading: boolean;
    handleVerifyOTP: (otp: string) => Promise<void>;
    isResendOTP: boolean;
    setIsResendOTP: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OTPInput({
    isLoading,
    handleVerifyOTP,
    isResendOTP,
    setIsResendOTP,
}: OTPInputPropsType) {
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (!isResendOTP) return;

        setOtp("");
        setIsResendOTP(false);
    }, [isResendOTP]);

    async function handleChangeText(text: string) {
        if (isLoading) return;

        // stop from entering more than 4 digits
        if (text.length > 4) return;

        setOtp(text);

        if (text.length < 4) return;

        if (!OTPValidation.regex.test(text)) {
            errorToast(OTPValidation.message1);
            return;
        }

        await handleVerifyOTP(text);
    }

    return (
        <View
            className={`relative flex-row gap-4 justify-center ${
                isLoading ? "opacity-50" : "opacity-1"
            }`}
        >
            <TextInput
                keyboardType="number-pad"
                className="absolute left-0 right-0 top-0 bottom-0 text-transparent outline-none"
                caretHidden={true}
                maxLength={4}
                value={otp}
                onChangeText={handleChangeText}
                editable={!isLoading}
                autoFocus
            />

            <OTPInputBlock isActive={otp.length >= 0} value={otp.slice(0, 1)} />
            <OTPInputBlock isActive={otp.length >= 1} value={otp.slice(1, 2)} />
            <OTPInputBlock isActive={otp.length >= 2} value={otp.slice(2, 3)} />
            <OTPInputBlock isActive={otp.length >= 3} value={otp.slice(3, 4)} />
        </View>
    );
}
