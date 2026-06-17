import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
// Removed CustomInput import
import successToast from "@/lib/successToast";
import { useAppSelector } from "@/redux/store";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function ContactSupport() {
    const { user } = useAppSelector((state) => state.user);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!subject.trim() || !message.trim()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            successToast("Support Request Sent", "We will get back to you soon!");
            router.back();
        }, 1500);
    };

    return (
        <View className="flex-1 bg-secondary">
            <CustomHeader title="Contact Support" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    padding: 24,
                    paddingBottom: 40,
                }}
            >
                <Text className="text-primary font-pSemiBold text-xl mb-2">
                    How can we help you?
                </Text>
                <Text className="text-[#6B7280] font-pRegular text-sm mb-8">
                    Please fill out the form below and our support team will get
                    back to you as soon as possible.
                </Text>

                {/* Email Field (Read Only) */}
                <View className="mb-4">
                    <Text className="text-[#111827] font-pMedium text-sm mb-2 ml-1">
                        Email Address
                    </Text>
                    <View className="bg-gray-100 rounded-2xl px-4 py-4">
                        <Text className="text-primary/60 font-pMedium">
                            {user?.email || "user@example.com"}
                        </Text>
                    </View>
                </View>

                {/* Subject Field */}
                <View className="mb-4">
                    <Text className="text-[#111827] font-pMedium text-sm mb-2 ml-1">
                        Subject
                    </Text>
                    <TextInput
                        placeholder="What is this regarding?"
                        value={subject}
                        onChangeText={setSubject}
                        className="border-2 border-primary/50 rounded-xl py-4 px-4 text-primary text-base"
                        style={{ fontFamily: "Poppins-Regular" }}
                    />
                </View>

                {/* Message Field */}
                <View className="mb-8">
                    <Text className="text-[#111827] font-pMedium text-sm mb-2 ml-1">
                        Message
                    </Text>
                    <TextInput
                        placeholder="Describe your issue or question in detail..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        numberOfLines={6}
                        className="border-2 border-primary/50 rounded-xl py-4 px-4 text-primary text-base h-32 items-start"
                        textAlignVertical="top"
                        style={{ fontFamily: "Poppins-Regular" }}
                    />
                </View>

                {/* Submit Button */}
                <CustomButton
                    className={`bg-accent1 rounded-full py-4 items-center justify-center ${
                        (!subject.trim() || !message.trim() || isSubmitting)
                            ? "opacity-60"
                            : "opacity-100"
                    }`}
                    onPress={handleSubmit}
                    disabled={!subject.trim() || !message.trim() || isSubmitting}
                >
                    <Text className="text-white font-pBold text-base">
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Text>
                </CustomButton>
            </ScrollView>
        </View>
    );
}
