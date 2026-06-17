import api from "@/lib/axios/axios";
import ApiResponseType from "@/types/ApiRespnse.type";

type OrderAPIResponseDataType = {
    uid: string;
    status: string;
    product: {
        name: string;
        price: string;
        selling_price: string;
        discount: string;
        images: { path: string }[];
    };
    store: {
        name: string;
        address: {
            state: string;
            city: string;
            area: string;
            near_by: string;
            pincode: string;
        };
        comments: {
            uid: string;
            rating: number;
        }[];
    };
};

export async function placeOrder(courseId: string) {
    const res = await api.post<
        ApiResponseType<{
            orderId: string;
        }>
    >("/user/order/add", {
        productId: courseId,
    });

    return res.data;
}

export async function getUserOrders(userId: string) {
    const res = await api.get<
        ApiResponseType<{ orders: OrderAPIResponseDataType[] }>
    >(`/user/orders/${userId}`);
    return res.data;
}

export async function cancelOrder(orderId: string) {
    const res = await api.put<ApiResponseType<null>>(
        `/user/order/${orderId}/status`,
        {
            status: "cancelled",
        }
    );

    return res.data;
}
