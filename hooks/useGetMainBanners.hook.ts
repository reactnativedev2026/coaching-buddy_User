import { getMainBanners } from "@/api/banner.api";
import BannerType from "@/types/Banner.type";
import { useEffect, useState } from "react";

export default function useGetMainBanners() {
  const [isLoading, setIsLoading] = useState(true);
  const [mainBanners, setMainBanners] = useState<BannerType[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await getMainBanners();
        if (res.data != null) {
        

          setMainBanners(res.data);
        }
      } catch (error) {
        setMainBanners([]);
        // console.error("Use get parent categories ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, mainBanners };
}
