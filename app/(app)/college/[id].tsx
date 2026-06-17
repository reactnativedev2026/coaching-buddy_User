import { addComment, AddCommentReturnDataType, addEnquiry } from "@/api/college.api";
import { placeOrder } from "@/api/orders.api";
import AlreadyBookedWithThisCourseModal from "@/components/AlreadyBookedThisCouseModal/AlreadyBookedThisCourseModal";
import CommentRateModal from "@/components/CommentRateModal/CommentRateModal";
import CustomButton from "@/components/common/CustomButton";
import CustomImage from "@/components/common/CustomImage";
import HTMLText from "@/components/common/HTMLText";
import ImagesCarousel from "@/components/common/ImagesCarousel/ImagesCarousel";
import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import Ratings from "@/components/common/Ratings";
import PlaceOrderConfirmationModal from "@/components/PlaceOrderConfirmationModal/PlaceOrderConfirmationModal";
import SaveButton from "@/components/SaveButton/SaveButton";
import useGetCollege from "@/hooks/useGetCollege.hook";
import errorToast from "@/lib/errorToast";
import getAverageRating from "@/lib/getAverageRating";
import getCapitalizedText from "@/lib/getCapitalizedText";
import getFormattedReviewsCount from "@/lib/getFormattedReviewsCount";
import getImageURI from "@/lib/getImageURI";
import successToast from "@/lib/successToast";
import { useAppSelector } from "@/redux/store";
import CollegeType from "@/types/College.type";
import {
    AntDesign,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Linking,
    Share,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageViewing from "react-native-image-viewing";

type CollegeDetailsTabsType = "Description" | "Gallery" | "Review" | "Courses";

export default function College() {
    const { isLoading, college, setCollege } = useGetCollege();
    const [tab, setTab] = useState<CollegeDetailsTabsType>("Description");
    const { user } = useAppSelector((state) => state.user);

    if (isLoading) return <Loader fullscreen />;

    if (college == null) return null;

    const tabs: CollegeDetailsTabsType[] = [
        "Description",
        "Gallery",
        "Review",
        "Courses",
    ];

    let averageRating = 0;

    if (college.comments != null)
        averageRating = getAverageRating(
            college.comments.map((item) => item.rating),
        );

    const collegeCategory = college.categories.at(-1)!;

    function onRateCollege(commentData: AddCommentReturnDataType) {
        if (user == null) return;

        setCollege((prev) => {
            if (prev == null) return prev;

            return {
                ...prev,
                comments: [
                    ...(prev.comments || []),
                    {
                        ...commentData,
                        userName: user.name!,
                        userId: user.id,
                    },
                ],
            };
        });
    }

    return (
        <View className="flex-1 bg-secondary">
            <ScrollView contentContainerClassName="">
                <Header college={college} />

                <ImagesCarousel images={college.images.banner} />

                <View className="px-4 py-6">
                    <View
                        className="bg-white rounded-3xl p-5 gap-5"
                        style={{
                            elevation: 4,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.08,
                            shadowRadius: 5,
                        }}
                    >

                        {/* TOP ROW */}
                        <View className="flex-row items-center justify-between">

                            {/* RATING */}
                            {averageRating > 0 ? (
                                <View className="flex-row items-center gap-1 bg-orange-50 px-3 py-2 rounded-full">
                                    <AntDesign
                                        name="star"
                                        size={16}
                                        color="orange"
                                    />

                                    <Text className="text-orange-500 text-sm font-pSemiBold">
                                        {averageRating}
                                    </Text>

                                    <Text className="text-primary/40 text-sm font-pMedium">
                                        (
                                        {college.comments != null
                                            ? getFormattedReviewsCount(
                                                college.comments,
                                            )
                                            : null}
                                        )
                                    </Text>
                                </View>
                            ) : (
                                <View />
                            )}

                            {/* CATEGORY CHIP */}
                            <CustomButton
                                className="bg-accent1/10 px-4 py-2 rounded-full"
                                onPress={() =>
                                    router.push(
                                        `/list/${collegeCategory.id}?categoryName=${collegeCategory.name}`,
                                    )
                                }
                            >
                                <Text className="text-accent1 text-sm font-pSemiBold">
                                    {getCapitalizedText(collegeCategory.name)}
                                </Text>
                            </CustomButton>
                        </View>

                        {/* NAME + LOCATION */}
                        <View className="gap-3">

                            {/* NAME */}
                            <Text className="text-primary font-pBold text-2xl leading-8">
                                {getCapitalizedText(college.name)}
                            </Text>

                            {/* LOCATION */}
                            <View className="flex-row items-center gap-2">
                                <View className="bg-[#009688]/10 p-2 rounded-full">
                                    <Ionicons
                                        name="location"
                                        size={16}
                                        color="#009688"
                                    />
                                </View>

                                <Text className="text-primary/60 font-pMedium text-sm flex-1">
                                    {college.address.area},{" "}
                                    {college.address.city}, India
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="px-4 gap-3 pb-2"
                >
                    {tabs.map((item) => {
                        const isActive = item === tab;

                        return (
                            <CustomButton
                                key={item}
                                onPress={() => setTab(item)}
                                className={`
                    flex-row items-center gap-2
                    px-5 py-3 rounded-full
                    ${isActive
                                        ? "bg-accent1"
                                        : "bg-white"
                                    }
                `}
                                style={{
                                    elevation: 3,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.08,
                                    shadowRadius: 4,
                                }}
                            >
                                {isActive && (
                                    <AntDesign
                                        name="checkcircle"
                                        size={16}
                                        color="#fff"
                                    />
                                )}

                                <Text
                                    className={`
                        text-sm font-pSemiBold
                        ${isActive
                                            ? "text-white"
                                            : "text-primary"
                                        }
                    `}
                                >
                                    {item}
                                </Text>
                            </CustomButton>
                        );
                    })}
                </ScrollView>

                {tab === "Description" && <Description
                    college={college}
                    user={user}
                />}
                {tab === "Gallery" && <Gallery college={college} />}
                {tab === "Review" && (
                    <Review college={college} onRateCollege={onRateCollege} />
                )}
                {tab === "Courses" && <Courses college={college} />}
            </ScrollView>

            {/* Footer */}
            {/* <View className="px-4 py-6 border-t-hairline border-t-primary/10 flex-row items-center gap-4">
                <View>
                    <Text className="text-primary font-pSemiBold">
                        Total Price
                    </Text>

                    <View className="flex-row items-center">
                        <Text className="text-accent1 font-pSemiBold">
                            ₹35,000
                        </Text>
                        <Text className="text-primary/50 font-pSemiBold">
                            /month
                        </Text>
                    </View>
                </View>

                <CustomButton className="bg-accent1 rounded-full flex-1 items-center px-4 py-4">
                    <Text className="text-secondary text-lg font-pSemiBold">
                        Book Now
                    </Text>
                </CustomButton>
            </View> */}
        </View>
    );
}

function Header({ college }: { college: CollegeType }) {
    return (
        <View className="flex-row items-center justify-between px-2 py-6 absolute z-10 w-full">
            <CustomButton
                onPress={() => {
                    if (router.canGoBack()) router.back();
                }}
            >
                <Ionicons name="arrow-back-outline" size={24} color="#000" />
            </CustomButton>

            <View className="flex-row items-center gap-4">
                <CustomButton 
                    className="bg-secondary p-2 rounded-full"
                    onPress={async () => {
                        try {
                            const message = `Check out ${college.name} on Coaching Buddy!\n\nLocation: ${college.address.area}, ${college.address.city}\n\nDownload the app to book your classes now!`;
                            await Share.share({
                                message,
                                title: `Share ${college.name}`
                            });
                        } catch (error: any) {
                            console.error("Error sharing:", error.message);
                        }
                    }}
                >
                    <Entypo name="share" size={24} color="black" />
                </CustomButton>

                <SaveButton item={college} />
            </View>
        </View>
    );
}

function Description({
    college,
    user,
}: {
    college: CollegeType;
    user: any;
}) {
    let phone: string = "";
    let whatsapp: string = "";

    college.details.forEach((detail) => {
        if (detail.type === "phone") {
            phone = detail.value;
        }

        if (detail.type === "whatsapp") {
            whatsapp = detail.value;
        }
    });

    function openPhone() {
        if (!phone) return;

        if (phone.length === 10) {
            phone = "+91" + phone;
        }

        Linking.openURL(`tel:${phone}`);
    }

    function openWhatsapp() {
        if (!whatsapp) return;

        if (whatsapp.length === 10) {
            whatsapp = "+91" + whatsapp;
        }

        const message =
            "Hi, I am interested in your coaching institute.";

        const url = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${encodeURIComponent(message)}`;

        Linking.openURL(url);
    }

    async function handleEnquiry() {
        try {
            if (!user?.id) {
                errorToast("Please login first");
                return;
            }

            const payload = {
                storeId: college.id,
                userId: user.id,
                name: user.name,
                phone: user.phone || "",
                message: "Interested in admission",
            };

            const res = await addEnquiry(payload);

            successToast(res.message);
            console.log("Enquiry submitted:", res);
        } catch (error) {
            console.log(error);
            errorToast("Failed to send enquiry");
        }
    }

    function openMap() {
        const address = college.address;

        const encodedQuery = encodeURIComponent(
            `${address.area} ${address.city} ${address.nearBy} ${address.state} ${address.pincode}`,
        );

        const url = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

        Linking.openURL(url);
    }

    return (
        <View className="px-4 py-5 gap-5">

            {/* CONTACT CARD */}
            <View
                className="bg-white rounded-3xl p-5"
                style={{
                    elevation: 4,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 5,
                }}
            >
                <Text className="text-primary font-pBold text-xl mb-4">
                    Contact
                </Text>

                {/* OWNER */}
                <View className="flex-row items-center gap-3 mb-5">
                    <CustomImage
                        image={{
                            uri: getImageURI(
                                college.images.logo[0],
                            ),
                        }}
                        className="w-16 h-16 rounded-full"
                        imageClassName="w-full h-full"
                    />

                    <View className="flex-1">
                        <Text className="text-primary font-pSemiBold text-lg">
                            {college.ownerName || college.name}
                        </Text>

                        <Text className="text-primary/50 text-sm">
                            Coaching Partner
                        </Text>
                    </View>
                </View>

                {/* BUTTONS */}
                <View className="flex-row gap-3 mt-4">

                    {/* CALL */}
                    <CustomButton className="border border-[#D1D5DB] rounded-lg py-3 flex-1 mr-2" onPress={openPhone}>
                        <View className="flex-row justify-center items-center">
                            <MaterialCommunityIcons
                                name="phone-outline"
                                size={16}
                                color="#006B5E"
                            />

                            <Text className="text-[12px] ml-1 text-primary font-pSemiBold">
                                Call Now
                            </Text>
                        </View>
                    </CustomButton>

                    {/* WHATSAPP */}
                    <CustomButton className="border border-[#D1D5DB] rounded-lg py-3 flex-1 mr-2" onPress={openWhatsapp}>
                        <View className="flex-row justify-center items-center">
                            <MaterialCommunityIcons
                                name="whatsapp"
                                size={16}
                                color="#22C55E"
                            />

                            <Text className="text-[12px] ml-1 text-primary font-pSemiBold">
                                WhatsApp
                            </Text>
                        </View>
                    </CustomButton>

                    {/* ENQUIRY */}
                    <CustomButton className="border border-[#D1D5DB] rounded-lg py-3 flex-1" onPress={handleEnquiry}>
                        <View className="flex-row justify-center items-center">
                            <MaterialCommunityIcons
                                name="email-outline"
                                size={16}
                                color="#444"
                            />

                            <Text className="text-[12px] ml-1 text-primary font-pSemiBold">
                                Enquiry
                            </Text>
                        </View>
                    </CustomButton>
                </View>
            </View>

            {/* DESCRIPTION CARD */}
            <View
                className="bg-white rounded-3xl p-5"
                style={{
                    elevation: 4,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 5,
                }}
            >
                <Text className="text-primary font-pBold text-xl mb-4">
                    Description
                </Text>

                <HTMLText html={college.longDescription} />
            </View>

            {/* ADDRESS CARD */}
            <View
                className="bg-white rounded-3xl p-5"
                style={{
                    elevation: 4,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 5,
                }}
            >
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-primary font-pBold text-xl">
                        Address
                    </Text>

                    <CustomButton
                        onPress={openMap}
                        className="bg-[#009688]/10 px-4 py-2 rounded-full"
                    >
                        <Text className="text-[#009688] font-pSemiBold text-sm">
                            View on Map
                        </Text>
                    </CustomButton>
                </View>

                <View className="flex-row gap-3">
                    <Ionicons
                        name="location"
                        size={22}
                        color="#009688"
                    />

                    <Text className="flex-1 text-primary/70 leading-6">
                        {college.address.area},{" "}
                        {college.address.city},{" "}
                        {college.address.state} -{" "}
                        {college.address.pincode}
                    </Text>
                </View>
            </View>
        </View>
    );
}

function Gallery({ college }: { college: CollegeType }) {
    const galleryImages = college.images.gallery;
    const { width } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerVisible, setIsViewerVisible] = useState(true);

    // Dynamically decide number of columns
    let columns = 3;
    if (width < 350) columns = 2;
    else if (width > 600) columns = 4;

    const gap = 8;
    const horizontalPadding = 16;
    const totalGap = gap * (columns - 1);
    const itemSize = (width - horizontalPadding * 2 - totalGap) / columns;

    if (galleryImages == null || galleryImages.length === 0)
        return (
            <NotFound
                heading="No Gallery found!"
                body="College is providing any gallery yet"
                isHideGoBack
            />
        );
    return (
        <View className="px-4 py-6">
            {/* Header */}
            <View className="flex-row items-center gap-1 mb-4">
                <Text className="text-primary font-pSemiBold text-sm">
                    Gallery
                </Text>
                <Text className="text-accent1 font-pSemiBold text-sm">
                    ({galleryImages.length})
                </Text>
            </View>

            {/* Responsive Image Grid */}
            <FlatList
                data={galleryImages}
                keyExtractor={(item, index) => `gallery-${index}`}
                numColumns={columns}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                columnWrapperStyle={{ gap }}
                contentContainerStyle={{ gap }}
                renderItem={({ item, index }) => (
                    <CustomButton
                        style={{
                            width: itemSize,
                            height: itemSize,
                            borderRadius: 12,
                            overflow: "hidden",
                        }}
                        activeOpacity={0.8}
                        onPress={() => {
                            setIsViewerVisible(true);
                            setCurrentIndex(index);
                        }}
                    >
                        <CustomImage
                            image={{ uri: getImageURI(item) }}
                            className="w-full h-full"
                            imageClassName="w-full h-full"
                        />
                    </CustomButton>
                )}
            />

            <ImageViewing
                keyExtractor={(image, index) => index.toString()}
                images={galleryImages.map((img) => ({ uri: getImageURI(img) }))}
                imageIndex={currentIndex}
                visible={isViewerVisible}
                onRequestClose={() => {
                    setIsViewerVisible(false);
                }}
                swipeToCloseEnabled
                doubleTapToZoomEnabled
            />
        </View>
    );
}

function Review({
    college,
    onRateCollege,
}: {
    college: CollegeType;
    onRateCollege: (commentData: AddCommentReturnDataType) => void;
}) {
    console.log(college.comments, ":QEQDWEDDSS");
    const [isCommentRateModalVisible, setIsCommentRateModalVisible] =
        useState(false);
    const { user } = useAppSelector((state) => state.user);

    console.log(user, ";;");
    let hasAlreadyCommented = false;

    if (college.comments != null)
        hasAlreadyCommented = college.comments.some(
            (comment) => comment.userId === user?.id,
        );
    console.log(hasAlreadyCommented, ":::::::::::::::");
    const [isLoading, setIsLoading] = useState(false);

    async function handleComment(rating: number, comment: string) {
        setIsLoading(true);

        if (comment.trim() === "") {
            errorToast("Error", "Comment is required");
            return;
        }

        try {
            const res = await addComment({
                collegeId: college.id,
                comment,
                rating,
            });

            successToast(res.message);

            setIsCommentRateModalVisible(false);

            if (res.data != null) {
                onRateCollege(res.data);
            }
        } catch (error) {
            // console.error("comment error ", error);
        } finally {
            setIsLoading(false);
        }
    }

    //   if (college?.comments == null || college.comments.length === 0)
    //     return (
    //       <NotFound
    //         heading="No reviews found!"
    //         body="Be the first to give review"
    //         isHideGoBack
    //       />
    //     );

    return (
        <View className="px-4 py-6 gap-4">
            <View className="flex-row items-center justify-between">
                <Text className="text-primary font-pSemiBold text-sm">
                    Review
                </Text>

                {hasAlreadyCommented ? (
                    <Text className="text-accent1 font-pSemiBold text-sm">
                        Thanks for rating us🎉
                    </Text>
                ) : (
                    <CustomButton
                        onPress={() => setIsCommentRateModalVisible(true)}
                        className="bg-accent1 flex-row items-center gap-2 rounded-lg px-4 py-4 disabled:opacity-50"
                        disabled={hasAlreadyCommented}
                    >
                        <FontAwesome6 name="add" size={16} color="#fff" />
                        <Text className="text-secondary text-xs font-pSemiBold">
                            Comment
                        </Text>
                    </CustomButton>
                )}
            </View>

            <FlatList
                data={college.comments}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                ListEmptyComponent={
                    <NotFound
                        heading="No reviews found!"
                        body="Be the first to give review"
                        isHideGoBack
                    />
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                renderItem={({ item }) => (
                    <View className="gap-1 px-4 py-2 border-2 border-primary/5 bg-secondary shadow-md rounded-xl">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <CustomImage
                                    image={{
                                        uri: getImageURI(
                                            college.images.logo[0],
                                        ),
                                    }}
                                    className="w-16 aspect-square rounded-full items-center justify-center"
                                    imageClassName="w-full h-full"
                                />

                                <Text className="text-primary font-pSemiBold text-lg">
                                    {item.userName}
                                </Text>
                            </View>

                            <Text className="text-primary/50 font-pSemiBold text-sm">
                                {item.createdAt}
                            </Text>
                        </View>

                        <Text className="text-primary/50 text-sm font-pRegular">
                            {item.comment}
                        </Text>

                        <View className="flex-row items-center gap-2">
                            <Ratings rating={item.rating} />

                            <Text className="text-primary/50 font-pSemiBold text-sm">
                                {item.rating}
                            </Text>
                        </View>
                    </View>
                )}
            />

            <CommentRateModal
                isVisible={isCommentRateModalVisible}
                handleModalClose={() => setIsCommentRateModalVisible(false)}
                handleComment={handleComment}
                disabled={hasAlreadyCommented || isLoading}
            />
        </View>
    );
}

function Courses({ college }: { college: CollegeType }) {
    const [selectedCategory, setSelectedCategory] = useState(
        college?.courses?.[0]?.category ?? "",
    );
    const [isPlaceOrderLoading, setIsPlaceOrderLoading] = useState(false);
    const [
        isPlaceOrderConfirmationModalVisibile,
        setIsPlaceOrderConfirmationModalVisible,
    ] = useState(false);
    const [
        isAlreadyBookedThisCourseModalVisible,
        setIsAlreadyBookedThisCourseModalVisible,
    ] = useState(false);

    const [orderProcessingCourseId, setOrderProcessingCourseId] = useState<
        string | null
    >(null);

    const courses: string[] = [];

    if (college.courses != null)
        college.courses.forEach((item) => {
            if (!courses.includes(item.category)) {
                courses.push(item.category);
            }
        });

    let displayCourses: CollegeType["courses"];

    if (college.courses != null)
        displayCourses = college.courses.filter(
            (course) => course.category === selectedCategory,
        );

    async function handlePlaceOrder() {
        if (orderProcessingCourseId == null) return;

        setIsPlaceOrderLoading(true);
        console.log(orderProcessingCourseId, "LLLLLLLLLLLLLLLLLLL");
        try {
            const res = await placeOrder(orderProcessingCourseId);

            successToast(res.message);
        } catch (error: any) {
            // console.error("place order error ", error);

            if (
                error?.response?.data?.message ===
                "You have already booked this course!"
            ) {
                setIsAlreadyBookedThisCourseModalVisible(true);
            }
        } finally {
            setIsPlaceOrderConfirmationModalVisible(false);
            setIsPlaceOrderLoading(false);
        }
    }

    if (college?.courses == null || college.courses.length === 0)
        return (
            <NotFound
                heading="No courses found!"
                body="College is providing any courses yet"
                isHideGoBack
            />
        );

    return (
        <View className="px-4 py-6 gap-4">
            <FlatList
                data={courses}
                contentContainerClassName="px-4"
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <CustomButton
                            className={`px-4 py-2 rounded-full  ${selectedCategory === item ? "bg-accent1/10" : "bg-primary/10"}`}
                            onPress={() => setSelectedCategory(item)}
                        >
                            <Text
                                className={`text-xs font-pSemiBold  ${selectedCategory === item ? "text-accent1" : "text-primary"}`}
                            >
                                {getCapitalizedText(item)}
                            </Text>
                        </CustomButton>
                    );
                }}
                ItemSeparatorComponent={() => <View className="w-4" />}
            />

            <FlatList
                data={displayCourses}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                ItemSeparatorComponent={() => <View className="h-2" />}
                renderItem={({ item }) => (
                    <View className="flex-row bg-secondary border-2 border-primary/5 rounded-xl shadow-md px-4 py-2 gap-4">
                        <CustomImage
                            image={{ uri: getImageURI(item.images[0]) }}
                            className="w-24 aspect-square rounded-xl"
                            imageClassName="w-full h-full"
                        />

                        <View className="flex-1 gap-2">
                            <Text className="text-primary font-pSemiBold text-lg">
                                {getCapitalizedText(item.name)}
                            </Text>

                            <HTMLText html={item.shortDescription} />

                            <View>
                                <Text className="text-accent1 text-sm font-pSemiBold">
                                    ₹{item.sellingPrice}{" "}
                                    {Number(item.discount) > 0
                                        ? `(${item.discount}% off)`
                                        : null}
                                </Text>

                                {Number(item.sellingPrice) <
                                    Number(item.price) && (
                                        <View className="flex-row">
                                            <Text className="text-accent2 text-xs font-pSemiBold">
                                                MRP
                                            </Text>
                                            <Text className="text-accent2 text-xs font-pSemiBold line-through">
                                                {" "}
                                                ₹{item.price}
                                            </Text>
                                        </View>
                                    )}
                            </View>

                            <CustomButton
                                className="px-4 py-2 rounded-lg bg-accent1 self-start"
                                onPress={() => {
                                    setIsPlaceOrderConfirmationModalVisible(
                                        true,
                                    );
                                    setOrderProcessingCourseId(item.id);
                                }}
                                disabled={isPlaceOrderLoading}
                            >
                                <Text className="text-secondary text-sm font-pSemiBold">
                                    Book Now
                                </Text>
                            </CustomButton>
                        </View>
                    </View>
                )}
            />

            <PlaceOrderConfirmationModal
                isVisible={isPlaceOrderConfirmationModalVisibile}
                handleModalClose={() => {
                    setOrderProcessingCourseId(null);
                    setIsPlaceOrderConfirmationModalVisible(false);
                }}
                disabled={isPlaceOrderLoading}
                handlePlaceOrder={handlePlaceOrder}
            />

            <AlreadyBookedWithThisCourseModal
                isVisible={isAlreadyBookedThisCourseModalVisible}
                handleModalClose={() =>
                    setIsAlreadyBookedThisCourseModalVisible(false)
                }
            />
        </View>
    );
}
