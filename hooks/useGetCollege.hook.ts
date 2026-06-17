import { getCollege } from "@/api/college.api";
import { useAppSelector } from "@/redux/store";
import CollegeType from "@/types/College.type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function useGetCollege() {
    const { id } = useLocalSearchParams<{
        id: string;
    }>();
    const { isAuthenticated } = useAppSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [college, setCollege] = useState<CollegeType | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        setIsLoading(true);

        (async function () {
            try {
                const res = await getCollege(id);

                console.log(JSON.stringify(res.data),"::::::::::::::::::API DATAAAAAAAAAAAAAAAAAAAAAAAAAAA");

            if (res.data != null) {
  const logoImages = res.data.images.logo?.map((logoItem) => logoItem.path) || [];
  const galleryImages = res.data.images.gallery?.map((galleryItem) => galleryItem.path) || [];
  const bannerImages = res.data.images.banner?.map((bannerItem) => bannerItem.path) || [];
  const coverImages = res.data.images.cover?.map((coverItem) => coverItem.path) || [];

  setCollege({
    id: res.data.uid,
    name: res.data.name,
    ownerName: res.data.owner_name,
    amountPaid: res.data.amount_paid,
    shortDescription: res.data.short_desc,
    longDescription: res.data.long_desc,
    images: {
      logo: logoImages,
      gallery: galleryImages,
      banner: bannerImages,
      cover: coverImages,
    },
    address: {
      state: res.data.address?.state || "",
      city: res.data.address?.city || "",
      area: res.data.address?.area || "",
      nearBy: res.data.address?.near_by || "",
      pincode: res.data.address?.pincode || "",
    },
    comments: res.data.comments?.map((item) => ({
      id: item.uid,
      rating: item.rating,
      comment: item.comment,
      reply: item.reply,
      createdAt: item.created_at,
      userName: item.user_name,
      userId: item.user_id,
    })) || [],
    categories: res.data.categories?.map((category) => ({
      id: category.uid,
      name: category.name,
    })) || [],
    details: res.data.details?.map((detail) => ({
      type: detail.type,
      value: detail.value,
    })) || [],
    courses: res.data.products?.map((product) => ({
      id: product.uid,
      name: product.name,
      price: product.price,
      sellingPrice: product.selling_price,
      discount: product.discount,
      shortDescription: product.short_desc,
      images: product.images?.map((img) => img.path) || [],
      category: product.keywords?.[0]?.keyword || "",
    })) || [],
  });
}

            } catch (error) {
                // console.error("use get college error ", error);
                setCollege(null);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [isAuthenticated]);

    return { isLoading, college, setCollege };
}
