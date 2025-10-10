import type { CategorySchemaDTO } from "@/schemas/category-schema";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function GetCategoryById(id: number) {

  
  

  const { data : categories, isPending } = useQuery<CategorySchemaDTO>({
    queryKey: ["category",id],
    queryFn: async () => {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    },
  });

  return{
    categories,
    isPending
  }
}
