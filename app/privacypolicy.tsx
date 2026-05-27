// app/privacy-policy.tsx

import CustomHeader from "@/components/common/CustomHeader";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function PrivacyPolicy() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-secondary">
                <CustomHeader title="Privacy Policy" />

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{
                        padding: 16,
                        paddingBottom: 40,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="bg-white rounded-3xl p-5 shadow-sm">

                        {/* TITLE */}
                        <Text className="text-2xl font-pBold text-primary">
                            CoachingBuddy — Privacy Policy
                        </Text>

                        <Text className="text-gray-500 mt-2 mb-6">
                            Effective Date: 01 Jan 2026 • Last Updated: 01 Jan 2026
                        </Text>

                        <Text className="text-gray-700 leading-6 mb-6">
                            Thank you for using CoachingBuddy ("we", "our", "us").
                            Your privacy matters to us. This Privacy Policy explains
                            how we collect, use, store, and share information when
                            you use the CoachingBuddy mobile application ("App").
                        </Text>

                        {/* SECTION */}
                        <PolicySection
                            title="1. Information We Collect"
                            body={[
                                "Personal Information: Name, email address, phone number, age (optional).",
                                "Location (city/pincode) to show nearby coaching centers.",
                                "Course or coaching preferences.",
                                "Device ID, operating system, IP address.",
                                "App interaction data, crash logs, and analytics.",
                                "Optional permissions like location, storage/media access, and notifications.",
                                "We do not collect financial or sensitive biometric data.",
                            ]}
                        />

                        <PolicySection
                            title="2. How We Use Your Information"
                            body={[
                                "Connect you with relevant coaching classes and academies.",
                                "Show personalized results based on location and interest.",
                                "Improve app features and user experience.",
                                "Send notifications about updates or offers.",
                                "Ensure security and prevent fraudulent activity.",
                            ]}
                        />

                        <PolicySection
                            title="3. Sharing of Information"
                            body={[
                                "Coaching institutes you choose to contact.",
                                "Trusted service providers like analytics and cloud hosting.",
                                "Government authorities if required by law.",
                                "We never sell your personal data.",
                            ]}
                        />

                        <PolicySection
                            title="4. Data Storage and Retention"
                            body={[
                                "Your data is stored securely on protected servers.",
                                "We retain information only as long as necessary or legally required.",
                                "Unused data may be deleted or anonymized.",
                            ]}
                        />

                        <PolicySection
                            title="5. Your Rights"
                            body={[
                                "Access or update your data.",
                                "Request deletion of your account/data.",
                                "Withdraw consent for notifications or location.",
                                "Contact our grievance officer anytime.",
                                "Email: hello@advanminds.com",
                            ]}
                        />

                        <PolicySection
                            title="6. Data Security"
                            body={[
                                "Encrypted HTTPS communication.",
                                "Secure servers and restricted access.",
                                "Regular security reviews.",
                                "No method is 100% secure.",
                            ]}
                        />

                        <PolicySection
                            title="7. Children’s Privacy"
                            body={[
                                "App intended for users aged 13+.",
                                "Users under 18 should use parental guidance.",
                                "We do not knowingly collect data from children under 13.",
                            ]}
                        />

                        <PolicySection
                            title="8. Third-Party Services"
                            body={[
                                "The App may use services like Firebase or Google Analytics.",
                                "Each third party has its own privacy policy.",
                            ]}
                        />

                        <PolicySection
                            title="9. Changes to This Policy"
                            body={[
                                "We may update this Privacy Policy anytime.",
                                "Updated versions will appear in the App and website.",
                            ]}
                        />

                        <PolicySection
                            title="10. Grievance Officer / Contact Us"
                            body={[
                                "Name: Manish Raut",
                                "Email: hello@advanminds.com",
                                "Response Time: Within 7 working days",
                            ]}
                        />

                        {/* FOOTER */}
                        <View className="bg-blue-50 rounded-2xl p-4 mt-4">
                            <Text className="text-primary font-pSemiBold text-center leading-6">
                                By using the CoachingBuddy App, you agree to this
                                Privacy Policy and consent to the collection and use
                                of information as described above.
                            </Text>

                            <Text className="text-center text-gray-500 text-xs mt-3">
                                Last reviewed: 05 Nov 2026
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

function PolicySection({
    title,
    body,
}: {
    title: string;
    body: string[];
}) {
    return (
        <View className="mb-6">
            <Text className="text-lg font-pBold text-primary mb-3">
                {title}
            </Text>

            <View className="gap-2">
                {body.map((item, index) => (
                    <View
                        key={index}
                        className="flex-row items-start"
                    >
                        <Text className="text-primary mr-2 mt-1">•</Text>

                        <Text className="text-gray-700 flex-1 leading-6">
                            {item}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}