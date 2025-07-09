const envConfig = {
    // serverl url
    serverUrl: process.env.EXPO_PUBLIC_SERVER_URL!,

    // AsyncStorage keys
    authTokenStorageKey: process.env.EXPO_PUBLIC_AUTH_TOKEN_STORAGE_KEY!,
    savedStorageKey: process.env.EXPO_PUBLIC_SAVED_STORAGE_KEY!,
};

export default envConfig;
