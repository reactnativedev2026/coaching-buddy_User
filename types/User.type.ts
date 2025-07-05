import AvatarType from "./Avatar.type";

type UserType = {
    id: string;
    name?: string;
    email: string;
    phone?: string;
    avatarName?: AvatarType;
};

export default UserType;
