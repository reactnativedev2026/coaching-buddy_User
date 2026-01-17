import api from "@/lib/axios/axios";
import ApiResponseType from "@/types/ApiRespnse.type";
import { CollegeAPIResponseDataType } from "./college.api";

export async function getParentCategories() {
  const res = await api.get<
    ApiResponseType<
      {
        uid: string;
        name: string;
        parent_id: string;
        icon_img_path: string;
        new_tag: number;
        new_tag_text?: string;
      }[]
    >
  >("/category/parents");

  return res.data;
}

export async function getSubCategoriesOrStores(parentCategoryId: string) {
  const res = await api.get<
    ApiResponseType<{
      isSubCategories?: boolean;
      categories?: {
        uid: string;
        name: string;
        parent_id: string;
        icon_img_path: string;
         new_tag: number;
        new_tag_text?: string;
      }[];

      isColleges?: boolean;
      colleges?: CollegeAPIResponseDataType[];
    }>
  >(`/category/sub-categories-or-stores/${parentCategoryId}`);
  return res.data;
}
