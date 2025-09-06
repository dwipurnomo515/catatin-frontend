import type { RegisterSchemaDTO } from "@/schemas/auth-schema";
import api from "@/utils/api";

export const registerUser = async (data: RegisterSchemaDTO) => {
  const response = await api.post( "/register" , data);
  return response.data;
};
