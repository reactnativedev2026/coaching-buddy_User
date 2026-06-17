import api from "@/lib/axios/axios";
import ApiResponseType from "@/types/ApiRespnse.type";
export async function getMainBanners() {
  const res = await api.get<
    ApiResponseType<
      {
        id: string;
        title: string;
        url: string;
      }[]
    >
  >("/banner/by-status-type");

  return res.data;
}