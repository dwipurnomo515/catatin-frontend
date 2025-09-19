import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/store/auth-store";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginSchemaDTO } from "@/schemas/auth-schema";
import api from "@/utils/api";



export default function LoginHooks() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const form = useForm<LoginSchemaDTO>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginSchemaDTO) => {
      const response = await api.post(
        "/login",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
    setToken(data.token) 
      navigate("/dashboard"); 
      console.log(data,"ini user login");
    },
    onError: (error: any) => {
      console.error("Login gagal:", error?.response?.data || error.message);
      alert("Login gagal, cek email dan password.");
    },
  });

  const onSubmit = (data: LoginSchemaDTO) => {
    mutation.mutate(data);
  };

  return { form, onSubmit };
}
