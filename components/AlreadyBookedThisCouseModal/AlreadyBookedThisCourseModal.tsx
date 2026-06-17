import { Entypo } from "@expo/vector-icons";
import { Modal, Text, View } from "react-native";
import CustomButton from "../common/CustomButton";

type AlreadyBookedThisCourseModalPropsType = {
    isVisible: boolean;
    handleModalClose: () => void;
};

export default function AlreadyBookedWithThisCourseModal({
    isVisible,
    handleModalClose,
}: AlreadyBookedThisCourseModalPropsType) {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={handleModalClose}
        >
            <View className="flex-1 bg-black/40 justify-center items-center px-4">
                <CustomButton
                    className="absolute inset-0"
                    onPress={handleModalClose}
                />

                <View
                    className="bg-white rounded-2xl p-6 w-full"
                    style={{
                        maxWidth: 400,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                        elevation: 10,
                    }}
                >
                    {/* Close Button */}
                    <View className="absolute top-3 right-3">
                        <CustomButton onPress={handleModalClose}>
                            <Entypo name="cross" size={20} color="#666" />
                        </CustomButton>
                    </View>

                    {/* Icon and Heading */}
                    <View className="items-center mb-4">
                        <View className="bg-red-100 p-3 rounded-full mb-2">
                            <Entypo name="warning" size={24} color="#DC2626" />
                        </View>
                        <Text className="text-lg font-pBold text-center text-black">
                            Already Booked
                        </Text>
                    </View>

                    <Text className="text-gray-700 text-sm text-center leading-5 mb-6">
                        You have already booked this course from the same
                        college. Kindly wait for their response. You will
                        receive an email once confirmed.
                    </Text>

                    <CustomButton
                        onPress={handleModalClose}
                        className="bg-accent1 py-3 rounded-xl items-center"
                    >
                        <Text className="text-white text-base font-pSemiBold">
                            Okay, Got it
                        </Text>
                    </CustomButton>
                </View>
            </View>
        </Modal>
    );
}
