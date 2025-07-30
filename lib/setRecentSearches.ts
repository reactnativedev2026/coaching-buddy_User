import envConfig from "@/config/env.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function setRecentSearches(recentSearchesData: string[]) {
    try {
        await AsyncStorage.setItem(
            envConfig.recentSearchesStorageKey,
            JSON.stringify(recentSearchesData)
        );
    } catch (error) {
        // console.error(error);
        // console.log('setRecentSearches async storage error log');
    }
}
