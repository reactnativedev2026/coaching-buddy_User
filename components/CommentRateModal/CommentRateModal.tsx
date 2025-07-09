import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import CustomButton from "../common/CustomButton";
import FormField from "../common/FormField";

type CommentRateModalPropsType = {
    isVisible: boolean;
    handleModalClose: () => void;
    handleComment: (rating: number, comment: string) => void;
    disabled: boolean;
};

export default function CommentRateModal({
    isVisible,
    handleModalClose,
    handleComment,
    disabled,
}: CommentRateModalPropsType) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);

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
                        <Text className="text-primary text-base font-pSemiBold">
                            Please tell us about your experience
                        </Text>

                        <CustomButton
                            className="p-2 rounded-full bg-primary/10"
                            onPress={handleModalClose}
                        >
                            <Entypo name="cross" size={22} color="#000" />
                        </CustomButton>
                    </View>

                    <ScrollView
                        contentContainerClassName="gap-6 pb-2"
                        showsVerticalScrollIndicator={false}
                    >
                        <Rating
                            type="star"
                            ratingCount={5}
                            imageSize={24}
                            jumpValue={1}
                            startingValue={rating}
                            onFinishRating={(rating: string) => {
                                setRating(parseInt(rating));
                            }}
                        />

                        <FormField
                            label="Comment"
                            value={comment}
                            handleChangeText={setComment}
                            placeholder="Comment here..."
                        />

                        <CustomButton
                            className={`bg-accent1 px-4 py-4 rounded-xl items-center disabled:opacity-50 `}
                            onPress={() => handleComment(rating, comment)}
                            disabled={disabled}
                        >
                            <Text className="text-secondary font-pSemiBold">
                                Rate
                            </Text>
                        </CustomButton>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
