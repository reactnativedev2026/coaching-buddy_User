import { getUserOrders } from "@/api/orders.api";
import { useAppSelector } from "@/redux/store";
import OrderType from "@/types/Order.type";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";

export default function useGetUserOrders() {
    const { user, isAuthenticated } = useAppSelector((state) => state.user);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/booking") return;

        if (!isAuthenticated || user == null) return;

        setIsLoading(true);

        (async function () {
            try {
                const res = await getUserOrders(user.id);

                // console.log(JSON.stringify(res.data));

                if (res.data != null) {
                    const ordersData: OrderType[] = res.data.orders.map(
                        (order) => {
                            return {
                                id: order.uid,
                                status: order.status,
                                product: {
                                    ...order.product,
                                    selling_price: undefined,
                                    sellingPrice: order.product.selling_price,
                                    images: order.product.images.map(
                                        (image) => image.path
                                    ),
                                },
                                store: {
                                    name: order.store.name,
                                    address: {
                                        ...order.store.address,
                                        near_by: undefined,
                                        nearBy: order.store.address.near_by,
                                    },
                                    comments: order.store.comments.map(
                                        (comment) => {
                                            return {
                                                id: comment.uid,
                                                rating: comment.rating,
                                            };
                                        }
                                    ),
                                },
                            };
                        }
                    );

                    setOrders(ordersData);
                }
            } catch (error) {
                // console.error("use get user orders error", error)
                setOrders([]);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [isAuthenticated, user?.id, pathname]);

    return { isLoading, orders, setOrders };
}
