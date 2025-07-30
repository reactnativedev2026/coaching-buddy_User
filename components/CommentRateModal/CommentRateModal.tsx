import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Rating } from "react-native-ratings";
import CustomButton from "../common/CustomButton";

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
            transparent
            animationType="slide"
            onRequestClose={handleModalClose}
        >
            <View className="flex-1 bg-black/30 justify-end">
                {/* Overlay click to close */}
                <CustomButton
                    className="absolute inset-0"
                    onPress={handleModalClose}
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    className="bg-white px-6 pt-6 pb-8 rounded-t-3xl max-h-[70vh]"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 10,
                    }}
                >
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-black text-base font-pSemiBold">
                            Share your experience
                        </Text>

                        <CustomButton
                            className="p-2 rounded-full bg-black/5"
                            onPress={handleModalClose}
                        >
                            <Entypo name="cross" size={22} color="#333" />
                        </CustomButton>
                    </View>

                    <ScrollView
                        contentContainerClassName="gap-6 pb-2"
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Rating */}
                        <View>
                            <Text className="text-sm text-gray-500 mb-2">
                                Your Rating
                            </Text>
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={30}
                                startingValue={rating}
                                onFinishRating={(val: number) => setRating(val)}
                            />
                        </View>

                        {/* Comment Field */}
                        <View>
                            <Text className="text-sm text-gray-500 mb-2">
                                Your Comment
                            </Text>
                            <TextInput
                                value={comment}
                                onChangeText={setComment}
                                placeholder="Write your feedback..."
                                placeholderTextColor="#888"
                                multiline
                                numberOfLines={4}
                                style={{
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    padding: 12,
                                    textAlignVertical: "top",
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 14,
                                    lineHeight: 20,
                                    color: "#1C1C1C",
                                }}
                            />
                        </View>

                        {/* Submit Button */}
                        <CustomButton
                            className="bg-accent1 px-4 py-4 rounded-xl items-center disabled:opacity-50"
                            onPress={() => handleComment(rating, comment)}
                            disabled={disabled || comment.trim().length === 0}
                        >
                            <Text className="text-white font-pSemiBold text-base">
                                Submit
                            </Text>
                        </CustomButton>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}
