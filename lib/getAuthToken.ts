import envConfig from "@/config/env.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getAuthToken(): Promise<string | null> {
    try {
        const token = await AsyncStorage.getItem(envConfig.authTokenStorageKey);

        return token;
    } catch (error) {
        console.error("Error reading token from storage: ", error);

        return null;
    }
}
