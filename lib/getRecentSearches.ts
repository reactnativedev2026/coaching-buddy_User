import envConfig from "@/config/env.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getRecentSearches(): Promise<string[] | null> {
    try {
        let recentSearches;

        recentSearches = await AsyncStorage.getItem(
            envConfig.recentSearchesStorageKey
        );

        if (recentSearches == null) return null;

        return JSON.parse(recentSearches);
    } catch (error) {
        // console.error(error);
        // console.log('getRecentSearches async storage error log');
        return null;
    }
}
