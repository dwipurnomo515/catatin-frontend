import {
  transactionSchema,
  type TransactionSchemaDTO,
} from "@/schemas/transaction-schema";
import api from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditTransactionHooks({
  transaction,
}: {
  transaction: TransactionSchemaDTO;
}) {
  const form = useForm<TransactionSchemaDTO>({
    resolver: zodResolver(transactionSchema),
  });

  const closeRef = useRef<HTMLButtonElement>(null);

  const amount = transaction.amount.toString();
  
  useEffect(() => {
    if (transaction) {
      form.reset({
        amount: amount,
        type: transaction.type,
        category_id: transaction.category_id,
        date: transaction.date,
        description: transaction.description,
      });
    }
  }, [transaction, form.reset]);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending: editTransactionPending } = useMutation({
    mutationKey: ["edit-transactions"],
    mutationFn: async (data: TransactionSchemaDTO) => {
      const response = await api.patch(`/transactions/${transaction.id}`, data);
      return response.data;
    },
    onError: () => {
      toast.error("something wrong");
    },
    onSuccess: async () => {
      toast.success("edited");
      await queryClient.invalidateQueries({
        queryKey: ["transaction"],
      });
      closeRef.current?.click();
    },
  });

  const onSubmit = (data: TransactionSchemaDTO) => {
    
    mutateAsync(data);
  };

  return { form, onSubmit, editTransactionPending, closeRef };
}
