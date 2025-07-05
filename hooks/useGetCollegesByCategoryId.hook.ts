import { getCollegesByCategoryId } from "@/api/college.api";
import CollegeType from "@/types/College.type";
import { useEffect, useState } from "react";

export default function useGetCollegesByCategoryId(
    isCategoriesLoading: boolean,
    categoryId?: string
) {
    const [isLoading, setIsLoading] = useState(true);
    const [colleges, setColleges] = useState<CollegeType[]>([]);

    useEffect(() => {
        if (isCategoriesLoading || categoryId == null) return;

        (async function () {
            try {
                const res = await getCollegesByCategoryId(categoryId);

                if (res.data != null) {
                    const data = res.data.map((item) => {
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

                    setColleges(data);
                }
            } catch (error) {
                // console.error("Use get colleges by category id ", error);
                setColleges([]);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [isCategoriesLoading, categoryId]);

    return { isLoading, colleges };
}
