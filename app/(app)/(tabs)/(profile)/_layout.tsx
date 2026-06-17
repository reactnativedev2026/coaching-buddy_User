import CustomHeader from "@/components/common/CustomHeader";
import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack screenOptions={{}}>
            <Stack.Screen
                name="profile"
                options={{ header: () => <CustomHeader title="Account" /> }}
            />

            <Stack.Screen
                name="update-profile"
                options={{
                    title: "Update Profile",
                    header: () => <CustomHeader title="Update Profile" />,
                }}
            />
        </Stack>
    );
}
