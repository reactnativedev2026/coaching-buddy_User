import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

type FormFieldPropsType = {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  handleChangeText: (text: string) => void;
  inputType?: KeyboardTypeOptions;
  showRequiredStar?: boolean;
  disabled?: boolean;
  isMobileInput?: boolean;
  icon?: ReactNode;
  maxLength?: number; // ✅ NEW prop
};

export default function FormField({
  label,
  placeholder,
  required = false,
  value,
  handleChangeText,
  inputType = "default",
  showRequiredStar = true,
  disabled = false,
  isMobileInput = false,
  icon,
  maxLength, // ✅ destructured here
}: FormFieldPropsType) {
  return (
    <View className="gap-2">
      <View className="flex-row">
        <Text className="text-primary text-sm font-pSemiBold">{label}</Text>
        {required && showRequiredStar ? <Text>*</Text> : null}
      </View>

      <View className="flex-row items-center border-2 border-primary/50 rounded-xl">
        {isMobileInput && (
          <View className="flex-row items-center px-2 gap-[.1rem]">
            <Text className="text-primary/60 text-sm font-pRegular">+91</Text>

            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color="#666"
              className="border-r border-r-primary/60"
            />
          </View>
        )}

        {icon != null && <View className="ml-2">{icon}</View>}

        <TextInput
        style={{ fontFamily: "Poppins-Regular" }}
          placeholder={placeholder}
          className={`py-4 text-primary text-base flex-1 ${
            disabled ? "opacity-50" : ""
          } ${isMobileInput ? "pr-4 pl-0" : "px-4"}`}
          keyboardType={inputType}
          value={value}
          onChangeText={(text: string) => handleChangeText(text)}
          editable={!disabled}
          maxLength={maxLength} // ✅ pass it to TextInput
        />
      </View>
    </View>
  );
}
