import envConfig from "@/config/env.config";
import SavedType from "@/types/Saved.type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getSaved(): Promise<SavedType[] | null> {
    try {
        const saved = await AsyncStorage.getItem(envConfig.savedStorageKey);

        if (saved == null) return saved;

        return JSON.parse(saved);
    } catch (error) {
        console.error("Error reading saved from storage: ", error);

        return null;
    }
}
