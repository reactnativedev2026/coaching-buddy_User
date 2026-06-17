import type SavedType from "@/types/Saved.type";
import { createSlice } from "@reduxjs/toolkit";

type SavedStateType = {
    saved: SavedType[];
    isLoading: boolean;
};

type SetSavedActionType = {
    payload: SavedType[];
};

type SetIsLoadingActionType = {
    payload: boolean;
};

type AddToSavedActionType = {
    payload: SavedType;
};

type RemoveFromSavedActionType = {
    payload: string;
};

const initialState: SavedStateType = {
    saved: [],
    isLoading: false,
};

const savedSlice = createSlice({
    name: "saved",
    initialState,
    reducers: {
        setSaved(state, action: SetSavedActionType) {
            state.saved = action.payload;
        },

        addToSaved(state, action: AddToSavedActionType) {
            const alreadySavedIds: string[] = [];

            state.saved.forEach((item) => {
                alreadySavedIds.push(item.id);
            });

            if (alreadySavedIds.includes(action.payload.id)) return;

            const newSaved = [...state.saved, action.payload];

            state.saved = newSaved;
        },

        removeFromSaved(state, action: RemoveFromSavedActionType) {
            const newSaved = state.saved.filter(
                (item) => item.id !== action.payload
            );

            state.saved = newSaved;
        },

        setIsLoading(state, action: SetIsLoadingActionType) {
            state.isLoading = action.payload;
        },
    },
});

export default savedSlice.reducer;
export const { setSaved, addToSaved, removeFromSaved, setIsLoading } =
    savedSlice.actions;
