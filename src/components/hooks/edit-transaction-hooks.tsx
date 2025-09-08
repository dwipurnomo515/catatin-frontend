import {
  transactionSchema,
  type TransactionSchemaDTO,
} from "@/schemas/transaction-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function EditTransactionHooks() {
  const form = useForm<TransactionSchemaDTO>({
    resolver: zodResolver(transactionSchema),
   
  });

  const  onSubmit = (data: TransactionSchemaDTO) => {
    console.log(data)
  }

  return { form, onSubmit };
}
