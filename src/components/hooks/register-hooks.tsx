import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterSchemaDTO } from "@/schemas/auth-schema";

const RegisterHooks = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterSchemaDTO>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Redirect ke login atau dashboard
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("Register error:", error.response?.data || error.message);
      alert("Register gagal: " + (error.response?.data?.message || "Terjadi kesalahan"));
    },
  });

  const onSubmit = (data: RegisterSchemaDTO) => {
    console.log(data);
    mutation.mutate(data);
  };

  return { form, onSubmit };
};

export default RegisterHooks;
