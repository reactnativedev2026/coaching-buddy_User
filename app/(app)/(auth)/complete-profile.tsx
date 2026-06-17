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
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from "react-native";

type GenderType = "male" | "female";

type UserDataType = {
  name: string;
  phone: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  gender: GenderType | null;
  avatarName: AvatarType;
};

type ValidationErrors = {
  name: string;
  phone: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  gender: string;
};

type PostOffice = {
  Name: string;
  District: string;
  State: string;
  Block: string;
};

type PincodeResponse = {
  Message: string;
  Status: string;
  PostOffice: PostOffice[] | null;
};

// Gender Selection Component
const GenderSelector = ({ 
  selectedGender, 
  onGenderSelect, 
  error 
}: { 
  selectedGender: GenderType | null;
  onGenderSelect: (gender: GenderType) => void;
  error?: string;
}) => {
  return (
    <View className="gap-2">
      <Text className="text-primary text-sm font-pSemiBold">Gender (Optional)</Text>
      
      <View className="flex-row gap-4">
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center p-4 border-2 rounded-xl ${
            selectedGender === "male" 
              ? "border-accent1 bg-accent1/10" 
              : "border-primary/50 bg-white"
          }`}
          onPress={() => onGenderSelect("male")}
        >
          <Ionicons 
            name="man" 
            size={20} 
            color={selectedGender === "male" ? "#007AFF" : "#666"} 
          />
          <Text 
            className={`ml-2 font-pMedium ${
              selectedGender === "male" ? "text-accent1" : "text-gray-600"
            }`}
          >
            Male
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center p-4 rounded-xl border-2 ${
            selectedGender === "female" 
              ? "border-accent1 bg-accent1/10" 
              : "border-primary/50 bg-white"
          }`}
          onPress={() => onGenderSelect("female")}
        >
          <Ionicons 
            name="woman" 
            size={20} 
            color={selectedGender === "female" ? "#007AFF" : "#666"} 
          />
          <Text 
            className={`ml-2 font-pMedium ${
              selectedGender === "female" ? "text-accent1" : "text-gray-600"
            }`}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>
      
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
};

// Area Selection Component
const AreaSelector = ({
  areas,
  onSelectArea,
  loading,
  noDataFound,
}: {
  areas: PostOffice[];
  onSelectArea: (area: PostOffice) => void;
  loading: boolean;
  noDataFound: boolean;
}) => {
  if (loading) {
    return (
      <View className="bg-white border border-primary/20 rounded-xl p-4 mt-2">
        <ActivityIndicator size="small" color="#007AFF" />
        <Text className="text-center text-gray-600 mt-2 font-pRegular text-sm">
          Fetching location details...
        </Text>
      </View>
    );
  }

  if (noDataFound) {
    return (
      <View className="bg-red-50 border border-red-200 rounded-xl p-4 mt-2">
        <Text className="text-red-600 text-center font-pMedium">
          No records found for this pincode
        </Text>
      </View>
    );
  }

  if (areas.length === 0) {
    return null;
  }

  return (
    <View className="bg-white border border-primary/20 rounded-xl mt-2 max-h-60">
      <FlatList
        data={areas}
        keyExtractor={(item, index) => `${item.Name}-${index}`}
        scrollEnabled={false}
      
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 border-b border-gray-100"
            onPress={() => onSelectArea(item)}
          >
            <Text className="font-pSemiBold text-primary text-base">
              {item.Name}
            </Text>
            <Text className="font-pRegular text-gray-600 text-sm mt-1">
              {item.District}, {item.State}
            </Text>
          </TouchableOpacity>
        )}
        nestedScrollEnabled
      />
    </View>
  );
};

export default function CompleteYourProfile() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    phone: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    gender: null,
    avatarName: "StudyBuddy",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: "",
    phone: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    gender: "",
  });
  const [isAvatarSelectModalVisible, setIsAvatarSelectModalVisible] = useState(false);
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [pincodeNotFound, setPincodeNotFound] = useState(false);
  const [showAreaSelector, setShowAreaSelector] = useState(false);

  // Fetch pincode data when pincode is 6 digits
  useEffect(() => {
    const fetchPincodeData = async () => {
      if (userData.pincode.length === 6) {
        setIsPincodeLoading(true);
        setPincodeNotFound(false);
        setShowAreaSelector(true);
        
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${userData.pincode}`
          );
          const data: PincodeResponse[] = await response.json();
          
          if (data[0].Status === "Success" && data[0].PostOffice) {
            setPostOffices(data[0].PostOffice);
            setPincodeNotFound(false);
          } else {
            setPostOffices([]);
            setPincodeNotFound(true);
          }
        } catch (error) {
          console.error("Error fetching pincode data:", error);
          errorToast("Failed to fetch location details");
          setPostOffices([]);
          setPincodeNotFound(true);
        } finally {
          setIsPincodeLoading(false);
        }
      } else {
        setPostOffices([]);
        setShowAreaSelector(false);
        setPincodeNotFound(false);
      }
    };

    fetchPincodeData();
  }, [userData.pincode]);

  function handleChangeText(
    field: keyof Omit<UserDataType, "avatarName" | "gender">,
    value: string
  ) {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  }

  function handleChangeAvatar(avatarName: AvatarType) {
    setUserData((prev) => {
      return {
        ...prev,
        avatarName,
      };
    });
  }

  function handleGenderSelect(gender: GenderType) {
    setUserData((prev) => ({
      ...prev,
      gender: prev.gender === gender ? null : gender,
    }));

    if (validationErrors.gender) {
      setValidationErrors((prev) => ({
        ...prev,
        gender: "",
      }));
    }
  }

  function handleSelectArea(postOffice: PostOffice) {
    setUserData((prev) => ({
      ...prev,
      area: postOffice.Name,
      city: postOffice.District,
      state: postOffice.State,
    }));
    setShowAreaSelector(false);
    
    // Clear validation errors for auto-filled fields
    setValidationErrors((prev) => ({
      ...prev,
      area: "",
      city: "",
      state: "",
    }));
  }

  function validateField(field: keyof ValidationErrors, value: string | GenderType | null): string {
    switch (field) {
      case "name":
        if (!value || typeof value !== "string" || !value.trim()) return "Name is required";
        if (!nameValidation.regex.test(value.trim()))
          return nameValidation.message2;
        return "";

      case "phone":
        if (value && typeof value === "string" && !phoneNumberValidation.regex.test(value))
          return "Please enter a valid 10-digit phone number";
        return "";

      case "area":
        if (!value || typeof value !== "string" || !value.trim()) return "";
        if (value.trim().length < 2)
          return "Area must be at least 2 characters";
        if (value.trim().length > 100)
          return "Area must not exceed 100 characters";
        return "";

      case "city":
        if (!value || typeof value !== "string" || !value.trim()) return "";
        if (value.trim().length < 2)
          return "City must be at least 2 characters";
        if (value.trim().length > 100)
          return "City must not exceed 100 characters";
        return "";

      case "state":
        if (!value || typeof value !== "string" || !value.trim()) return "";
        if (value.trim().length < 2)
          return "State must be at least 2 characters";
        if (value.trim().length > 100)
          return "State must not exceed 100 characters";
        return "";

      case "pincode":
        if (!value || typeof value !== "string" || !value.trim()) return "";
        if (!/^\d{6}$/.test(value.trim()))
          return "Pincode must be exactly 6 digits";
        return "";

      case "landmark":
        if (!value || typeof value !== "string" || !value.trim()) return "";
        if (value.trim().length < 2)
          return "Landmark must be at least 2 characters";
        if (value.trim().length > 100)
          return "Landmark must not exceed 100 characters";
        return "";

      case "gender":
        return "";

      default:
        return "";
    }
  }

  function validation(): boolean {
    const errors: ValidationErrors = {
      name: validateField("name", userData.name),
      phone: validateField("phone", userData.phone),
      area: validateField("area", userData.area),
      city: validateField("city", userData.city),
      state: validateField("state", userData.state),
      pincode: validateField("pincode", userData.pincode),
      landmark: validateField("landmark", userData.landmark),
      gender: validateField("gender", userData.gender),
    };

    if (userData.avatarName == null) {
      errorToast("Please select an avatar");
      return false;
    }

    setValidationErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    return !hasErrors;
  }

  async function handleCompleteProfile() {
    if (user == null) return;

    if (!validation()) return;

    try {
      dispatch(setIsLoading(true));

      const res = await signUp({
        email: user.email,
        name: userData.name.trim(),
        phone: userData.phone.trim() === "" ? undefined : userData.phone.trim(),
        area: userData.area.trim() === "" ? undefined : userData.area.trim(),
        city: userData.city.trim() === "" ? undefined : userData.city.trim(),
        state: userData.state.trim() === "" ? undefined : userData.state.trim(),
        pincode: userData.pincode.trim() === "" ? undefined : userData.pincode.trim(),
        landmark: userData.landmark.trim() === "" ? undefined : userData.landmark.trim(),
        gender: userData.gender ?? undefined,
        avatarName: userData.avatarName,
      });

      successToast(res.message);

      if (res.data != null) {
        dispatch(setUser(res.data.user));
        await setAuthToken(res.data.token);
        router.replace("/account-success");
      }
    } catch {
      // Complete Profile error
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
          <View>
            <FormField
              label={content.nameFieldLabel}
              placeholder={content.nameFieldPlaceholder}
              value={userData.name}
              handleChangeText={(text) => handleChangeText("name", text)}
              icon={<AntDesign name="user" size={24} color="#666" />}
            />
            {validationErrors.name && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {validationErrors.name}
              </Text>
            )}
          </View>

          <View>
            <FormField
              label={content.mobileFieldLabel}
              placeholder={content.mobileFieldPlaceholder}
              value={userData.phone}
              handleChangeText={(text) => handleChangeText("phone", text)}
              inputType="number-pad"
              isMobileInput
              maxLength={10}
            />
            {validationErrors.phone && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {validationErrors.phone}
              </Text>
            )}
          </View>

          <FormField
            label={content.emailFieldLabel}
            placeholder={content.emailFieldPlaceholder}
            value={user.email}
            handleChangeText={() => {}}
            inputType="email-address"
            disabled
            icon={<AntDesign name="mail" size={24} color="#666" />}
          />

          <GenderSelector
            selectedGender={userData.gender}
            onGenderSelect={handleGenderSelect}
            error={validationErrors.gender}
          />

          <View>
            <FormField
              label="Pincode (Optional)"
              placeholder="Enter 6-digit pincode"
              value={userData.pincode}
              handleChangeText={(text) => handleChangeText("pincode", text)}
              inputType="number-pad"
              maxLength={6}
              icon={<MaterialIcons name="pin-drop" size={24} color="#666" />}
            />
            {validationErrors.pincode && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {validationErrors.pincode}
              </Text>
            )}
            
            {showAreaSelector && (
              <AreaSelector
                areas={postOffices}
                onSelectArea={handleSelectArea}
                loading={isPincodeLoading}
                noDataFound={pincodeNotFound}
              />
            )}
          </View>

          <View>
            <FormField
              label="Area (Optional)"
              placeholder="Select area from pincode or enter manually"
              value={userData.area}
              handleChangeText={(text) => handleChangeText("area", text)}
              icon={<MaterialIcons name="location-on" size={24} color="#666" />}
              maxLength={100}
            />
            {validationErrors.area && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {validationErrors.area}
              </Text>
            )}
          </View>

          <View>
            <FormField
              label="City (Optional)"
              placeholder="Auto-filled from pincode or enter manually"
              value={userData.city}
              handleChangeText={(text) => handleChangeText("city", text)}
              icon={
                <MaterialIcons name="location-city" size={24} color="#666" />
              }
              maxLength={100}
            />
            {validationErrors.city && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {validationErrors.city}
              </Text>
            )}
          </View>

          <View>
            <FormField
              label="State (Optional)"
              placeholder="Auto-filled from pincode or enter manually"
              value={userData.state}
              handleChangeText={(text) => handleChangeText("state", text)}
              icon={<Ionicons name="map" size={24} color="#666" />}
              maxLength={100}
            />
            {validationErrors.state && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {validationErrors.state}
              </Text>
            )}
          </View>

          <View>
            <FormField
              label="Landmark (Optional)"
              placeholder="Enter nearby landmark"
              value={userData.landmark}
              handleChangeText={(text) => handleChangeText("landmark", text)}
              icon={<MaterialIcons name="place" size={24} color="#666" />}
              maxLength={100}
            />
            {validationErrors.landmark && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {validationErrors.landmark}
              </Text>
            )}
          </View>
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
          handleModalClose={() => setIsAvatarSelectModalVisible(false)}
          selectedAvatarName={userData.avatarName ?? undefined}
          handleChangeAvatar={handleChangeAvatar}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}