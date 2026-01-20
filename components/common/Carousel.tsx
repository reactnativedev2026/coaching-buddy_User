import getImageURI from "@/lib/getImageURI";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export interface CarouselItem {
    id: string;
    url: string;
    title?: string;
}

export interface CarouselProps {
    images: CarouselItem[];
    autoScrollInterval?: number;
    height?: number;
    showIndicators?: boolean;
    showTitle?: boolean;
    borderRadius?: number;
    enableAutoScroll?: boolean;
    onImagePress?: (item: CarouselItem, index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
    images,
    autoScrollInterval = 3000,
    height = 200,
    showIndicators = true,
    showTitle = false,
    borderRadius = 12,
    enableAutoScroll = true,
    onImagePress,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const autoScrollTimer = useRef<NodeJS.Timeout | null | number>(null);
    const userInteractionTimer = useRef<NodeJS.Timeout | null | number>(null);

    // Create infinite scroll by duplicating images
    const extendedImages = React.useMemo(() => {
        if (images.length === 0) return [];
        if (images.length === 1) return images;

        // Create triple array for smooth infinite scroll
        return [...images, ...images, ...images];
    }, [images]);

    const totalImages = images.length;
    const startIndex = totalImages; // Start from the middle set

    // Initialize scroll position
    useEffect(() => {
        if (extendedImages.length > 0 && totalImages > 1) {
            setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    x: startIndex * screenWidth,
                    animated: false,
                });
                setCurrentIndex(startIndex);
            }, 100);
        }
    }, [extendedImages.length, totalImages, startIndex]);

    const clearTimers = useCallback(() => {
        if (autoScrollTimer.current) {
            clearTimeout(autoScrollTimer.current);
            autoScrollTimer.current = null;
        }
        if (userInteractionTimer.current) {
            clearTimeout(userInteractionTimer.current);
            userInteractionTimer.current = null;
        }
    }, []);

    // Fixed auto scroll function
    const startAutoScroll = useCallback(() => {
        if (!enableAutoScroll || totalImages <= 1 || isUserInteracting) return;

        clearTimers();

        autoScrollTimer.current = setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                // Scroll to the next index
                setTimeout(() => {
                    scrollViewRef.current?.scrollTo({
                        x: nextIndex * screenWidth,
                        animated: true,
                    });
                }, 0);

                return nextIndex;
            });
        }, autoScrollInterval);
    }, [
        enableAutoScroll,
        totalImages,
        isUserInteracting,
        autoScrollInterval,
        clearTimers,
    ]);

    // Handle auto scroll with proper dependency management
    useEffect(() => {
        if (enableAutoScroll && !isUserInteracting && totalImages > 1) {
            startAutoScroll();
        }

        return () => clearTimers();
    }, [
        currentIndex,
        enableAutoScroll,
        isUserInteracting,
        totalImages,
        startAutoScroll,
        clearTimers,
    ]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isUserInteracting) {
            const scrollX = event.nativeEvent.contentOffset.x;
            const index = Math.round(scrollX / screenWidth);
            setCurrentIndex(index);
        }
    };

    const handleScrollBeginDrag = () => {
        setIsUserInteracting(true);
        clearTimers();
    };

    const handleScrollEndDrag = () => {
        // Let momentum scrolling finish first
    };

    const handleMomentumScrollEnd = () => {
        if (totalImages <= 1) return;

        // Handle infinite scroll boundaries
        if (currentIndex >= totalImages * 2) {
            // At the end of the second set, jump to the start of the first set
            setTimeout(() => {
                const targetIndex = currentIndex - totalImages;
                scrollViewRef.current?.scrollTo({
                    x: targetIndex * screenWidth,
                    animated: false,
                });
                setCurrentIndex(targetIndex);
            }, 50);
        } else if (currentIndex < totalImages) {
            // At the start of the first set, jump to the start of the second set
            setTimeout(() => {
                const targetIndex = currentIndex + totalImages;
                scrollViewRef.current?.scrollTo({
                    x: targetIndex * screenWidth,
                    animated: false,
                });
                setCurrentIndex(targetIndex);
            }, 50);
        }

        // Resume auto scroll after user interaction with a delay
        if (userInteractionTimer.current) {
            clearTimeout(userInteractionTimer.current);
        }

        userInteractionTimer.current = setTimeout(() => {
            setIsUserInteracting(false);
        }, 1500); // Increased delay for better UX
    };

    const goToSlide = (index: number) => {
        clearTimers();
        setIsUserInteracting(true);

        const targetIndex = startIndex + index;
        setCurrentIndex(targetIndex);

        scrollViewRef.current?.scrollTo({
            x: targetIndex * screenWidth,
            animated: true,
        });

        // Resume auto scroll after manual navigation
        if (userInteractionTimer.current) {
            clearTimeout(userInteractionTimer.current);
        }
        userInteractionTimer.current = setTimeout(() => {
            setIsUserInteracting(false);
        }, 2000);
    };

    const getCurrentRealIndex = () => {
        return currentIndex % totalImages;
    };

    const handleImagePress = (item: CarouselItem, index: number) => {
        const realIndex = getCurrentRealIndex();
        onImagePress?.(images[realIndex], realIndex);
    };

    // calculate height according to screen width for 16:9 ratio
    height = (screenWidth * 9) / 16;

    if (images.length === 0) {
        return (
            <View
                style={[
                    styles.container,
                    { height, backgroundColor: "#f8f9fa" },
                ]}
            >
                <View style={styles.noImagesContainer}>
                    <Text style={styles.noImagesText}>
                        No images to display
                    </Text>
                </View>
            </View>
        );
    }

    if (images.length === 1) {
        return (
            <View
                style={[
                    styles.container,
                    { height, backgroundColor: "#f8f9fa" },
                ]}
            >
                <TouchableOpacity
                    style={[styles.imageContainer, { borderRadius }]}
                    onPress={() => handleImagePress(images[0], 0)}
                    activeOpacity={0.95}
                >
                    <Image
                        source={{ uri: getImageURI(images[0].url) }}
                        style={[styles.image, { borderRadius }]}
                        resizeMode="cover"
                    />
                    {showTitle && images[0].title && (
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{images[0].title}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { height }]}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBeginDrag}
                onScrollEndDrag={handleScrollEndDrag}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={screenWidth}
                snapToAlignment="start"
                style={styles.scrollView}
            >
                {extendedImages.map((item, index) => (
                    <TouchableOpacity
                        key={`${item.id}-${index}`}
                        style={[styles.imageContainer, { borderRadius }]}
                        onPress={() => handleImagePress(item, index)}
                        activeOpacity={0.95}
                    >
                        <Image
                            source={{ uri: getImageURI(item.url) }}
                            style={[styles.image, { borderRadius }]}
                            resizeMode="cover"
                        />
                        {showTitle && item.title && (
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {showIndicators && totalImages > 1 && (
                <View style={styles.indicatorContainer}>
                    {images.map((_, index) => {
                        const isActive = getCurrentRealIndex() === index;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.indicator,
                                    {
                                        backgroundColor: isActive
                                            ? "#0d9488"
                                            : "rgba(255, 255, 255, 0.5)",
                                        width: isActive ? 24 : 8,
                                        opacity: isActive ? 1 : 0.6,
                                    },
                                ]}
                                onPress={() => goToSlide(index)}
                                activeOpacity={0.7}
                            />
                        );
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        position: "relative",
        overflow: "hidden",
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        width: screenWidth,
        height: "100%",
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: screenWidth - 24,
        height: "100%",
        backgroundColor: "#f0f0f0",
    },
    titleContainer: {
        position: "absolute",
        bottom: 20,
        left: 50,
        right: 50,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backdropFilter: "blur(10px)",
    },
    title: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 20,
    },
    indicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 5,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    indicator: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: "#fff",
    },
    noImagesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noImagesText: {
        textAlign: "center",
        color: "#666",
        fontSize: 16,
        fontWeight: "500",
    },
});
export default Carousel;
