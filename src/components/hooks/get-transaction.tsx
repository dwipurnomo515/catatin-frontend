import type { TransactionSchemaDTO } from "@/schemas/transaction-schema";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

type Search = {
  search?: string;
  category_id?: string;
  type: string;
  start?: string;
  end?: string;
};

export default function GetTransaction({
  category_id,
  search,
  type,
  start,
  end,
}: Search) {
  const { data: transactions, isPending } = useQuery<TransactionSchemaDTO[]>({
    queryKey: ["transaction", { category_id, search, type, start, end }],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (type && type !== "all") params.append("type", type);

      if (category_id && category_id !== "all")
        params.append("category_id", category_id);
      if (search) params.append("search", search);
      if (start) params.append("start", start);
      if (end) params.append("end", end);

      const response = await api.get(`/transactions?${params.toString()}`);
      return response.data;
    },
    
  });

  return {
    transactions,
    isPending,
  };
}
