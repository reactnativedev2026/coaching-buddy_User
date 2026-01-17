import { cancelOrder } from "@/api/orders.api";
import ConfirmationModel from "@/components/common/ConfirmationModal";
import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
import CustomImage from "@/components/common/CustomImage";
import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import useGetUserOrders from "@/hooks/useGetUserOrders.hook";
import getAverageRating from "@/lib/getAverageRating";
import getCapitalizedText from "@/lib/getCapitalizedText";
import getImageURI from "@/lib/getImageURI";
import successToast from "@/lib/successToast";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function MyBookings() {
    const { isLoading, orders, setOrders } = useGetUserOrders();
    console.log(orders,".............................................")
    const [isCancelOrderLoading, setIsCancelOrderLoading] = useState(false);
const [cancelModelVisible, setCancelModelVisible] = useState(false)
const [cancelBookingId, setCancelBookingId] = useState("")
    if (isLoading) return <Loader fullscreen />;

    if (orders.length === 0)
        return (
            <NotFound
                heading="Orders not found!"
                body="Looks like you haven't booked any courses yet!"
            />
        );

    async function handleCancelOrder(orderId: string) {
        try {
            setIsCancelOrderLoading(true);

            const res = await cancelOrder(orderId);

            successToast(res.message);

            setOrders((prev) => {
                return prev.map((item) => {
                    if (item.id === orderId)
                        return {
                            ...item,
                            status: "cancelled",
                        };

                    return item;
                });
            });
        } catch (error) {
            // console.error("cancel order error ", error);
        } finally {
            setIsCancelOrderLoading(false);
            setCancelBookingId("")
            setCancelModelVisible(false)
        }
    }

    return (
        <View className="flex-1 bg-secondary">
            <CustomHeader title="Bookings" />

            <View className="px-4 pt-4 pb-8">
                <FlatList
                    data={orders}
                    ItemSeparatorComponent={() => <View className="h-4" />}
                    ListFooterComponent={() => <View className="h-16" />}
                    renderItem={({ item }) => {
                        const averageRating = getAverageRating(
                            item.store.comments.map((item) => item.rating)
                        );

                        let orderStatusColor = "";
                        let bgOrderStatusColor = "";

                        if (item.status === "cancelled") {
                            orderStatusColor = "text-accent2";
                            bgOrderStatusColor = "bg-accent2/10";
                        } else if (item.status === "confirmed") {
                            orderStatusColor = "text-accent3";
                            bgOrderStatusColor = "bg-accent3/10";
                        } else {
                            orderStatusColor = "text-accent1";
                            bgOrderStatusColor = "bg-accent1/10";
                        }

                        return (
                            <View className="bg-secondary border-2 border-primary/5 shadow-md px-4 py-6 gap-4 rounded-xl">
                                <View
                                    className={`rounded-full px-2 py-1 ${bgOrderStatusColor} self-start`}
                                >
                                    <Text
                                        className={`text-xs font-pSemiBold ${orderStatusColor}`}
                                    >
                                        {getCapitalizedText(item.status)}
                                    </Text>
                                </View>

                                <View className="flex-row items-center gap-4">
                                    <CustomImage
                                        image={{
                                            uri: getImageURI(
                                                item.product.images[0]
                                            ),
                                        }}
                                        className="w-1/3 aspect-square items-center justify-center rounded-xl"
                                        imageClassName="w-full h-full"
                                    />

                                    <View className="flex-1 gap-1">
                                        <Text className="text-primary text-lg font-pSemiBold">
                                            {getCapitalizedText(
                                                item.product.name
                                            )}
                                        </Text>

                                        {averageRating > 0 && (
                                            <View className="flex-row items-center">
                                                <AntDesign
                                                    name="star"
                                                    size={16}
                                                    color="orange"
                                                />

                                                <Text className="text-primary/50 text-sm font-pSemiBold mt-1">
                                                    {averageRating}
                                                </Text>
                                            </View>
                                        )}

                                        <View className="flex-row">
                                            <Ionicons
                                                name="location-outline"
                                                size={16}
                                                color={"#999"}
                                            />

                                            <Text className="text-primary/50 font-pSemiBold text-sm">
                                                {item.store.address.area},{" "}
                                                {item.store.address.city}, India
                                            </Text>
                                        </View>

                                        <View>
                                            <Text className="text-accent1 text-sm font-pSemiBold">
                                                ₹{item.product.sellingPrice}{" "}
                                                {Number(item.product.discount) >
                                                0
                                                    ? `(${item.product.discount}% off)`
                                                    : null}
                                            </Text>

                                            {Number(item.product.sellingPrice) <
                                                Number(item.product.price) && (
                                                <View className="flex-row">
                                                    <Text className="text-accent2 text-xs font-pSemiBold">
                                                        MRP
                                                    </Text>
                                                    <Text className="text-accent2 text-xs font-pSemiBold line-through">
                                                        {" "}
                                                        ₹{item.product.price}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>

                                {item.status === "initiated" && (
                                    <CustomButton
                                        className="bg-accent2/10 items-center rounded-lg px-2 py-4 disabled:opacity-50"
                                        onPress={() =>{
                                            // handleCancelOrder(item.id)
                                            setCancelModelVisible(true)
                                            setCancelBookingId(item.id)
                                        }
                                        }
                                        disabled={isCancelOrderLoading}
                                    >
                                        <Text className="text-accent2 text-sm font-pSemiBold">
                                            Cancel Request
                                        </Text>
                                    </CustomButton>
                                )}
                            </View>
                        );
                    }}
                />
            </View>
               <ConfirmationModel
                visible={cancelModelVisible}
                title="Cancel Booking"
                message="Are you sure you want to cancel ?"
                confirmText="Yes"
                cancelText="Cancel"
                cancelButtonColor={"#EF4444"}
                onConfirm={() => {
                    handleCancelOrder(cancelBookingId);

                }}
                onCancel={() =>
                    setCancelModelVisible(false)
                }
                titleColor={"#1E293B"}
                messageColor={"#1E293B"}
                blurIntensity={40}
                animationType="fade"
                confirmButtonColor={"#0d9488"}
            />
        </View>
    );
}
