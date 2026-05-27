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
                <View className="flex-1 px-4 pt-4">
                    <FlatList
                        data={saved}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 30,
                        }}
                        ItemSeparatorComponent={() => <View className="h-4" />}
                        renderItem={({ item }) => (
                            <View
                                className="bg-white rounded-2xl p-1"
                            >
                                <SavedItem item={item} />
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
