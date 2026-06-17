import useDebounce from "@/hooks/useDebounce.hook";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { saveCollege } from "@/api/college.api";
import { addToSaved, removeFromSaved } from "@/redux/slices/save.slice";
import CollegeType from "@/types/College.type";
import SavedType from "@/types/Saved.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { useCallback } from "react";
import CustomButton from "../common/CustomButton";

export default function SaveButton({
    item,
}: {
    item: CollegeType | SavedType;
}) {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.user);
    const { saved } = useAppSelector((state) => state.saved);
    const pathname = usePathname();

    const savedItem = saved.find((saveItem) => {
        return saveItem.id === item.id;
    });

    function isSavedType(arg: CollegeType | SavedType): arg is SavedType {
        if (Object.keys(arg).includes("image")) return true;

        return false;
    }

    const debouncedSave = useDebounce(
        useCallback(
            async (collegeId: string) => {
                if (!isAuthenticated) return;

                await saveCollege(collegeId);
            },
            [isAuthenticated]
        ),
        1000
    );

    async function handleOnPressSaveButton() {
        if (savedItem == null) {
            if (isSavedType(item))
                dispatch(
                    addToSaved({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        address: item.address,
                        categoryName: item.categoryName,
                    })
                );
            else
                dispatch(
                    addToSaved({
                        id: item.id,
                        name: item.name,
                        image: item.images.cover[0],
                        address: item.address,
                        categoryName: item.categories.at(-1)?.name!,
                    })
                );
        } else {
            dispatch(removeFromSaved(savedItem.id));
        }

        await debouncedSave(item.id);
    }

    return (
        <CustomButton
            className={`w-12 aspect-square items-center justify-center rounded-full p-1 ${pathname.startsWith("/college") ? "bg-secondary" : "bg-accent1/10"}`}
            onPress={handleOnPressSaveButton}
        >
            <MaterialCommunityIcons
                name="bookmark-minus"
                size={24}
                color={savedItem == null ? "#242424" : "#0d9488"}
            />
        </CustomButton>
    );
}
