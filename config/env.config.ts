const envConfig = {
    // serverl url
    serverUrl: process.env.EXPO_PUBLIC_SERVER_URL!,

    // AsyncStorage keys
    authTokenStorageKey: process.env.EXPO_PUBLIC_AUTH_TOKEN_STORAGE_KEY!,
    savedStorageKey: process.env.EXPO_PUBLIC_SAVED_STORAGE_KEY!,
    recentSearchesStorageKey:
        process.env.EXPO_PUBLIC_RECENT_SEARCHES_STORAGE_KEY!,

    // Recent searches size (5)
    recentSearchesSize:
        process.env.EXPO_PUBLIC_RECENT_SEARCHES_SIZE != null &&
        !isNaN(parseInt(process.env.EXPO_PUBLIC_RECENT_SEARCHES_SIZE))
            ? parseInt(process.env.EXPO_PUBLIC_RECENT_SEARCHES_SIZE)
            : 5,
};

export default envConfig;
