import { categorySchema, type CategorySchemaDTO } from "@/schemas/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function AddCategoryHooks() {
  const form = useForm<CategorySchemaDTO>({
    resolver: zodResolver(categorySchema),
   
  });

  const  onSubmit = (data: CategorySchemaDTO) => {
    console.log(data)
  }

  return { form, onSubmit };
}
