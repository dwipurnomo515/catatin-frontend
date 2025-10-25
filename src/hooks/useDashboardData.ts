import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axios.get("https://catatin-backend-production.up.railway.app/api/dashboard");
      return res.data;
    },
  });
};
