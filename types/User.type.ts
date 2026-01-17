import AvatarType from "./Avatar.type";

type UserType = {
    id: string;
    name?: string;
    email: string;
    phone?: string;
    area?:string;
    state?:string;
    pincode?:string;
    landmark?:string;
    avatarName?: AvatarType;
};

export default UserType;
