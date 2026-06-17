import { getSearchedColleges } from "@/api/college.api";
import CollegeType from "@/types/College.type";
import { useEffect, useState } from "react";

export default function useGetSearchedColleges(search: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [colleges, setColleges] = useState<CollegeType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!search || search.trim() === "") {
                setColleges([]);
                return;
            }

            setIsLoading(true);

            try {
                console.log("SEARCH PARAM", search);
                const res = await getSearchedColleges(search);
                console.log("SEARCH RESPONSE", res);

                if (res.data != null) {
                    const data = res.data.map((item) => {
                        const logoImages =
                            item.images?.logo?.map((i) => i.path) || [];

                        const galleryImages =
                            item.images?.gallery?.map((i) => i.path) || [];

                        const bannerImages =
                            item.images?.banner?.map((i) => i.path) || [];

                        const coverImages =
                            item.images?.cover?.map((i) => i.path) || [];

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
                            comments: item.comments?.map((c) => ({
                                id: c.uid,
                                rating: c.rating,
                                comment: c.comment,
                                reply: c.reply,
                                createdAt: c.created_at,
                                userName: c.user_name,
                                userId: c.user_id,
                            })),
                            categories:
                                item.categories?.map((cat) => ({
                                    id: cat.uid,
                                    name: cat.name,
                                })) || [],
                            details: item.details.map((d) => ({
                                type: d.type,
                                value: d.value,
                            })),
                            courses: item.products?.map((p) => ({
                                id: p.uid,
                                name: p.name,
                                price: p.price,
                                sellingPrice: p.selling_price,
                                discount: p.discount,
                                shortDescription: p.short_desc,
                                images: p.images.map((img) => img.path),
                                category: p.keywords[0]?.keyword || "",
                            })),
                        };
                    });

                    setColleges(data);
                }
            } catch (error) {
                console.log("SEARCH ERROR", error);
                setColleges([]);

            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [search]);

    return { isLoading, colleges };
}