import { registerSchema, type RegisterSchemaDTO } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RegisterHooks() {
  const form = useForm<RegisterSchemaDTO>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchemaDTO) => {
    console.log(data);
  };

  return {
    form,
    onSubmit,
  };
}
