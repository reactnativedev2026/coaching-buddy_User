import api from "@/lib/axios/axios";
import ApiResponseType from "@/types/ApiRespnse.type";
import UserType from "@/types/User.type";

export async function auth() {
    const res = await api.get<ApiResponseType<UserType>>("/user/auth");
    return res.data;
}

export async function login(email: string) {
    const res = await api.post<
        ApiResponseType<{
            userId: string;
        }>
    >("/user/sign-in", { email });

    return res.data;
}

export async function verifyOTP(otp: string, userId: string) {
    const res = await api.post<
        ApiResponseType<{
            isNew: boolean;
            user: UserType;
            token?: string;
        }>
    >("/user/otp/verify", { otp, userId });

    return res.data;
}

export async function resendOTP(userId: string) {
    const res = await api.post<ApiResponseType<null>>("/user/otp/resend", {
        userId,
    });

    return res.data;
}

type SignUpParamsType = {
    email: string;
    name: string;
    phone?: string;
    area:string;
    state:string;
    pincode:string;
    landmark:string;
    city:string;
    avatarName: string;
    gender:string
};

export async function signUp(data: SignUpParamsType) {
    console.log(data,"llllllllllllllllllllllllll")
    const res = await api.post<
        ApiResponseType<{
            user: UserType;
            token: string;
        }>
    >(`/user/sign-up/`, data);

    return res.data;
}

type UpdateUserParamsType = {
    name: string;
    phone?: string;
    avatarName: string;
};

export async function updateUser(userId: string, data: UpdateUserParamsType) {
    const res = await api.put<
        ApiResponseType<{
            user: UserType;
            token?: string;
        }>
    >(`/user/update/${userId}`, data);

    return res.data;
}
