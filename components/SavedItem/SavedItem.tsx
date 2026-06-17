import getCapitalizedText from "@/lib/getCapitalizedText";
import getImageURI from "@/lib/getImageURI";
import SavedType from "@/types/Saved.type";
import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import { Text, useWindowDimensions, View } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomImage from "../common/CustomImage";
import SaveButton from "../SaveButton/SaveButton";

export default function SavedItem({ item }: { item: SavedType }) {
  const { width } = useWindowDimensions();

  return (
    <CustomButton
      className="flex-row items-center bg-secondary rounded-xl border border-primary/5 px-2 py-4 gap-2"

      onPress={() => router.push(`/college/${item.id}` as RelativePathString)}
      debounce
    >
      <CustomImage
        image={{ uri: getImageURI(item.image) }}
        className="aspect-square rounded-xl"
        imageClassName="w-full h-full"
        style={{
          width: (width * 20) / 100,
        }}
      />

      <View className="flex-1 gap-2">
        <Text
          className="text-primary font-pSemiBold leading-5"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {getCapitalizedText(item.name)}
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="gap-2 flex-1 mr-2">
            <Text
              className="text-primary/50 text-sm font-pSemiBold mt-1"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {getCapitalizedText(item.categoryName)}
            </Text>

            <View className="flex-row items-center">
              <Ionicons name="location-sharp" size={16} color={"#ec0909"} />

              <Text
                className="text-red-500 text-xs font-pSemiBold ml-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.address.area}
              </Text>
            </View>
          </View>

          <View className="justify-center items-center self-center mb-8">
            <SaveButton item={item} />
          </View>
        </View>
      </View>
    </CustomButton>
  );
}
