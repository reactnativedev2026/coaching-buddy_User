// app/terms-and-conditions.tsx

import CustomHeader from "@/components/common/CustomHeader";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function TermsAndConditions() {
    return (
        <View className="flex-1 bg-secondary">
            <CustomHeader title="Terms & Conditions" />

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
                        CoachingBuddy — Terms & Conditions
                    </Text>

                    <Text className="text-gray-500 mt-2 mb-6">
                        Effective Date: 01 Jan 2026 • Last Updated: 01 Jan 2026
                    </Text>

                    <Text className="text-gray-700 leading-6 mb-6">
                        Welcome to CoachingBuddy. By accessing or using the
                        CoachingBuddy mobile application, website, or related
                        services, you agree to comply with these Terms &
                        Conditions.
                    </Text>

                    <TermsSection
                        title="1. Eligibility"
                        body={[
                            "You must be at least 13 years old to use CoachingBuddy.",
                            "Users under 18 should use the App with parental guidance.",
                            "You confirm all information provided is accurate.",
                        ]}
                    />

                    <TermsSection
                        title="2. About CoachingBuddy"
                        body={[
                            "CoachingBuddy helps students discover and connect with coaching institutes.",
                            "We do not guarantee admissions, rankings, or placements.",
                        ]}
                    />

                    <TermsSection
                        title="3. User Accounts"
                        body={[
                            "You are responsible for maintaining account confidentiality.",
                            "Unauthorized account access must be reported immediately.",
                            "Accounts violating terms may be suspended.",
                        ]}
                    />

                    <TermsSection
                        title="4. Acceptable Use"
                        body={[
                            "Do not use the App for illegal or fraudulent activities.",
                            "Do not upload false or offensive content.",
                            "Do not interfere with app security or servers.",
                        ]}
                    />

                    <TermsSection
                        title="5. Listings and Third-Party Institutes"
                        body={[
                            "Institute information may include courses, fees, and ratings.",
                            "We do not verify every institute claim.",
                            "Users should independently verify information.",
                        ]}
                    />

                    <TermsSection
                        title="6. Intellectual Property Rights"
                        body={[
                            "All branding, software, text, graphics, and databases belong to AdvanMinds.",
                            "Unauthorized copying or distribution is prohibited.",
                        ]}
                    />

                    <TermsSection
                        title="7. Privacy"
                        body={[
                            "Use of CoachingBuddy is governed by our Privacy Policy.",
                        ]}
                    />

                    <TermsSection
                        title="8. Notifications and Communications"
                        body={[
                            "You may receive account alerts and educational recommendations.",
                            "Marketing communications can be opted out anytime.",
                        ]}
                    />

                    <TermsSection
                        title="9. Disclaimer of Warranties"
                        body={[
                            "The App is provided on an 'as is' basis.",
                            "We do not guarantee uninterrupted or error-free service.",
                        ]}
                    />

                    <TermsSection
                        title="10. Limitation of Liability"
                        body={[
                            "We are not liable for indirect damages or disputes.",
                            "Use of the App is at your own risk.",
                        ]}
                    />

                    <TermsSection
                        title="11. Termination"
                        body={[
                            "Accounts may be suspended for violations or harmful activity.",
                        ]}
                    />

                    <TermsSection
                        title="12. Governing Law"
                        body={[
                            "These Terms are governed by the laws of India.",
                        ]}
                    />

                    <TermsSection
                        title="13. Changes to Terms"
                        body={[
                            "Updated terms may be posted inside the App or website.",
                            "Continued use means acceptance of revised terms.",
                        ]}
                    />

                    <TermsSection
                        title="14. Contact & Grievance Officer"
                        body={[
                            "Grievance Officer: Manish Raut",
                            "Company: AdvanMinds",
                            "Email: hello@advanminds.com",
                            "Response Time: Within 7 working days",
                        ]}
                    />

                    <TermsSection
                        title="15. Copyright Notice"
                        body={[
                            "© 2026 AdvanMinds. All rights reserved.",
                            "Unauthorized use or reproduction is prohibited.",
                        ]}
                    />

                    {/* FOOTER */}
                    <View className="bg-orange-50 rounded-2xl p-4 mt-4">
                        <Text className="text-primary font-pSemiBold text-center leading-6">
                            By using CoachingBuddy, you acknowledge that you
                            have read, understood, and agreed to these Terms &
                            Conditions.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

function TermsSection({
    title,
    body,
}: {
    title: string;
    body: string[];
}) {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
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
        </>
    );
}