import {
  transactionSchema,
  type TransactionSchemaDTO,
} from "@/schemas/transaction-schema";
import api from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddTransactionHooks() {
    const queryClient = useQueryClient();
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm<TransactionSchemaDTO>({
    resolver: zodResolver(transactionSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TransactionSchemaDTO) => {
      const response = await api.post("/transactions", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction"],
      });
      toast.success("Transaction Success");
      closeRef.current?.click();
      form.reset();
    },
    onError: (error: any) => {
      console.error(
        "Transaction gagal:",
        error?.response?.data || error.message
      );
      toast.error("Transaction fail");
    },
  });

  const onSubmit = (data: TransactionSchemaDTO) => {
    mutation.mutate(data);
  };

  return { form, onSubmit,closeRef,mutation };
}
