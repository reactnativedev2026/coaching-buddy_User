// Profile.tsx

import { deleteUser } from "@/api/users.api";
import CustomImage from "@/components/common/CustomImage";
import Loader from "@/components/common/Loader";
import ProfileOption from "@/components/ProfileOption/ProfileOption";
import IMAGES from "@/constants/images.contant";
import deleteAuthToken from "@/lib/deleteAuthToken";
import errorToast from "@/lib/errorToast";
import successToast from "@/lib/successToast";
import { setIsAuthenticated, setIsLoading, setUser } from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Profile() {
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.user);

    async function handleLogout() {
        await deleteAuthToken();

        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
    }

    async function handleDeleteAccount() {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action is permanent and cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            dispatch(setIsLoading(true));
                            await deleteUser(user.id);
                            await deleteAuthToken();
                            dispatch(setUser(null));
                            dispatch(setIsAuthenticated(false));
                            successToast("Account deleted successfully");
                        } catch (error) {
                            console.error("Delete Account error", error);
                            errorToast("Failed to delete account. Please try again or contact support.");
                        } finally {
                            dispatch(setIsLoading(false));
                        }
                    },
                },
            ]
        );
    }

    const handleContactSupport = () => {
        router.push("/contact-support");
    };

    if (user == null) return null;

    return (
        <View className="flex-1 bg-secondary">
            <ScrollView
                className="flex-1"
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: 16,
                paddingBottom: 80,
                gap: 24,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* PROFILE CARD */}
            <View className="flex-row items-center gap-4 border-b border-primary/10 pb-6">
                <CustomImage
                    image={IMAGES[user?.avatarName ?? "EduBee"]}
                    className="w-28 aspect-square rounded-full bg-primary/10"
                    imageClassName="w-full h-full"
                />

                <View className="flex-1">
                    <Text className="text-primary font-pSemiBold text-lg">
                        {user.name}
                    </Text>

                    <Text className="text-primary/50 font-pRegular text-sm mt-1">
                        {user.email}
                    </Text>
                </View>
            </View>

            {/* OPTIONS */}
            <View className="gap-5">

                <ProfileOption
                    icon={<AntDesign name="user" size={18} color="#111827" />}
                    title="My Profile"
                    href={"/update-profile"}
                    containerColor="bg-[#7FE7D4]"
                />

                <ProfileOption
                    icon={
                        <MaterialCommunityIcons
                            name="bookmark-outline"
                            size={18}
                            color="#4B5563"
                        />
                    }
                    title="Favorite"
                    href="/favorite"
                    containerColor="bg-[#E5E7EB]"
                />

                <ProfileOption
                    icon={
                        <MaterialCommunityIcons
                            name="table-border"
                            size={18}
                            color="#4B5563"
                        />
                    }
                    title="My Booking"
                    href={"/booking"}
                    containerColor="bg-[#DBEAFE]"
                />

                <ProfileOption
                    icon={
                        <MaterialCommunityIcons
                            name="shield-outline"
                            size={18}
                            color="#4B5563"
                        />
                    }
                    title="Privacy Policy"
                    href={"/privacypolicy"}
                    containerColor="bg-[#FEF3C7]"
                />

                <ProfileOption
                    icon={
                        <MaterialCommunityIcons
                            name="file-document-outline"
                            size={18}
                            color="#4B5563"
                        />
                    }
                    title="Terms & Conditions"
                    href={"/terms"}
                    containerColor="bg-[#E9D5FF]"
                />

                <ProfileOption
                    icon={<AntDesign name="logout" size={18} color="#B91C1C" />}
                    title="Log Out"
                    handleOnPress={handleLogout}
                    isLogout
                    containerColor="bg-red-100"
                />

                <ProfileOption
                    icon={<AntDesign name="delete" size={18} color="#B91C1C" />}
                    title="Delete Account"
                    handleOnPress={handleDeleteAccount}
                    isLogout
                    containerColor="bg-red-100"
                />
                {/* NEED HELP SECTION */}
                <View
                    className="bg-accent1 rounded-3xl p-5 mt-4 relative overflow-hidden"
                    style={{
                        elevation: 4,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                    }}
                >
                    {/* ICON */}
                    <View className="absolute top-5 right-5 opacity-20">
                        <MaterialCommunityIcons
                            name="headset"
                            size={48}
                            color="#fff"
                        />
                    </View>

                    {/* TITLE */}
                    <Text className="text-white text-2xl font-pBold">
                        Need Help?
                    </Text>

                    {/* SUBTITLE */}
                    <Text className="text-white/90 text-sm leading-6 mt-2 pr-12">
                        Our support team is available 24/7 to assist you
                        with your bookings and queries.
                    </Text>

                    {/* BUTTON */}
                    <TouchableOpacity 
                        className="mt-5 self-start bg-white px-5 py-3 rounded-full"
                        onPress={handleContactSupport}
                    >
                        <Text className="text-[#009688] font-pSemiBold text-sm">
                            Contact Support
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        {isLoading && (
            <View className="absolute inset-0 justify-center items-center z-50">
                <Loader fullscreen message="Deleting account..." />
            </View>
        )}
    </View>
    );
}