import {
    FontAwesome,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";

export default function CustomTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const getIcon = (routeName: string, isFocused: boolean) => {
        const activeColor = "#006EFF";
        const inactiveColor = "#888";

        switch (routeName) {
            case "home":
                return (
                    <Ionicons
                        name="home"
                        size={22}
                        color={isFocused ? activeColor : inactiveColor}
                    />
                );
            case "booking":
                return (
                    <FontAwesome5
                        name="table"
                        size={20}
                        color={isFocused ? activeColor : inactiveColor}
                    />
                );
            case "favorite":
                return (
                    <MaterialCommunityIcons
                        name={isFocused ? "bookmark" : "bookmark-outline"}
                        size={24}
                        color={isFocused ? activeColor : inactiveColor}
                    />
                );
            case "(profile)":
                return (
                    <FontAwesome
                        name={isFocused ? "user" : "user-o"}
                        size={22}
                        color={isFocused ? activeColor : inactiveColor}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View
            className="flex-row bg-white border-t border-gray-200"
            style={{
                height: 60,
                paddingVertical: 10,
            }}
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                const routeName =
                    route.name === "(profile)"
                        ? "Profile"
                        : route.name.slice(0, 1).toUpperCase() +
                          route.name.slice(1);

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        className="flex-1 h-full items-center justify-center"
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={
                            descriptors[route.key].options
                                .tabBarAccessibilityLabel
                        }
                    >
                        <View className="items-center justify-center gap-1">
                            {getIcon(route.name, isFocused)}

                            <Text
                                className={
                                    isFocused
                                        ? "text-accent1 text-xs font-pSemiBold"
                                        : "text-primary text-xs font-pSemiBold"
                                }
                            >
                                {routeName}
                            </Text>

                            {isFocused && (
                                <View className="w-1.5 h-1.5 rounded-full bg-accent1" />
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
