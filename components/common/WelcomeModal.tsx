import React from "react";
import {
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function WelcomeModal({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View
        className="flex-1 justify-center items-center px-5"
        style={{
          backgroundColor: "rgba(0,0,0,0.35)",
        }}
      >
        <View
          className="w-full rounded-[16px] overflow-hidden"
          style={{
            backgroundColor: "#EEF4F3",
          }}
        >
          {/* Close */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={{
              position: "absolute",
              right: 18,
              top: 18,
              zIndex: 20,
            }}
          >
            <MaterialCommunityIcons
              name="close"
              size={22}
              color="#7B7B7B"
            />
          </TouchableOpacity>

          {/* Top Image */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Main Big Image */}
            <Image
              source={require("@/assets/images/popupmain.png")}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 240,
              }}
            />

            {/* Floating Flag */}
            <Image
              source={require("@/assets/images/popupflag.png")}
              resizeMode="contain"
              style={{
                width: 70,
                height: 70,
                // position: "absolute",
                // bottom: 18,
                // left: 100,
                top:-40
              }}
            />
          </View>

          {/* Content */}
          <View
            style={{
              paddingHorizontal: 28,
              paddingBottom: 30,
              marginTop: -4,
            }}
          >
            {/* Title */}
            <Text
              style={{
                fontSize: 20,
                lineHeight: 32,
                fontWeight: "700",
                color: "#111",
                textAlign: "center",
              }}
            >
              Welcome to Coaching Buddy App
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                marginTop: 18,
                textAlign: "center",
                color: "#6B7280",
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              Find the Best Academies near you
            </Text>

            {/* Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onClose}
              style={{
                backgroundColor: "#00796B",
                marginTop: 34,
                height: 60,
                borderRadius: 999,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "600",
                  marginRight: 8,
                }}
              >
                Get Started
              </Text>

              <MaterialCommunityIcons
                name="arrow-right"
                size={22}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}