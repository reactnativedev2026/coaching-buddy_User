import Carousel from "@/components/common/Carousel";
import HomeCategory from "@/components/HomeCategory/HomeCategory";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeSavedColleges from "@/components/HomeSavedColleges/HomeSavedColleges";
import useGetMainBanners from "@/hooks/useGetMainBanners.hook";
import useGetParentCategories from "@/hooks/useGetParentCategories.hook";
import { ScrollView, View } from "react-native";

export default function Home() {
  const { isLoading, parentCategories } = useGetParentCategories();
  const { isLoading: mainBannerLoading, mainBanners } = useGetMainBanners();
  console.log(mainBanners,"::::::::::::::::")
  // const { isLoading: isCollegesLoading, colleges } =
  //     useGetCollegesByCategoryId(isLoading, parentCategories[0]?.id);

  return (
    <View className="flex-1 bg-secondary">
      <HomeHeader />

      <ScrollView contentContainerClassName="gap-6 pb-20 pt-4">
        <HomeCategory
          isLoading={isLoading}
          parentCategories={parentCategories}
        />
        {mainBanners && mainBanners.length > 0 && (
          <Carousel
            images={mainBanners}
            height={220}
            autoScrollInterval={4000}
            showIndicators={true}
            showTitle={true}
            borderRadius={16}
            enableAutoScroll={true}
            // onImagePress={handleImagePress}
          />
        )}

        {/* <HomeColleges
                    isLoading={isCollegesLoading}
                    colleges={colleges}
                    isCategoryFound={!isLoading && parentCategories.length > 0}
                /> */}

        <HomeSavedColleges />
      </ScrollView>
    </View>
  );
}
