import api from "@/lib/axios/axios";
import ApiResponseType from "@/types/ApiRespnse.type";

export type CollegeAPIResponseDataType = {
    uid: string;
    name: string;
    parent_id: string;
    owner_name: string;
    amount_paid: string;
    short_desc: string;
    long_desc: string;
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
    comments?: {
        uid: string;
        rating: number;
        comment: string;
        reply: string;
        created_at: string;
        user_name: string;
        user_id: string;
    }[];
    categories: {
        uid: string;
        name: string;
        parent_id: string;
    }[];
    details: {
        type: "whatsapp" | "phone";
        value: string;
    }[];
    products?: {
        uid: string;
        name: string;
        price: string;
        selling_price: string;
        short_desc: string;
        discount: string;
        images: { path: string }[];
        keywords: { keyword: string }[];
    }[];
};

export async function getCollege(id: string) {
    const res = await api.get<ApiResponseType<CollegeAPIResponseDataType>>(
        `/store/${id}`
    );

    return res.data;
}

export async function getCollegesByCategoryId(categoryId: string) {
    const res = await api.get<ApiResponseType<CollegeAPIResponseDataType[]>>(
        `/store?cid=${categoryId}`
    );

    return res.data;
}

export async function saveCollege(collegeId: string) {
    const res = await api.put(`/store/save/${collegeId}`);

    return res.data;
}

export async function syncSavedColleges(collegeIds: string[]) {
    const res = await api.patch<ApiResponseType<CollegeAPIResponseDataType[]>>(
        "/store/sync-saved",
        {
            storeIds: collegeIds,
        }
    );

    return res.data;
}

type AddCommentParamType = {
    collegeId: string;
    comment: string;
    rating: number;
};

export type AddCommentReturnDataType = {
    id: string;
    rating: number;
    comment: string;
    reply?: string | null;
    createdAt: string;
};

export async function addComment(data: AddCommentParamType) {
    const res = await api.post<ApiResponseType<AddCommentReturnDataType>>(
        `/store/comment/add/${data.collegeId}`,
        {
            rating: data.rating,
            comment: data.comment,
        }
    );

    return res.data;
}

export async function getSearchedColleges(query: string) {
    const res = await api.get<ApiResponseType<CollegeAPIResponseDataType[]>>(
        `/store/search?q=${query}`
    );

    return res.data;
}

export type SearchCollegesSuggestionsAPIResponseDataType = {
    uid: string;
    name: string;
    city: string;
    cover_images?: string[];
};

export async function getSearchCollegesSuggestions(query: string) {
    const res = await api.get<
        ApiResponseType<SearchCollegesSuggestionsAPIResponseDataType[]>
    >(`/store/search/suggestions?q=${query}`);

    return res.data;
}
