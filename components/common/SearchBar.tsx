import content from "@/locales/en/searchBar.json";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function SearchBar() {
    return (
        <View className="bg-secondary flex-row items-center gap-2 px-4 border-t-hairline border-l-hairline border-r-hairline border-primary shadow-md rounded-xl">
            <EvilIcons name="search" size={28} color="#999" />

            <TextInput
                placeholder={content.searchPlaceHolder}
                className="py-3 border-none outline-none text-primary text-sm font-pRegular"
            />
        </View>
    );
}
