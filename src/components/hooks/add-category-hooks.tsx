import {
  categorySchema,
  type CategorySchemaDTO,
} from "@/schemas/category-schema";
import api from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddCategoryHooks() {
  const queryClient = useQueryClient();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm<CategorySchemaDTO>({
    resolver: zodResolver(categorySchema),
  });
  const mutation = useMutation({
    mutationFn: async (data: CategorySchemaDTO) => {
      const response = await api.post("/categories", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
      })
      closeRef.current?.click();
      form.reset();
      toast.success("Category added");
    },
    onError: (error: any) => {
      console.error("Category gagal:", error?.response?.data || error.message);
      toast.error("Add category fail");
    },
  });

  const onSubmit = (data: CategorySchemaDTO) => {
    mutation.mutate(data);
  };

  return { form, onSubmit,closeRef,mutation };
}
