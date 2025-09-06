import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
import CustomImage from "@/components/common/CustomImage";
import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import SaveButton from "@/components/SaveButton/SaveButton";
import useGetSubCategoriesOrColleges from "@/hooks/useGetSubCategoriesOrColleges.hook";
import chunkArray from "@/lib/chunkArray";
import getCapitalizedText from "@/lib/getCapitalizedText";
import getImageURI from "@/lib/getImageURI";
import CategoryType from "@/types/Category.type";
import CollegeType from "@/types/College.type";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, useWindowDimensions, View } from "react-native";

export default function List() {
    const { isLoading, categories, colleges } = useGetSubCategoriesOrColleges();

    if (isLoading) return <Loader fullscreen />;

    if (categories.length) return <Categories categories={categories} />;

    if (colleges.length) return <Colleges colleges={colleges} />;

    return (
        <NotFound
            heading="Not Found!"
            body="No sub categories or colleges found!"
        />
    );
}

function Categories({ categories }: { categories: CategoryType[] }) {
    const { width } = useWindowDimensions();
    const { categoryName } = useLocalSearchParams<{ categoryName: string }>();

    // Set padding
    const horizontalPadding = 16;

    // Determine items per row responsively
    let itemsPerRow = 5;
    if (width < 350) itemsPerRow = 3;
    else if (width < 500) itemsPerRow = 4;

    const gapBetweenItems = 8;
    const totalGap = (itemsPerRow - 1) * gapBetweenItems;
    const itemWidth = (width - totalGap - horizontalPadding * 2) / itemsPerRow;

    const chunked = chunkArray(categories, itemsPerRow);

    return (
        <>
            <CustomHeader title={`${getCapitalizedText(categoryName)}`} />

            <View
                style={{
                    paddingHorizontal: horizontalPadding,
                    paddingVertical: 24,
                }}
                className="bg-secondary flex-1"
            >
                <FlatList
                    data={chunked}
                    keyExtractor={(_, index) => `row-${index}`}
                    renderItem={({ item: row }) => (
                        <View className="flex-row justify-start mb-6">
                            {row.map((item, i) => (
                                <CustomButton
                                    key={item.id}
                                    style={{
                                        width: itemWidth,
                                        marginRight:
                                            i !== row.length - 1
                                                ? gapBetweenItems
                                                : 0,
                                        alignItems: "center",
                                    }}
                                    onPress={() =>
                                        router.push(
                                            `/list/${item.id}?categoryName=${item.name}`
                                        )
                                    }
                                    debounce
                                >
                                    <CustomImage
                                        image={{
                                            uri: getImageURI(item.imagePath),
                                        }}
                                        className="bg-secondary w-full aspect-square rounded-full"
                                        imageClassName="w-full h-full"
                                    />
                                    <Text className="text-xs text-primary font-pSemiBold text-center mt-2">
                                        {item.name}
                                    </Text>
                                </CustomButton>
                            ))}
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </>
    );
}

function Colleges({ colleges }: { colleges: CollegeType[] }) {
    const { width } = useWindowDimensions();
    const { categoryName } = useLocalSearchParams<{ categoryName: string }>();

    // Suggested UX-optimized item count
    let itemsPerRow = 4;
    if (width < 400) itemsPerRow = 1;
    else if (width < 600) itemsPerRow = 2;
    else if (width < 900) itemsPerRow = 3;

    const horizontalPadding = 16;
    const gapBetweenItems = 12;
    const totalGap = (itemsPerRow - 1) * gapBetweenItems;
    const itemWidth = (width - horizontalPadding * 2 - totalGap) / itemsPerRow;

    const chunked = chunkArray(colleges, itemsPerRow);

    return (
        <>
            <CustomHeader title={`${getCapitalizedText(categoryName)}`} />

            <View
                style={{
                    paddingHorizontal: horizontalPadding,
                    paddingVertical: 24,
                }}
                className="bg-secondary flex-1"
            >
                <FlatList
                    data={chunked}
                    keyExtractor={(_, index) => `row-${index}`}
                    renderItem={({ item: row }) => (
                        <View className="flex-row justify-start mb-6">
                            {row.map((item, i) => (
                                <CustomButton
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                                    style={{
                                        width: itemWidth,
                                        marginRight:
                                            i !== row.length - 1
                                                ? gapBetweenItems
                                                : 0,
                                    }}
                                    onPress={() =>
                                        router.push(`/college/${item.id}`)
                                    }
                                    debounce
                                >
                                    <CustomImage
                                        image={{
                                            uri: getImageURI(
                                                item.images.logo[0]
                                            ),
                                        }}
                                        className="w-full aspect-square rounded-none"
                                        imageClassName="w-full h-full"
                                    />

                                    <View className="flex-row px-2 py-3 justify-between">
                                        <View className="gap-2 flex-1 pr-2">
                                            <Text
                                                className="text-primary font-pSemiBold text-sm leading-5"
                                                numberOfLines={2}
                                            >
                                                {getCapitalizedText(item.name)}
                                            </Text>

                                            {/* <Text className="text-accent1 text-xs font-pSemiBold">
                                                ₹ {item.amountPaid}/month
                                            </Text> */}

                                            <View className="flex-row items-center">
                                                <AntDesign
                                                    name="star"
                                                    size={16}
                                                    color="orange"
                                                />

                                                <Text className="text-primary/50 text-sm font-pSemiBold mt-1">
                                                    4.5
                                                </Text>
                                            </View>

                                            <View className="flex-row items-center">
                                                <Ionicons
                                                    name="location-outline"
                                                    size={14}
                                                    color={"#999"}
                                                />
                                                <Text
                                                    className="text-primary/40 text-xs font-pSemiBold ml-1"
                                                    numberOfLines={1}
                                                >
                                                    {item.address.area}
                                                </Text>
                                            </View>
                                        </View>

                                        <SaveButton item={item} />
                                    </View>
                                </CustomButton>
                            ))}
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 32 }}
                />
            </View>
        </>
    );
}
