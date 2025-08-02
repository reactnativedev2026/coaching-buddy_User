import { signUp } from "@/api/users.api";
import AvatarSelectModal from "@/components/AvatarSelectModal/AvatarSelectModal";
import CustomButton from "@/components/common/CustomButton";
import CustomImage from "@/components/common/CustomImage";
import FormField from "@/components/common/FormField";
import IMAGES from "@/constants/images.contant";
import errorToast from "@/lib/errorToast";
import setAuthToken from "@/lib/setAuthToken";
import successToast from "@/lib/successToast";
import { nameValidation, phoneNumberValidation } from "@/lib/validation";
import content from "@/locales/en/completeYourProfile.json";
import { setIsLoading, setUser } from "@/redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AvatarType from "@/types/Avatar.type";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

type UserDataType = {
    name: string;
    phone: string;
    avatarName: AvatarType;
};

export default function CompleteYourProfile() {
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.user);
    const [userData, setUserData] = useState<UserDataType>({
        name: "",
        phone: "",
        avatarName: "StudyBuddy",
    });
    const [isAvatarSelectModalVisible, setIsAvatarSelectModalVisible] =
        useState(false);

    function handleChangeText(field: "name" | "phone", value: string) {
        if (field === "name") {
            setUserData((prev) => {
                return {
                    ...prev,
                    name: value,
                };
            });

            return;
        }

        setUserData((prev) => {
            return {
                ...prev,
                phone: value,
            };
        });
    }

    function handleChangeAvatar(avatarName: AvatarType) {
        setUserData((prev) => {
            return {
                ...prev,
                avatarName,
            };
        });
    }

    function validation() {
        if (!nameValidation.regex.test(userData.name.trim())) {
            errorToast(nameValidation.message1, nameValidation.message2);
            return false;
        }

        if (userData.phone !== "") {
            if (!phoneNumberValidation.regex.test(userData.phone)) {
                errorToast(phoneNumberValidation.message1);
                return false;
            }
        }

        if (userData.avatarName == null) {
            errorToast("Select an avatar");
            return false;
        }

        return true;
    }

    async function handleCompleteProfile() {
        if (user == null) return;

        if (!validation()) return;

        try {
            dispatch(setIsLoading(true));

            const res = await signUp({
                email: user.email,
                name: userData.name,
                phone:
                    userData.phone.trim() === "" ? undefined : userData.phone,
                avatarName: userData.avatarName,
            });

            successToast(res.message);

            if (res.data != null) {
                dispatch(setUser(res.data.user));

                await setAuthToken(res.data.token);

                router.replace("/account-success");
            }
        } catch (error) {
            // console.error("Complete Profile error ", error);
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    if (user == null) return null;

    return (
        <KeyboardAvoidingView className="flex-1" behavior="padding">
            <ScrollView contentContainerClassName="min-h-full bg-secondary gap-6 py-20 px-4 gap-6">
                <View className="gap-2 items-center">
                    <Text className="text-primary text-3xl font-pBold">
                        {content.heading}
                    </Text>

                    <Text className="text-primary font-pRegular text-xs text-center w-3/4">
                        {content.subHeading}
                    </Text>
                </View>

                <View className="self-center rounded-full w-32 aspect-square items-center justify-center">
                    <CustomImage
                        image={IMAGES[userData.avatarName]}
                        className="w-32 aspect-square"
                        imageClassName="w-full h-full"
                    />

                    <CustomButton
                        className="bg-accent1 p-2 rounded-full overflow-hidden items-center justify-center absolute bottom-1 right-2"
                        onPress={() => setIsAvatarSelectModalVisible(true)}
                    >
                        <FontAwesome5 name="pen" size={14} color="#fff" />
                    </CustomButton>
                </View>

                <View className="px-4 gap-6">
                    <FormField
                        label={content.nameFieldLabel}
                        placeholder={content.nameFieldPlaceholder}
                        value={userData.name}
                        handleChangeText={(text) =>
                            handleChangeText("name", text)
                        }
                        icon={<AntDesign name="user" size={24} color="#666" />}
                    />

                    <FormField
                        label={content.mobileFieldLabel}
                        placeholder={content.mobileFieldPlaceholder}
                        value={userData.phone}
                        handleChangeText={(text) =>
                            handleChangeText("phone", text)
                        }
                        inputType="number-pad"
                        isMobileInput
                    />

                    <FormField
                        label={content.emailFieldLabel}
                        placeholder={content.emailFieldPlaceholder}
                        value={user.email}
                        handleChangeText={() => {}}
                        inputType="email-address"
                        disabled
                    />
                </View>

                <CustomButton
                    className="bg-accent1 rounded-full items-center justify-center px-6 py-3 w-11/12 self-center mt-2 disabled:opacity-50"
                    onPress={handleCompleteProfile}
                    disabled={isLoading}
                >
                    <Text className="text-secondary font-pSemiBold">
                        {content.buttonText}
                    </Text>
                </CustomButton>

                <AvatarSelectModal
                    isVisible={isAvatarSelectModalVisible}
                    handleModalClose={() =>
                        setIsAvatarSelectModalVisible(false)
                    }
                    selectedAvatarName={userData.avatarName ?? undefined}
                    handleChangeAvatar={handleChangeAvatar}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
