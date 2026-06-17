import IMAGES from "@/constants/images.contant";
import AvatarType from "@/types/Avatar.type";
import { Entypo } from "@expo/vector-icons";
import { Modal, ScrollView, Text, View } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomImage from "../common/CustomImage";

type AvataSelectModalPropsType = {
    isVisible: boolean;
    handleModalClose: () => void;
    selectedAvatarName?: string | null;
    handleChangeAvatar: (avatarName: AvatarType) => void;
};

export default function AvatarSelectModal({
    isVisible,
    handleModalClose,
    selectedAvatarName,
    handleChangeAvatar,
}: AvataSelectModalPropsType) {
    const avatars: AvatarType[] = [
        "StudyBuddy",
        "Quizzy",
        "EduBee",
        "SmartySpark",
    ];

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleModalClose}
        >
            <View className="flex-1 bg-black/30 justify-end">
                {/* Overlay press to close */}
                <CustomButton
                    className="absolute left-0 right-0 top-0 bottom-0"
                    onPress={handleModalClose}
                />

                <View
                    className="bg-secondary px-6 pt-6 pb-8 rounded-t-3xl max-h-[65vh]"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 10,
                    }}
                >
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-primary text-lg font-pSemiBold">
                            Select Avatar
                        </Text>

                        <CustomButton
                            className="p-2 rounded-full bg-primary/10"
                            onPress={handleModalClose}
                        >
                            <Entypo name="cross" size={22} color="#000" />
                        </CustomButton>
                    </View>

                    {/* Avatar List */}
                    <ScrollView
                        contentContainerClassName="gap-4 pb-2"
                        showsVerticalScrollIndicator={false}
                    >
                        {avatars.map((item, i) => {
                            const isSelected = selectedAvatarName === item;

                            return (
                                <CustomButton
                                    key={i}
                                    className={`flex-row items-center rounded-xl px-3 py-2 gap-4 ${
                                        isSelected
                                            ? "bg-accent1/10 border-2 border-accent1"
                                            : "bg-primary/5"
                                    }`}
                                    onPress={() => handleChangeAvatar(item)}
                                    activeOpacity={0.8}
                                    style={{
                                        transitionDuration: "200ms",
                                    }}
                                >
                                    <View className="w-16 h-16 rounded-full overflow-hidden border border-primary/10">
                                        <CustomImage
                                            image={IMAGES[item]}
                                            className="w-full h-full"
                                            imageClassName="w-full h-full"
                                        />
                                    </View>

                                    <Text
                                        className={`font-pSemiBold text-base ${
                                            isSelected
                                                ? "text-accent1"
                                                : "text-primary"
                                        }`}
                                    >
                                        {item.slice(0, 1).toUpperCase() +
                                            item.slice(1)}
                                    </Text>
                                </CustomButton>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
