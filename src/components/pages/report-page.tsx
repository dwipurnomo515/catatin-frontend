import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Download,
  FileText,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FilterTransaction from "../hooks/filter-transaction-hooks";
import { Badge } from "../ui/badge";

export default function ReportPage() {
  // Mock data
  const monthlyData = [
    { month: "Jan", income: 6000000, expense: 3500000 },
    { month: "Feb", income: 5500000, expense: 4000000 },
    { month: "Mar", income: 7000000, expense: 3800000 },
    { month: "Apr", income: 6500000, expense: 4200000 },
    { month: "May", income: 8000000, expense: 4500000 },
    { month: "Jun", income: 7500000, expense: 4000000 },
  ];

  const categoryData = [
    { name: "Food", value: 2500000, color: "#f87171" }, // red-500
    { name: "Transport", value: 1500000, color: "#22c55e" }, // green-500
    { name: "Entertainment", value: 800000, color: "#eab308" }, // yellow-500
    { name: "Health", value: 600000, color: "#ef4444" }, // red-500 (destructive)
    { name: "Education", value: 400000, color: "#6b7280" }, // gray-500
    { name: "Others", value: 700000, color: "#3b82f6" }, // blue-500
  ];

  const summary = {
    totalIncome: 45500000,
    totalExpense: 24000000,
    balance: 21500000,
    monthlyGrowth: 15.8,
  };

  const { formatCurrency } = FilterTransaction();
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Report</h1>
          <p className="text-muted-foreground">
            Analysis and statistics of your finances
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="text-2xl font-bold text-success">
                {formatCurrency(summary.totalIncome)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
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
              <TrendingDown className="h-5 w-5 text-destructive" />
              <span className="text-2xl font-bold text-destructive">
                {formatCurrency(summary.totalExpense)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(summary.balance)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Net balance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-warning" />
              <span className="text-2xl font-bold text-warning">
                {formatCurrency(summary.totalIncome / 6)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average monthly income
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>
              Comparison of income and expenses over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 20, left: 30, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#7f807e" />
                <XAxis dataKey="month" stroke="#050505" />
                <YAxis width={70} stroke="#050505" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any) => [formatCurrency(value), ""]}
                />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#22c55e"
                  name="Income"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Pie Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Distribution of expenses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [formatCurrency(value), "Amount"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid md:grid-cols-2 gap-2 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {category.name}
                  </span>
                  <span className="text-sm font-medium ml-auto">
                    {formatCurrency(category.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
          <CardDescription>
            A comprehensive summary of your finances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Income</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Highest</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(8000000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Lowest</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(5500000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(6583333)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Expenses</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Highest</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(4500000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Lowest</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(3500000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(4000000)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Efficiency</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Saving Rate
                  </span>
                  <Badge variant="secondary">39.2%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Burn Rate
                  </span>
                  <Badge variant="secondary">60.8%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Growth</span>
                  <Badge
                    variant="default"
                    className="bg-success text-success-foreground"
                  >
                    +{summary.monthlyGrowth}%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
