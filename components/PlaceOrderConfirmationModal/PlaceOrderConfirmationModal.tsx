import { Entypo } from "@expo/vector-icons";
import { Modal, Text, View } from "react-native";
import CustomButton from "../common/CustomButton";

type PlaceOrderConfirmationModalProps = {
    isVisible: boolean;
    handleModalClose: () => void;
    handlePlaceOrder: () => void;
    disabled: boolean;
};

export default function PlaceOrderConfirmationModal({
    isVisible,
    handleModalClose,
    handlePlaceOrder,
    disabled,
}: PlaceOrderConfirmationModalProps) {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={handleModalClose}
        >
            <View className="flex-1 bg-black/30 justify-end">
                {/* Overlay to close modal */}
                <CustomButton
                    className="absolute inset-0"
                    onPress={handleModalClose}
                />

                <View
                    className="bg-white px-6 pt-6 pb-8 rounded-t-3xl"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 10,
                    }}
                >
                    {/* Header */}
                    <View className="flex-row justify-between items-start mb-6">
                        <Text className="text-black text-lg font-pSemiBold flex-1 pr-2">
                            Confirm Booking
                        </Text>

                        <CustomButton
                            className="p-2 rounded-full bg-black/5"
                            onPress={handleModalClose}
                        >
                            <Entypo name="cross" size={20} color="#333" />
                        </CustomButton>
                    </View>

                    {/* Subtext */}
                    <Text className="text-gray-600 text-sm leading-5 mb-8">
                        Are you sure you want to book this course? Once
                        confirmed, the booking cannot be undone.
                    </Text>

                    {/* Actions */}
                    <View className="gap-4 w-full">
                        <CustomButton
                            className="bg-accent1 px-4 py-4 rounded-xl items-center disabled:opacity-50"
                            onPress={handlePlaceOrder}
                            disabled={disabled}
                        >
                            <Text className="text-white text-base font-pSemiBold">
                                Book Now
                            </Text>
                        </CustomButton>

                        <CustomButton
                            className="bg-gray-100 px-4 py-4 rounded-xl items-center"
                            onPress={handleModalClose}
                        >
                            <Text className="text-gray-700 text-base font-pSemiBold">
                                Cancel
                            </Text>
                        </CustomButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
