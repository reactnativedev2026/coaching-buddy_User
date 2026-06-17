import envConfig from "@/config/env.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function deleteAuthToken() {
    try {
        await AsyncStorage.removeItem(envConfig.authTokenStorageKey);
    } catch (error) {
        // console.error("Error deleting token in storage: ", error);
    }
}
