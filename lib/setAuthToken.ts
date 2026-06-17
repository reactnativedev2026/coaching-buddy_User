import envConfig from "@/config/env.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function setAuthToken(token: string) {
    try {
        await AsyncStorage.setItem(envConfig.authTokenStorageKey, token);
    } catch (error) {
        // console.error("Error setting token in storage: ", error);
    }
}
