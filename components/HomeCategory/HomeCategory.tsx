import getCapitalizedText from "@/lib/getCapitalizedText";
import CategoryType from "@/types/Category.type";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import CustomButton from "../common/CustomButton";

type HomeCategoryPropsType = {
    isLoading: boolean;
    parentCategories: CategoryType[];
};

export default function HomeCategory({
    isLoading,
    parentCategories,
}: HomeCategoryPropsType) {
    const skeletonCategories = Array(10).fill(1);

    return (
        <View>
            <FlatList
                data={isLoading ? skeletonCategories : parentCategories}
                contentContainerClassName="px-4"
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    if (isLoading) return <CategoryItemLoadingSkeleton />;

                    return (
                        <CategoryItem
                            category={item}
                            isSelected={index === 0}
                        />
                    );
                }}
                ItemSeparatorComponent={() => <View className="w-4" />}
            />
        </View>
    );
}

function CategoryItem({
    category,
    isSelected,
}: {
    category: CategoryType;
    isSelected: boolean;
}) {
    return (
        <CustomButton
            className={`px-4 py-2 rounded-full  ${isSelected ? "bg-accent1/10" : "bg-primary/10"}`}
            onPress={() =>
                router.push(
                    `/list/${category.id}?categoryName=${category.name}`
                )
            }
            debounce
        >
            <Text
                className={`text-xs font-pSemiBold  ${isSelected ? "text-accent1" : "text-primary"}`}
            >
                {getCapitalizedText(category.name)}
            </Text>
        </CustomButton>
    );
}

function CategoryItemLoadingSkeleton() {
    return (
        <View className="w-20 h-8 px-4 py-2 rounded-full bg-primary/10 animate-pulse" />
    );
}
