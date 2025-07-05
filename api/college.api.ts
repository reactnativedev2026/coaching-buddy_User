import api from "@/lib/axios/axios";
import ApiResponseType from "@/types/ApiRespnse.type";

export async function getCollegesByCategoryId(categoryId: string) {
    const res = await api.get<
        ApiResponseType<
            {
                uid: string;
                name: string;
                parent_id: string;
                amount_paid: string;
                images: {
                    logo: { path: string }[];
                    gallery: { path: string }[];
                    banner: { path: string }[];
                    cover: { path: string }[];
                };
                address: {
                    state: string;
                    city: string;
                    area: string;
                    near_by: string;
                    pincode: string;
                };
            }[]
        >
    >(`/store?cid=${categoryId}`);

    return res.data;
}
