import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomImage from "../common/CustomImage";

type CollegeType = {
    name: string;
    rate: number;
    ratings: number;
    course: string;
    location: string;
};

export default function HomeSavedColleges() {
    const colleges: CollegeType[] = [
        {
            name: "College Name",
            rate: 34650,
            location: "Pune, India",
            ratings: 4.9,
            course: "B.Tech",
        },
        {
            name: "College Name",
            rate: 34650,
            location: "Pune, India",
            ratings: 4.9,
            course: "B.Tech",
        },
        {
            name: "College Name",
            rate: 34650,
            location: "Pune, India",
            ratings: 4.9,
            course: "B.Tech",
        },
        {
            name: "College Name",
            rate: 34650,
            location: "Pune, India",
            ratings: 4.9,
            course: "B.Tech",
        },
        {
            name: "College Name",
            rate: 34650,
            location: "Pune, India",
            ratings: 4.9,
            course: "B.Tech",
        },
    ];

    return (
        <View className="px-4 py-2">
            <Text className="text-primary text-xl font-pBold">
                Saved Colleges
            </Text>

            <View className="gap-2">
                {colleges.map((college, i) => (
                    <CollegeItem {...college} key={i} />
                ))}
            </View>
        </View>
    );
}

function CollegeItem({ name, rate, ratings, course, location }: CollegeType) {
    return (
        <CustomButton
            className={
                "flex-row items-center bg-secondary rounded-xl shadow-md px-6 py-3 gap-2"
            }
        >
            <CustomImage
                image={{ uri: "https://picsum.photos/seed/picsum/200" }}
                className="w-32 aspect-square rounded-xl"
                imageClassName="w-full h-full"
            />

            <View className="flex-1 flex-row items-center px-2 justify-between">
                <View className="gap-2">
                    <Text className="text-primary font-pSemiBold leading-5">
                        {name}
                    </Text>

                    <View className="flex-row items-center">
                        <AntDesign name="star" size={16} color="orange" />

                        <Text className="text-primary/50 text-sm font-pSemiBold mt-1">
                            {ratings}
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <Ionicons
                            name="location-sharp"
                            size={16}
                            color={"#000"}
                        />

                        <Text className="text-primary text-xs font-pSemiBold">
                            {location}
                        </Text>
                    </View>

                    <Text className="text-accent1 text-sm font-pSemiBold">
                        ₹{rate}/month
                    </Text>
                </View>

                <View className="bg-primary/10 px-2 py-1 rounded-lg">
                    <Text className="text-accent1 text-xs font-pRegular">
                        {course}
                    </Text>
                </View>
            </View>
        </CustomButton>
    );
}
