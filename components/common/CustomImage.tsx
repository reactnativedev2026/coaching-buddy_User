import { Image, ImageSourcePropType, View } from "react-native";

type CustomImagePropsType = {
    image: ImageSourcePropType;
    uri?: string;
    className?: string;
    imageClassName?: string;
};

export default function CustomImage({
    image,
    uri,
    className,
    imageClassName,
}: CustomImagePropsType) {
    return (
        <View className={`overflow-hidden ${className}`}>
            <Image
                source={uri == null ? image : { uri }}
                className={`max-w-full max-h-full ${imageClassName}`}
            />
        </View>
    );
}
