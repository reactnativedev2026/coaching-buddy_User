import api from "@/lib/axios/axios";
import ApiResponseType from "@/types/ApiRespnse.type";

export async function getParentCategories() {
    const res = await api.get<
        ApiResponseType<
            {
                uid: string;
                name: string;
                parent_id: string;
                icon_img_path: string;
            }[]
        >
    >("/category/parents");

    return res.data;
}

export async function getSubCategoriesOrStores(parentCategoryId: string) {
    const res = await api.get<
        ApiResponseType<{
            isSubCategories?: boolean;
            categories?: {
                uid: string;
                name: string;
                parent_id: string;
                icon_img_path: string;
            }[];

            isColleges?: boolean;
            colleges?: {
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
            }[];
        }>
    >(`/category/sub-categories-or-stores/${parentCategoryId}`);

    return res.data;
}
