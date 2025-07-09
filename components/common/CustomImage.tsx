import { Image, ImageSourcePropType, View, ViewProps } from "react-native";

type CustomImagePropsType = ViewProps & {
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
    ...props
}: CustomImagePropsType) {
    return (
        <View className={`overflow-hidden ${className}`} {...props}>
            <Image
                source={uri == null ? image : { uri }}
                className={`max-w-full max-h-full ${imageClassName}`}
            />
        </View>
    );
}
