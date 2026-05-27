import getCapitalizedText from "@/lib/getCapitalizedText";
import getImageURI from "@/lib/getImageURI";
import { useAppSelector } from "@/redux/store";
import CategoryType from "@/types/Category.type";
import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomImage from "../common/CustomImage";
import NotFound from "../common/NotFound";

type HomeCategoryPropsType = {
  isLoading: boolean;
  parentCategories: CategoryType[];
};

export default function HomeCategory({
  isLoading,
  parentCategories,
}: HomeCategoryPropsType) {
  const skeletonCategories = Array(10).fill(1);

  if (!isLoading && parentCategories.length === 0)
    return (
      <NotFound
        heading="Categories not found!"
        body="There are currently no categories."
        isHideGoBack
      />
    );

  return (
    <View className="flex-row flex-wrap  gap-4 justify-center max-w-[100%] mx-auto">
      <Text className="w-full text-primary text-lg font-pSemiBold mb-2 px-4">
        Categories
      </Text>
      {isLoading
        ? skeletonCategories.map((item, i) => {
          return <CategoryItemLoadingSkeleton key={i} />;
        })
        : parentCategories.map((item) => {
          return <CategoryItem category={item} key={item.id} />;
        })}
    </View>
  );
}

function CategoryItem({ category }: { category: CategoryType }) {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return (
    <CustomButton
      className="w-[22%] items-center gap-2 mb-4"
      onPress={() => {
        if (!isAuthenticated) {
          router.push("/login");
          return;
        }

        router.push(`/list/${category.id}?categoryName=${category.name}`);
      }}
      debounce
    >
      <CustomImage
        image={{ uri: getImageURI(category.imagePath) }}
        className="w-[90%] aspect-square items-center justify-center rounded-full"
        imageClassName="w-full h-full"
      />

      <Text className={`text-xs font-pSemiBold text-center`}>
        {getCapitalizedText(category.name)}
      </Text>
      {category.showTag === 1 && (
        <View className="absolute -top-2 -right-2 bg-red-500 px-2 py-1 rounded-full min-w-6 items-center justify-center">
          <Text style={{ color: "white", fontWeight: "600", fontSize: 10 }}>
            {(category?.tag?.length ?? 0) > 0
              ? category.tag!.length > 8
                ? category.tag!.slice(0, 8) + "..."
                : category.tag
              : "Unavailable"}
          </Text>
        </View>
      )}
    </CustomButton>
  );
}

function CategoryItemLoadingSkeleton() {
  return (
    <View className="gap-1 items-center animate-pulse">
      <View className="w-20 aspect-square px-4 py-2 rounded-full bg-primary/10" />

      <View className="w-16 h-4 bg-primary/10 rounded-lg" />
    </View>
  );
}
