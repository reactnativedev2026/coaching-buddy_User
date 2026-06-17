import envConfig from "@/config/env.config";
import SavedType from "@/types/Saved.type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function setSaved(saved: SavedType[]) {
    try {
        await AsyncStorage.setItem(
            envConfig.savedStorageKey,
            JSON.stringify(saved)
        );
    } catch (error) {
        console.error("Error setting saved to storage: ", error);
    }
}
