import HomeCategory from "@/components/HomeCategory/HomeCategory";
import HomeColleges from "@/components/HomeColleges/HomeColleges";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeSavedColleges from "@/components/HomeSavedColleges/HomeSavedColleges";
import useGetCollegesByCategoryId from "@/hooks/useGetCollegesByCategoryId.hook";
import useGetParentCategories from "@/hooks/useGetParentCategories.hook";
import { ScrollView, View } from "react-native";

export default function Home() {
    const { isLoading, parentCategories } = useGetParentCategories();

    const { isLoading: isCollegesLoading, colleges } =
        useGetCollegesByCategoryId(isLoading, parentCategories[0]?.id);

    return (
        <View className="flex-1 bg-secondary">
            <HomeHeader />

            <ScrollView contentContainerClassName="gap-6 pb-20 pt-4">
                <HomeCategory
                    isLoading={isLoading}
                    parentCategories={parentCategories}
                />

                <HomeColleges
                    isLoading={isCollegesLoading}
                    colleges={colleges}
                    isCategoryFound={!isLoading && parentCategories.length > 0}
                />

                <HomeSavedColleges />
            </ScrollView>
        </View>
    );
}
