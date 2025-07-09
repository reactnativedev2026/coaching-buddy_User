import CustomImage from "@/components/common/CustomImage";
import ProfileOption from "@/components/ProfileOption/ProfileOption";
import IMAGES from "@/constants/images.contant";
import deleteAuthToken from "@/lib/deleteAuthToken";
import { setIsAuthenticated, setUser } from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Profile() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    async function handleLogout() {
        await deleteAuthToken();

        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
        router.replace("/home");
    }

    if (user == null) return null;

    return (
        <ScrollView contentContainerClassName="min-h-full flex-1 bg-secondary gap-6 pb-20 px-8 pt-4">
            <View className="flex-row items-center gap-4 border-b-2 border-b-primary/10 pb-6">
                <CustomImage
                    image={IMAGES[user?.avatarName ?? "EduBee"]}
                    className="w-32 aspect-square rounded-full bg-primary/10"
                    imageClassName="w-full h-full"
                />

                <View>
                    <Text className="text-primary font-pRegular text-base">
                        {user.name}
                    </Text>
                    <Text className="text-primary/50 font-pRegular text-sm">
                        {user.email}
                    </Text>
                </View>
            </View>

            <View className="gap-4">
                <ProfileOption
                    icon={<AntDesign name="user" size={26} color="black" />}
                    title="My Profile"
                    href={"/update-profile"}
                />

                <ProfileOption
                    icon={
                        <MaterialCommunityIcons
                            name="bookmark-outline"
                            size={26}
                            color="black"
                        />
                    }
                    title="Favorite"
                    href="/favorite"
                />

                <ProfileOption
                    icon={
                        <MaterialCommunityIcons
                            name="table-border"
                            size={26}
                            color="black"
                        />
                    }
                    title="My Booking"
                />

                <ProfileOption
                    icon={<AntDesign name="logout" size={24} color="black" />}
                    title="Log Out"
                    handleOnPress={handleLogout}
                />
            </View>
        </ScrollView>
    );
}
