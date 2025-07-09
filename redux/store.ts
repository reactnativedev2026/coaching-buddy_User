import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import SavedReducer from "./slices/save.slice";
import UserReducer from "./slices/user.slice";

const store = configureStore({
    reducer: {
        user: UserReducer,
        saved: SavedReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
