import type { CategorySchemaDTO } from "@/schemas/category-schema";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function GetCategory() {
  const { data : categories, isPending } = useQuery<CategorySchemaDTO[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data;
    },
  });

  function getCategoryName(id: number) {
    return categories?.find((c) => c.id === id)?.name ?? "Unknown";
  }
  return{
    categories,
    isPending,
    getCategoryName
  }
}

