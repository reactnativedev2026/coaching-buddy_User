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
                            ownerName: item.owner_name,
                            shortDescription: item.short_desc,
                            longDescription: item.long_desc,
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
                            comments: item.comments.map((item) => {
                                return {
                                    id: item.uid,
                                    rating: item.rating,
                                    comment: item.comment,
                                    reply: item.reply,
                                    createdAt: item.created_at,
                                    userName: item.user_name,
                                    userId: item.user_id,
                                };
                            }),
                            categories: item.categories.map((category) => {
                                return {
                                    id: category.uid,
                                    name: category.name,
                                };
                            }),
                            details: item.details.map((detail) => {
                                return {
                                    type: detail.type,
                                    value: detail.value,
                                };
                            }),
                            courses: item.products.map((product) => ({
                                id: product.uid,
                                name: product.name,
                                price: product.price,
                                sellingPrice: product.selling_price,
                                discount: product.discount,
                                shortDescription: product.short_desc,
                                images: product.images.map((img) => img.path),
                                category: product.keywords[0]?.keyword || "",
                            })),
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
