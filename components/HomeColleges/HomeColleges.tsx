import getAverageRating from "@/lib/getAverageRating";
import getCapitalizedText from "@/lib/getCapitalizedText";
import getImageURI from "@/lib/getImageURI";
import { useAppSelector } from "@/redux/store";
import CollegeType from "@/types/College.type";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { FlatList, Text, useWindowDimensions, View } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomImage from "../common/CustomImage";
import SaveButton from "../SaveButton/SaveButton";

type HomeCollegesPropsType = {
    isLoading: boolean;
    colleges: CollegeType[];
};

export default function HomeColleges({
    isLoading,
    colleges,
}: HomeCollegesPropsType) {
    const skeletonColleges = Array(10).fill(1);

    return (
        <View>
            <FlatList
                data={isLoading ? skeletonColleges : colleges}
                contentContainerClassName="px-4 py-4"
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    if (isLoading) return <CollegeItemLoadingSkeleton />;

                    return <CollegeItem college={item} />;
                }}
                ItemSeparatorComponent={() => <View className="w-4" />}
            />
        </View>
    );
}

function CollegeItem({ college }: { college: CollegeType }) {
    const { width } = useWindowDimensions();
    const { isAuthenticated } = useAppSelector((state) => state.user);

    const { name, address, images } = college;

    let averageRating: number = 0;

    if (college.comments)
        averageRating = getAverageRating(
            college.comments.map((item) => item.rating)
        );

    return (
        <CustomButton
            className={
                "bg-secondary rounded-xl overflow-hidden gap-2 shadow-md pb-4"
            }
            style={{
                width: width / 2,
            }}
            onPress={() => {
                if (!isAuthenticated) {
                    router.push("/login");
                    return;
                }

                router.push(`/college/${college.id}`);
            }}
            debounce
        >
            <CustomImage
                // image={{ uri: "https://picsum.photos/seed/picsum/200" }}
                image={{ uri: getImageURI(images.logo[0]) }}
                className="w-full aspect-square rounded-xl"
                imageClassName="w-full h-full"
            />

            <View className="flex-row px-2 justify-between">
                <View className="gap-2">
                    <Text className="text-primary font-pSemiBold leading-5">
                        {getCapitalizedText(name)}
                    </Text>

                    {averageRating > 0 && (
                        <View className="flex-row items-center">
                            <AntDesign name="star" size={16} color="orange" />

                            <Text className="text-primary/50 text-sm font-pSemiBold mt-1">
                                {averageRating}
                            </Text>
                        </View>
                    )}

                    <View className="flex-row items-center">
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color={"#999"}
                        />

                        <Text className="text-primary/30 text-xs font-pSemiBold">
                            {address.area}
                        </Text>
                    </View>
                </View>

                <SaveButton item={college} />
            </View>
        </CustomButton>
    );
}

function CollegeItemLoadingSkeleton() {
    return (
        <View className="rounded-xl w-60 overflow-hidden gap-4 pb-4 bg-primary/10 animate-pulse">
            <View className="w-full aspect-square rounded-xl bg-primary/10" />

            <View className="px-4 gap-2 w-3/4">
                <View className="w-full h-4 bg-primary/10 rounded-lg" />

                <View className="w-full h-4 bg-primary/10 rounded-lg" />

                <View className="w-full h-4 bg-primary/10 rounded-lg" />
            </View>
        </View>
    );
}
