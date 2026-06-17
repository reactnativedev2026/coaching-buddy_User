import { getSearchCollegesSuggestions } from "@/api/college.api";
import SearchCollegesSuggestionsType from "@/types/SearchCollegeSuggestions.type";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce.hook";

export default function useGetSearchCollegesSuggestions(search: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<
        SearchCollegesSuggestionsType[]
    >([]);

    const debouncedGetSearchCollegesSuggestions = useDebounce(
        useCallback(
            async function () {
                if (search.trim() === "") return;

                setIsLoading(true);

                try {
                    const res = await getSearchCollegesSuggestions(search);

                    if (res.data != null) {
                        const data = res.data.map((item) => {
                            return {
                                id: item.uid,
                                name: item.name,
                                city: item.city,
                                coverImages: item.cover_images,
                            };
                        });

                        setSuggestions(data);
                    }
                } catch (error) {
                    // console.error("Use get search colleges suggestions error ", error);
                    setSuggestions([]);
                } finally {
                    setIsLoading(false);
                }
            },
            [search]
        ),
        500
    );

    useEffect(() => {
        debouncedGetSearchCollegesSuggestions();
    }, [debouncedGetSearchCollegesSuggestions]);

    return { isLoading, suggestions };
}
