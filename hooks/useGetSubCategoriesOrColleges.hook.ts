import { getSubCategoriesOrStores } from "@/api/category.api";
import CategoryType from "@/types/Category.type";
import CollegeType from "@/types/College.type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function useGetSubCategoriesOrColleges() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [colleges, setColleges] = useState<CollegeType[]>([]);
    const { id } = useLocalSearchParams<{
        id: string;
    }>();

    useEffect(() => {
        if (id == null) return;

        (async function () {
            try {
                const res = await getSubCategoriesOrStores(id);

                if (res.data != null) {
                    if (
                        res.data.isSubCategories &&
                        res.data.categories != null
                    ) {
                        const data = res.data.categories.map((item) => {
                            return {
                                id: item.uid,
                                name: item.name,
                                parentId: item.parent_id,
                                imagePath: item.icon_img_path,
                            };
                        });

                        setCategories(data);
                        setColleges([]);
                    } else if (
                        res.data.isColleges &&
                        res.data.colleges != null
                    ) {
                        const data = res.data.colleges.map((item) => {
                            const logoImages = item.images.logo.map(
                                (logoItem) => logoItem.path
                            );
                            const galleryImages = item.images.gallery.map(
                                (galleryItem) => galleryItem.path
                            );
                            const bannerImages = item.images.banner.map(
                                (bannerItem) => bannerItem.path
                            );
                            const coverImages = item.images.cover.map(
                                (coverItem) => coverItem.path
                            );

                            return {
                                id: item.uid,
                                name: item.name,
                                amountPaid: item.amount_paid,
                                images: {
                                    logo: logoImages,
                                    gallery: galleryImages,
                                    banner: bannerImages,
                                    cover: coverImages,
                                },
                                address: {
                                    state: item.address.state,
                                    city: item.address.city,
                                    area: item.address.area,
                                    nearBy: item.address.near_by,
                                    pincode: item.address.pincode,
                                },
                            };
                        });

                        setCategories([]);
                        setColleges(data);
                    }
                }
            } catch (error) {
                setCategories([]);
                setColleges([]);
                // console.error("Use get sub categories or colleges ", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    return { isLoading, categories, colleges };
}
