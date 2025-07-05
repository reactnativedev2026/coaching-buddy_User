import UserType from "@/types/User.type";
import { createSlice } from "@reduxjs/toolkit";

type UserStateType = {
    user: UserType | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

type SetUserActionType = {
    payload: UserType | null;
};

const initialState: UserStateType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: SetUserActionType) {
            state.user = action.payload;
        },

        setIsAuthenticated(state, action: { payload: boolean }) {
            state.isAuthenticated = action.payload;
        },

        setIsLoading(state, action: { payload: boolean }) {
            state.isLoading = action.payload;
        },
    },
});

export default userSlice.reducer;
export const { setUser, setIsAuthenticated, setIsLoading } = userSlice.actions;
