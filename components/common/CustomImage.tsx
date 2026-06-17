import React, { useState } from "react";
import { Image, ImageSourcePropType, View, ViewProps } from "react-native";

type CustomImagePropsType = ViewProps & {
  image: ImageSourcePropType;      // default/local image
  uri?: string;                     // remote image URL
  className?: string;
  imageClassName?: string;
};

export default function CustomImage({
  image,
  uri,
  className = "",
  imageClassName = "",
  ...props
}: CustomImagePropsType) {
  const [fallback, setFallback] = useState(false);

  return (
    <View className={`overflow-hidden ${className}`} {...props}>
      <Image
        source={
          fallback
            ? { uri: "https://picsum.photos/seed/picsum/200" }
            : uri
              ? { uri }
              : image
        }
        onError={() => setFallback(true)}                    
        className={`max-w-full max-h-full ${imageClassName}`}
      />
    </View>
  );
}
