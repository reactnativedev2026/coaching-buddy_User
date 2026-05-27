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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, ScrollView, Text, useWindowDimensions, View } from "react-native";
export default function List() {
  const { isLoading, categories, colleges } = useGetSubCategoriesOrColleges();
  // console.log("categories ", categories);
  // console.log("colleges ", colleges);

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
  useEffect(() => {
    console.log("CHUNKED", chunked)

  }, [])


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
                      `/list/${item.id}?categoryName=${item.name}`,
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
                  {item.showTag === 1 && (
                    <View className="absolute -top-0 -right-2 bg-red-500 px-2 py-1 rounded-full min-w-6 items-center justify-center">
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "600",
                          fontSize: 10,
                        }}
                      >
                        {(item?.tag?.length ?? 0) > 0
                          ? item.tag!.length > 8
                            ? item.tag!.slice(
                              0,
                              8,
                            ) + "..."
                            : item.tag
                          : "Unavailable"}
                      </Text>
                    </View>
                  )}
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
  const { categoryName } = useLocalSearchParams<{
    categoryName: string;
  }>();

  const premiumInstitutes = [
    {
      id: 1,
      title: "Vanguard Career Institute",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      rating: "4.8",
      reviews: "1.2k",
    },
    {
      id: 2,
      title: "Pinnacle Study Hub",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      rating: "4.9",
      reviews: "842",
    },
  ];

  return (
    <>
      <CustomHeader
        title={`${getCapitalizedText(categoryName)}`}
      />

      <View className="flex-1 bg-[#F5F6F8]">

        {/* FILTERS */}
        <View className="px-4 pt-3 pb-2 flex-row gap-2">
          <View className="bg-[#E9ECEF] px-4 py-2 rounded-full flex-row items-center">
            <MaterialCommunityIcons
              name="sort"
              size={15}
              color="#444"
            />

            <Text className="text-xs ml-1 text-primary font-pMedium">
              Sort by
            </Text>
          </View>

          <View className="bg-[#006B5E] px-4 py-2 rounded-full flex-row items-center">
            <MaterialCommunityIcons
              name="check-decagram"
              size={15}
              color="white"
            />

            <Text className="text-xs ml-1 text-white font-pMedium">
              Verified
            </Text>
          </View>

          <View className="bg-[#E9ECEF] px-4 py-2 rounded-full flex-row items-center">
            <MaterialCommunityIcons
              name="star-outline"
              size={15}
              color="#444"
            />

            <Text className="text-xs ml-1 text-primary font-pMedium">
              Top Rated
            </Text>
          </View>
        </View>

        <FlatList
          data={colleges}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          ListHeaderComponent={
            <>
              {/* PREMIUM */}
              <View className="px-4 mt-2">
                <Text className="text-[22px] font-pBold text-primary mb-4">
                  Premium Institutes
                </Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {premiumInstitutes.map((item) => (
                    <CustomButton
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden mr-4"
                      style={{
                        width: 300,
                      }}
                      activeOpacity={0.9}
                    >
                      {/* IMAGE */}
                      <View className="relative">
                        <CustomImage
                          image={{ uri: item.image }}
                          className="w-full h-40"
                          imageClassName="w-full h-full"
                        />

                        {/* BADGES */}
                        <View className="absolute top-3 left-3 flex-row">
                          <View className="bg-[#006B5E] px-2 py-1 rounded-full mr-2 flex-row items-center">
                            <MaterialCommunityIcons
                              name="check-decagram"
                              size={11}
                              color="white"
                            />

                            <Text className="text-white text-[10px] ml-1 font-pMedium">
                              Verified
                            </Text>
                          </View>

                          <View className="bg-[#F6B100] px-2 py-1 rounded-full flex-row items-center">
                            <MaterialCommunityIcons
                              name="star"
                              size={11}
                              color="white"
                            />

                            <Text className="text-white text-[10px] ml-1 font-pMedium">
                              Top Rated
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* CONTENT */}
                      <View className="p-3">
                        <Text
                          className="text-[17px] font-pBold text-primary"
                          numberOfLines={2}
                        >
                          {item.title}
                        </Text>

                        <View className="flex-row items-center mt-2">
                          <MaterialCommunityIcons
                            name="star"
                            size={15}
                            color="#F6B100"
                          />

                          <Text className="text-[13px] text-primary/70 ml-1">
                            {item.rating} ({item.reviews})
                          </Text>
                        </View>
                      </View>
                    </CustomButton>
                  ))}
                </ScrollView>
              </View>

              {/* CATEGORY TITLE */}
              <View className="px-4 mt-7 mb-4">
                <Text className="text-[22px] font-pBold text-primary">
                  Category Institutes
                </Text>
              </View>
            </>
          }
          renderItem={({ item }) => {
            return (
              <CustomButton
                className="bg-white rounded-2xl mx-4 mb-5 border border-[#E5E7EB]"
                activeOpacity={0.9}
                onPress={() =>
                  router.push(`/college/${item.id}`)
                }
              >
                <View className="p-4">

                  {/* TOP */}
                  <View className="flex-row">

                    {/* IMAGE */}
                    <CustomImage
                      image={{
                        uri: getImageURI(
                          item.images.logo?.[0]
                        ),
                      }}
                      className="w-28 h-28 rounded-xl"
                      imageClassName="w-full h-full"
                    />

                    {/* RIGHT */}
                    <View className="flex-1 ml-3">

                      {/* TITLE */}
                      <View className="flex-row justify-between">
                        <Text
                          className="text-[18px] font-pBold text-primary flex-1 pr-2"
                          numberOfLines={2}
                        >
                          {item.name}
                        </Text>

                        <SaveButton item={item} />
                      </View>

                      {/* RATING */}
                      <View className="flex-row items-center mt-1">
                        <View className="bg-[#006B5E] px-2 py-[2px] rounded">
                          <Text className="text-white text-[11px] font-pBold">
                            4.7
                          </Text>
                        </View>

                        <Text className="text-[12px] text-primary/60 ml-2">
                          14 Ratings
                        </Text>
                      </View>

                      {/* LOCATION */}
                      <View className="flex-row mt-2 items-start">
                        <MaterialCommunityIcons
                          name="map-marker-outline"
                          size={15}
                          color="#666"
                          style={{ marginTop: 2 }}
                        />

                        <Text
                          className="text-[13px] text-primary/60 ml-1 flex-1"
                          numberOfLines={2}
                        >
                          {item?.address?.area}, {item?.address?.city} , {item?.address?.state}
                        </Text>
                      </View>

                      {/* TIMING */}
                      <Text className="text-[#006B5E] text-[13px] mt-2 font-pSemiBold">
                        Opens at 11:00 AM
                      </Text>

                      {/* TAGS */}
                      <View className="flex-row flex-wrap mt-2">
                        <View className="bg-[#E8F7F2] px-2 py-1 rounded mr-2 mb-2 flex-row items-center">
                          <MaterialCommunityIcons
                            name="check-decagram"
                            size={12}
                            color="#006B5E"
                          />

                          <Text className="text-[11px] text-primary ml-1">
                            Verified
                          </Text>
                        </View>

                        <View className="bg-[#F1F3F5] px-2 py-1 rounded mb-2 flex-row items-center">
                          <MaterialCommunityIcons
                            name="home-city-outline"
                            size={12}
                            color="#777"
                          />

                          <Text className="text-[11px] text-primary ml-1">
                            Hostel Facility
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* DIVIDER */}
                  <View className="h-[1px] bg-[#E5E7EB] my-4" />

                  {/* BUTTONS */}
                  <View className="flex-row justify-between">

                    <CustomButton className="border border-[#D1D5DB] rounded-lg py-3 flex-1 mr-2">
                      <View className="flex-row justify-center items-center">
                        <MaterialCommunityIcons
                          name="phone-outline"
                          size={16}
                          color="#006B5E"
                        />

                        <Text className="text-[13px] ml-1 text-primary font-pSemiBold">
                          Call Now
                        </Text>
                      </View>
                    </CustomButton>

                    <CustomButton className="border border-[#D1D5DB] rounded-lg py-3 flex-1 mr-2">
                      <View className="flex-row justify-center items-center">
                        <MaterialCommunityIcons
                          name="whatsapp"
                          size={16}
                          color="#22C55E"
                        />

                        <Text className="text-[13px] ml-1 text-primary font-pSemiBold">
                          WhatsApp
                        </Text>
                      </View>
                    </CustomButton>

                    <CustomButton className="border border-[#D1D5DB] rounded-lg py-3 flex-1">
                      <View className="flex-row justify-center items-center">
                        <MaterialCommunityIcons
                          name="email-outline"
                          size={16}
                          color="#444"
                        />

                        <Text className="text-[13px] ml-1 text-primary font-pSemiBold">
                          Enquiry
                        </Text>
                      </View>
                    </CustomButton>

                  </View>
                </View>
              </CustomButton>
            );
          }}
        />
      </View>
    </>
  );
}
