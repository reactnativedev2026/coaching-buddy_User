import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";

type RatingsPropsType = {
    rating: number;
    className?: string;
    iconSize?: number;
};

export default function Ratings({
    rating,
    className,
    iconSize = 16,
}: RatingsPropsType) {
    const fullStars = parseInt(rating.toString());
    const halfStar = rating.toString().split(".")[1];
    let numberOfStars = fullStars;

    if (halfStar != null) numberOfStars += 1;

    const stars = Array(numberOfStars).fill(
        <FontAwesome name="star" size={iconSize} color={"orange"} />
    );

    if (halfStar != null)
        stars.push(
            <FontAwesome
                name="star-half-empty"
                size={iconSize}
                color={"orange"}
            />
        );

    return (
        <View className={`flex-row items-center justify-end ${className}`}>
            {stars.map((item, i) => (
                <View key={i}>{item}</View>
            ))}
        </View>
    );
}
