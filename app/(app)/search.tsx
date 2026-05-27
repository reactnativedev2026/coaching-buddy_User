import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import SearchBar from "@/components/common/SearchBar";
import envConfig from "@/config/env.config";
import useGetSearchedColleges from "@/hooks/useGetSearchedColleges.hook";
import chunkArray from "@/lib/chunkArray";
import getCapitalizedText from "@/lib/getCapitalizedText";
import getRecentSearches from "@/lib/getRecentSearches";
import asyncSetRecentSearches from "@/lib/setRecentSearches";
import { useAppSelector } from "@/redux/store";
import SearchCollegesSuggestionsType from "@/types/SearchCollegeSuggestions.type";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

export default function Search() {
    const { q } = useLocalSearchParams<{
        q: string;
    }>();
    const { width } = useWindowDimensions();
    const [search, setSearch] = useState("");
    const { isLoading, colleges } = useGetSearchedColleges(search);
    // const { isLoading: isSearchSuggestionsLoading, suggestions } =
    //     useGetSearchCollegesSuggestions(search);
    // const [searchSuggestionsVisible, setSearchSuggestionsVisible] =
    //     useState(false);
    const { isAuthenticated } = useAppSelector((state) => state.user);


    // useEffect(() => {
    //     setSearchSuggestionsVisible(false);

    //     if (q == null) return;

    //     setSearch(q);
    // }, [q]);

    // useEffect(() => {
    //     if (search.trim() !== "") {
    //         setSearchSuggestionsVisible(true);
    //     } else {
    //         setSearchSuggestionsVisible(false);
    //     }
    // }, [search]);

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

    let heading = "Try searching something!";

    if (q != null && q.trim() !== "") {
        let queryLength = q.trim().length;

        let headingBaseText = "Search results for ";

        if (queryLength > 15)
            heading =
                headingBaseText +
                getCapitalizedText(q.trim()).slice(0, 15) +
                "...";
        else heading = headingBaseText + getCapitalizedText(q.trim());
    }

    const handleSelectSuggestion = (item: SearchCollegesSuggestionsType) => {
        // setSearchSuggestionsVisible(false); // Hide immediately
        setSearch(item.name);

        setTimeout(() => {
            router.setParams({ q: item.name });
        }, 0); // Ensure state updates first, then navigate
    };

    return (
        <>
            <CustomHeader title={heading} />

            <View className="flex-1 bg-secondary">
                <View className="relative px-4 py-4 items-center justify-center">
                    <SearchBar
                        search={search}
                        setSearch={(text) => setSearch(text)}
                        onSubmitEditing={() => {
                            if (search.trim() === "") return;
                            // setSearchSuggestionsVisible(false);
                            router.setParams({
                                q: search.trim(),
                            });
                        }}
                    />

                    {/* <SearchSuggestionsList
                        visible={
                            searchSuggestionsVisible && search.trim() !== ""
                        }
                        suggestions={suggestions}
                        onSelect={handleSelectSuggestion}
                        loading={isSearchSuggestionsLoading}
                    /> */}
                </View>

                <RecentSearches />

                {isLoading ? (
                    <Loader fullscreen />
                ) : search.trim() === "" ? (
                    <NotFound heading="Start typing..." body="Search colleges to see results" />
                ) : colleges.length === 0 ? (
                    <NotFound heading="Not Found!" body="No colleges found!" />
                ) : (
                    <View
                        style={{
                            paddingHorizontal: horizontalPadding,
                            paddingVertical: 24,
                        }}
                        className="bg-secondary flex-1"
                    >
                        <View className="flex-row items-center justify-between mb-4 px-1">
                            {/* Left Title */}
                            <Text className="text-[#6B7280] text-[13px] font-pBold tracking-wider">
                                AVAILABLE INSTITUTIONS
                            </Text>

                            {/* Right Filter */}
                            <CustomButton
                                className="flex-row items-center"
                                onPress={() => {
                                    // open filter modal here
                                }}
                                debounce
                            >
                                <Text className="text-[#F59E0B] text-[13px] font-pSemiBold mr-1">
                                    Filter
                                </Text>

                                <Ionicons
                                    name="options-outline"
                                    size={15}
                                    color="#F59E0B"
                                />
                            </CustomButton>
                        </View>
                        <FlatList
                            data={colleges}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 32,
                            }}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 12 }} />
                            )}
                            renderItem={({ item }) => (
                                <CustomButton
                                    className="bg-white rounded-2xl border border-[#ccc]"
                                    style={{
                                        paddingHorizontal: 16,
                                        paddingVertical: 16,
                                        elevation : 3,
                                    }}
                                    onPress={() => {
                                        if (!isAuthenticated) {
                                            router.push("/login");
                                            return;
                                        }

                                        router.push(`/college/${item.id}`);
                                    }}
                                    debounce
                                >
                                    <View className="flex-row items-center justify-between">
                                        {/* Left Content */}
                                        <View className="flex-1 pr-3">
                                            <Text
                                                className="text-primary font-pBold text-[17px]"
                                                numberOfLines={1}
                                            >
                                                {getCapitalizedText(item.name)}
                                            </Text>

                                            <Text
                                                className="text-[#8A8A8A] text-[13px] mt-1 font-pMedium"
                                                numberOfLines={1}
                                            >
                                                {item.categories[0]?.name ||
                                                    item.categories[0]?.name ||
                                                    "Institute"}
                                            </Text>
                                        </View>

                                        {/* Right Arrow */}
                                        <View className="items-center justify-center">
                                            <Ionicons
                                                name="chevron-forward"
                                                size={20}
                                                color="#9CA3AF"
                                            />
                                        </View>
                                    </View>
                                </CustomButton>
                            )}
                        />
                    </View>
                )}
            </View>
        </>
    );
}

function RecentSearches() {
    const { q } = useLocalSearchParams<{
        q: string;
    }>();

    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const recentSearchesSize = envConfig.recentSearchesSize;
    const [recentSearchesLoading, setRecentSearchesLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        (async function () {
            try {
                let data = await getRecentSearches();

                if (data == null) data = [];

                if (q != null && q?.trim() !== "") data.unshift(q);

                data = data.filter(
                    (item) => item != null && item?.trim() !== ""
                );

                data = Array.from(new Set(data));

                if (data.length > recentSearchesSize) {
                    data.pop();
                }

                setRecentSearches(data);
                setRecentSearchesLoading(false);
                await asyncSetRecentSearches(data);

                if (flatListRef != null) {
                    flatListRef.current?.scrollToOffset({
                        offset: 0,
                        animated: true,
                    });
                }
            } catch (error) {
                // console.error(error);
                // console.log('search page use effect error log');
            }
        })();
    }, [q]);

    const skeletonRecentSearches = Array(10).fill(1);

    return (
        <View>
            <FlatList
                data={
                    recentSearchesLoading
                        ? skeletonRecentSearches
                        : recentSearches
                }
                ref={flatListRef}
                contentContainerClassName="px-4"
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    if (recentSearchesLoading)
                        return <RecentSearchItemLoadingSkeleton />;

                    return (
                        <RecentSearchItem
                            title={item}
                            isSelected={q?.trim() === item?.trim()}
                        />
                    );
                }}
                ItemSeparatorComponent={() => <View className="w-4" />}
            />
        </View>
    );
}

function RecentSearchItem({
    title,
    isSelected,
}: {
    title: string;
    isSelected: boolean;
}) {
    return (
        <CustomButton
            className={`px-4 py-2 rounded-full  ${isSelected ? "bg-accent1/10" : "bg-primary/10"}`}
            onPress={() =>
                router.setParams({
                    q: title,
                })
            }
            debounce
        >
            <Text
                className={`text-xs font-pSemiBold  ${isSelected ? "text-accent1" : "text-primary"}`}
            >
                {getCapitalizedText(title)}
            </Text>
        </CustomButton>
    );
}

function RecentSearchItemLoadingSkeleton() {
    return (
        <View className="w-20 h-8 px-4 py-2 rounded-full bg-primary/10 animate-pulse" />
    );
}

type SearchSuggestionsPropsType = {
    visible: boolean;
    suggestions: SearchCollegesSuggestionsType[];
    onSelect: (suggestion: SearchCollegesSuggestionsType) => void;
    loading?: boolean;
};

function SearchSuggestionsList({
    visible,
    suggestions,
    onSelect,
    loading,
}: SearchSuggestionsPropsType) {
    if (!visible || (!loading && suggestions.length === 0)) return null;

    return (
        <View className="absolute top-full w-full bg-secondary rounded-lg shadow-md z-10 max-h-[30vh] py-4">
            {loading ? (
                <Loader />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {suggestions.map((item) => (
                        <CustomButton
                            key={item.id}
                            className="p-4 border-b border-gray-100"
                            onPress={() => onSelect(item)}
                        >
                            <Text className="text-primary font-pMedium text-sm">
                                {getCapitalizedText(item.name)}
                            </Text>
                            {item.city && (
                                <Text className="text-primary/50 text-xs">
                                    {item.city}
                                </Text>
                            )}
                        </CustomButton>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
