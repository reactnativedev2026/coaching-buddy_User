import { getParentCategories } from "@/api/category.api";
import CategoryType from "@/types/Category.type";
import { useEffect, useState } from "react";

export default function useGetParentCategories() {
    const [isLoading, setIsLoading] = useState(true);
    const [parentCategories, setParentCategories] = useState<CategoryType[]>(
        []
    );

    useEffect(() => {
        (async function () {
            try {
                const res = await getParentCategories();

                if (res.data != null) {
                    const data = res.data.map((item) => {
                        return {
                            id: item.uid,
                            name: item.name,
                            parentId: item.parent_id,
                            imagePath: item.icon_img_path,
                        };
                    });

                    setParentCategories(data);
                }
            } catch (error) {
                setParentCategories([]);
                // console.error("Use get parent categories ", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { isLoading, parentCategories };
}
