import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowDownCircle,
  ArrowRight,
  ArrowUpCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import { useDashboardData } from "@/hooks/useDashboardData";
import type { Transaction, CategoryBreakdown } from "@/schemas/dashboard";



export default function Dashboard() {

  const { data, isLoading, isError } = useDashboardData();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };


    if (isLoading) return <div>Loading dashboard...</div>;
    if (isError || !data) return <div>Failed to load dashboard data</div>;

    const summary = {
      totalIncome: data.total_income,
      totalExpense: data.total_expense,
      balance: data.balance,
      monthlyGrowth: data.monthly_growth,
    };

    const recentTransactions = data.recent_transactions;
    const categories = data.category_breakdown;


  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Your financial summary for this month
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <ArrowUpCircle className="h-5 w-5 text-success" />
              <span className="text-2xl font-bold text-success">
                {formatCurrency(summary.totalIncome)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <ArrowDownCircle className="h-5 w-5 text-destructive" />
              <span className="text-2xl font-bold text-destructive">
                {formatCurrency(summary.totalExpense)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Final Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(summary.balance)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              <span className="text-2xl font-bold text-warning">
                +{summary.monthlyGrowth}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Last 5 transactions</CardDescription>
                </div>
                <Link to="/transactions">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.slice(0, 5).map((transaction : Transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-success/20 text-success"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpCircle className="h-5 w-5" />
                      ) : (
                        <ArrowDownCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>This month’s breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category : CategoryBreakdown, index : number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.percentage}%
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <div className="text-right">
                    <span className="text-sm font-semibold">
                      {formatCurrency(category.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
