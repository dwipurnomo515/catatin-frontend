export interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface CategoryBreakdown {
  name: string;
  amount: number;
  percentage: number;
}

export interface DashboardResponse {
  total_income: number;
  total_expense: number;
  balance: number;
  monthly_growth: number;
  recent_transactions: Transaction[];
  category_breakdown: CategoryBreakdown[];
}