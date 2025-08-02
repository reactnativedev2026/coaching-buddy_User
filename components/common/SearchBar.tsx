import content from "@/locales/en/searchBar.json";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router, usePathname } from "expo-router";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CustomButton from "./CustomButton";

type SearchBarPropsType = {
    search?: string;
    setSearch?: (text: string) => void;
    onSubmitEditing?: () => void;
};

export default function SearchBar({
    search = "",
    setSearch = () => {},
    onSubmitEditing = () => {},
}: SearchBarPropsType) {
    const pathname = usePathname();

    if (pathname !== "/search")
        return (
            <CustomButton
                className="bg-secondary flex-row items-center gap-2 px-4 border-t-hairline border-l-hairline border-r-hairline border-primary shadow-md rounded-xl relative"
                onPress={() => router.push("/search")}
            >
                <EvilIcons name="search" size={28} color="#999" />

                <Text className="py-4 border-none outline-none text-primary/50 text-sm font-pRegular flex-1">
                    {content.searchPlaceHolder}
                </Text>
            </CustomButton>
        );

    return (
        <View className="bg-secondary flex-row items-center gap-2 px-4 border-t-hairline border-l-hairline border-r-hairline border-primary shadow-md rounded-xl relative">
            <EvilIcons name="search" size={28} color="#999" />

            <TextInput
                placeholder={content.searchPlaceHolder}
                className="py-4 border-none outline-none text-primary text-sm font-pRegular flex-1"
                autoFocus={pathname === "/search" ? true : false}
                value={search}
                onChangeText={(text) => setSearch(text)}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
}
