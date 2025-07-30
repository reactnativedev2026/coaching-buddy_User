import CustomHeader from "@/components/common/CustomHeader";
import NotFound from "@/components/common/NotFound";
import SavedItem from "@/components/SavedItem/SavedItem";
import { useAppSelector } from "@/redux/store";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Favorite() {
    const { saved } = useAppSelector((state) => state.saved);

    return (
        <View className="flex-1 bg-secondary">
            <CustomHeader title="Favorite" />

            {saved.length === 0 ? (
                <NotFound
                    heading="No saved items found!"
                    body="You haven't saved anything yet!"
                />
            ) : (
                <View className="px-4 py-4">
                    <FlatList
                        data={saved}
                        renderItem={({ item }) => <SavedItem item={item} />}
                    />
                </View>
            )}
        </View>
    );
}
