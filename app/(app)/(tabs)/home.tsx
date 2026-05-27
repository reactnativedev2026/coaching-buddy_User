import Carousel from "@/components/common/Carousel";
import SearchBar from "@/components/common/SearchBar";
import WelcomeModal from "@/components/common/WelcomeModal";
import HomeCategory from "@/components/HomeCategory/HomeCategory";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeSavedColleges from "@/components/HomeSavedColleges/HomeSavedColleges";
import useGetMainBanners from "@/hooks/useGetMainBanners.hook";
import useGetParentCategories from "@/hooks/useGetParentCategories.hook";
import { useEffect, useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";

let hasShownWelcomeModal = false;

export default function Home() {
    const { isLoading, parentCategories } = useGetParentCategories();
    const { isLoading: mainBannerLoading, mainBanners } = useGetMainBanners();
    const { height: screenHeight } = useWindowDimensions();

    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        if (!hasShownWelcomeModal) {
            setShowWelcome(true);
            hasShownWelcomeModal = true;
        }
    }, []);

    // console.log("screenWidth ", screenWidth);
    // console.log("screenHeight ", screenHeight);

    // console.log(mainBanners, "::::::::::::::::");
    // const { isLoading: isCollegesLoading, colleges } =
    //     useGetCollegesByCategoryId(isLoading, parentCategories[0]?.id);

    return (
        <View className="flex-1 bg-secondary">
            <HomeHeader />
            <View className="px-4 mt-4">
                <SearchBar />
            </View>
            <ScrollView contentContainerClassName="gap-6 pb-20 pt-4">
                {mainBanners && mainBanners.length > 0 && (
                    <Carousel
                        images={mainBanners}
                        height={(screenHeight * 35) / 100}
                        autoScrollInterval={4000}
                        showIndicators={true}
                        // showTitle={true}
                        borderRadius={16}
                        enableAutoScroll={true}
                    // onImagePress={handleImagePress}
                    />
                )}
                <HomeCategory
                    isLoading={isLoading}
                    parentCategories={parentCategories}
                />


                {/* <HomeColleges
                    isLoading={isCollegesLoading}
                    colleges={colleges}
                    isCategoryFound={!isLoading && parentCategories.length > 0}
                /> */}

                <HomeSavedColleges />
            </ScrollView>
            <WelcomeModal
                visible={showWelcome}
                onClose={() => setShowWelcome(false)}
            />
        </View>
    );
}
