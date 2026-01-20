import getImageURI from "@/lib/getImageURI";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageViewing from "react-native-image-viewing";
import CustomButton from "../CustomButton";
import CustomImage from "../CustomImage";

export default function ImagesCarousel({ images }: { images: string[] }) {
    const { width, height } = useWindowDimensions();

    const extendedImages = [images[images.length - 1], ...images, images[0]];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerVisible, setIsViewerVisible] = useState(false);

    const scrollRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(width)).current;
    const autoSlideInterval = useRef<NodeJS.Timeout | number | null>(null);
    const thumbnailRef = useRef<FlatList<any>>(null);

    const visibleThumbnails = 5;
    const thumbnailSize = 64 + 8;
    const sidePadding = (width - visibleThumbnails * thumbnailSize) / 2;

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollTo({ x: width, animated: false });
        }, 0);
    }, []);

    useEffect(() => {
        if (thumbnailRef.current) {
            thumbnailRef.current.scrollToIndex({
                index: currentIndex,
                viewPosition: 0.5,
                animated: true,
            });
        }
    }, [currentIndex]);

    const goToIndex = (index: number) => {
        scrollRef.current?.scrollTo({
            x: (index + 1) * width,
            animated: true,
        });
        setCurrentIndex(index);
    };

    const goToNext = () => {
        const nextIndex = currentIndex + 1;
        scrollRef.current?.scrollTo({
            x: (nextIndex + 1) * width,
            animated: true,
        });
    };

    useEffect(() => {
        if (isViewerVisible) {
            return;
        }

        autoSlideInterval.current = setInterval(goToNext, 3000);

        return () => {
            if (autoSlideInterval.current)
                clearInterval(autoSlideInterval.current);
        };
    }, [isViewerVisible, currentIndex]);

    const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const rawIndex = Math.round(offsetX / width);

        if (rawIndex === 0) {
            scrollRef.current?.scrollTo({
                x: width * images.length,
                animated: false,
            });
            setCurrentIndex(images.length - 1);
        } else if (rawIndex === extendedImages.length - 1) {
            scrollRef.current?.scrollTo({
                x: width,
                animated: false,
            });
            setCurrentIndex(0);
        } else {
            setCurrentIndex(rawIndex - 1);
        }
    };

    return (
        <>
            <View
                className="relative w-full overflow-hidden"
                style={{ height: height * 0.33 }}
            >
                {/* Main ScrollView Carousel with tap-to-zoom */}
                <Animated.ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScrollEnd}
                    scrollEventThrottle={16}
                >
                    {extendedImages.map((img, index) => (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => {
                                setIsViewerVisible(true);
                            }}
                        >
                            <CustomImage
                                image={{ uri: getImageURI(img) }}
                                className="w-full h-full"
                                imageClassName="w-full h-full rounded-xl"
                                style={{ width }}
                            />
                        </TouchableWithoutFeedback>
                    ))}
                </Animated.ScrollView>

                {/* Thumbnails */}
                <View className="absolute bottom-2 max-w-[80%] w-auto self-center items-center justify-center rounded-xl overflow-hidden bg-secondary p-1">
                    <FlatList
                        ref={thumbnailRef}
                        data={images}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 8 }}
                        ItemSeparatorComponent={() => <View className="w-2" />}
                        keyExtractor={(_, i) => i.toString()}
                        getItemLayout={(_, index) => ({
                            length: 72,
                            offset: 72 * index,
                            index,
                        })}
                        renderItem={({ item, index }) => (
                            <CustomButton onPress={() => goToIndex(index)}>
                                <CustomImage
                                    image={{ uri: getImageURI(item) }}
                                    className={`w-16 aspect-square rounded-md ${
                                        index === currentIndex
                                            ? "border-2 border-white"
                                            : "opacity-70"
                                    }`}
                                    imageClassName="w-full h-full rounded-md"
                                />
                            </CustomButton>
                        )}
                    />
                </View>
            </View>

            {/* Zoom Modal Viewer */}
            <ImageViewing
                keyExtractor={(image, index) => index.toString()}
                images={images.map((img) => ({ uri: getImageURI(img) }))}
                imageIndex={currentIndex}
                visible={isViewerVisible}
                onRequestClose={() => {
                    setIsViewerVisible(false);
                }}
                swipeToCloseEnabled
            />
        </>
    );
}
