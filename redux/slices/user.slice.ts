import UserType from "@/types/User.type";
import { createSlice } from "@reduxjs/toolkit";

type UserStateType = {
    user: UserType | null;
    isAuthenticated: boolean;
    isOnboarding: boolean;
    isLoading: boolean;
};

type SetUserActionType = {
    payload: UserType | null;
};

const initialState: UserStateType = {
    user: null,
    isAuthenticated: false,
    isOnboarding: true,
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

        setIsOnboarding(state, action: { payload: boolean }) {
            state.isOnboarding = action.payload;
        },
    },
});

export default userSlice.reducer;
export const { setUser, setIsAuthenticated, setIsLoading, setIsOnboarding } =
    userSlice.actions;
