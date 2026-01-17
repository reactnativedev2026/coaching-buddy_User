import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

// Define the props type for our modal component
interface FlexibleConfirmationModalProps {
    visible: boolean;
    title: string;
    message: string;
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
    // Custom styling options
    titleColor?: string;
    messageColor?: string;
    confirmButtonColor?: string;
    confirmTextColor?: string;
    cancelButtonColor?: string;
    cancelTextColor?: string;
    cancelButtonStyle?: "filled" | "outline";
    confirmButtonStyle?: "filled" | "outline";
    modalBackgroundColor?: string;
    blurIntensity?: number;
    animationType?: "slide" | "fade" | "scale" | "none";
}

const { width } = Dimensions.get("window");

const ConfirmationModel: React.FC<FlexibleConfirmationModalProps> = ({
    visible,
    title,
    message,
    cancelText = "Cancel",
    confirmText = "OK",
    onCancel,
    onConfirm,
    titleColor = "#000000",
    messageColor = "#444444",
    confirmButtonColor = "#4A90E2",
    confirmTextColor = "#FFFFFF",
    cancelButtonColor = "#F5F5F5",
    cancelTextColor = "#444444",
    cancelButtonStyle = "outline",
    confirmButtonStyle = "filled",
    modalBackgroundColor = "#FFFFFF",
    blurIntensity = 50,
    animationType = "scale",
}) => {
    // Animation values
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        if (visible) {
            // Reset animations when modal becomes visible
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.9);

            // Start animations
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, fadeAnim, scaleAnim]);

    const handleBackdropPress = () => {
        // Optional: close on backdrop press
        onCancel();
    };

    // Create button styles based on style prop
    const getCancelButtonStyle = () => {
        if (cancelButtonStyle === "outline") {
            return {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: cancelButtonColor,
            };
        } else {
            return {
                backgroundColor: cancelButtonColor,
            };
        }
    };

    const getConfirmButtonStyle = () => {
        if (confirmButtonStyle === "outline") {
            return {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: confirmButtonColor,
            };
        } else {
            return {
                backgroundColor: confirmButtonColor,
            };
        }
    };

    const getCancelTextColor = () => {
        return cancelButtonStyle === "outline"
            ? cancelButtonColor
            : cancelTextColor;
    };

    const getConfirmTextColor = () => {
        return confirmButtonStyle === "outline"
            ? confirmButtonColor
            : confirmTextColor;
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onCancel}
        >
            <BlurView intensity={blurIntensity} style={styles.backdrop}>
                <TouchableWithoutFeedback onPress={handleBackdropPress}>
                    <View style={styles.blurContainer}>
                        <Animated.View
                            style={[
                                styles.modalContainer,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ scale: scaleAnim }],
                                    backgroundColor: modalBackgroundColor,
                                },
                            ]}
                        >
                            <View style={styles.modalContent}>
                                <Text
                                    style={[
                                        styles.title,
                                        { color: titleColor },
                                    ]}
                                >
                                    {title}
                                </Text>
                                <Text
                                    style={[
                                        styles.message,
                                        { color: messageColor },
                                    ]}
                                >
                                    {message}
                                </Text>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            styles.cancelButton,
                                            getCancelButtonStyle(),
                                        ]}
                                        onPress={onCancel}
                                        activeOpacity={0.8}
                                    >
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                { color: getCancelTextColor() },
                                            ]}
                                        >
                                            {cancelText}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            styles.confirmButton,
                                            getConfirmButtonStyle(),
                                        ]}
                                        onPress={onConfirm}
                                        activeOpacity={0.8}
                                    >
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                {
                                                    color: getConfirmTextColor(),
                                                },
                                            ]}
                                        >
                                            {confirmText}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    blurContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: width * 0.85,
        maxWidth: 400,
        borderRadius: 16,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalContent: {
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: "center",
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 8,
    },
    cancelButton: {
        marginRight: 4,
    },
    confirmButton: {
        marginLeft: 4,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});

export default ConfirmationModel;
