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
                                showTag: item.new_tag,
                                tag: item.new_tag_text,
                            };
                        });

                        setCategories(data);
                        setColleges([]);
                    } else if (
                        res.data.isColleges &&
                        res.data.colleges != null
                    ) {
                        const data = res.data.colleges.map((item) => {
                            const logoImages =
                                item.images.logo?.map((i) => i.path) || [];
                            const galleryImages =
                                item.images.gallery?.map((i) => i.path) || [];
                            const bannerImages =
                                item.images.banner?.map((i) => i.path) || [];
                            const coverImages =
                                item.images.cover?.map((i) => i.path) || [];

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
                                    state: item.address?.state || "",
                                    city: item.address?.city || "",
                                    area: item.address?.area || "",
                                    nearBy: item.address?.near_by || "",
                                    pincode: item.address?.pincode || "",
                                },
                                comments:
                                    item.comments?.map((c) => ({
                                        id: c.uid,
                                        rating: c.rating,
                                        comment: c.comment,
                                        reply: c.reply,
                                        createdAt: c.created_at,
                                        userName: c.user_name,
                                        userId: c.user_id,
                                    })) || [],
                                categories:
                                    item.categories?.map((cat) => ({
                                        id: cat.uid,
                                        name: cat.name,
                                    })) || [],
                                details:
                                    item.details?.map((d) => ({
                                        type: d.type,
                                        value: d.value,
                                    })) || [],
                                courses:
                                    item.products?.map((p) => ({
                                        id: p.uid,
                                        name: p.name,
                                        price: p.price,
                                        sellingPrice: p.selling_price,
                                        discount: p.discount,
                                        shortDescription: p.short_desc,
                                        images:
                                            p.images?.map((img) => img.path) ||
                                            [],
                                        category:
                                            p.keywords?.[0]?.keyword || "",
                                    })) || [],
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
