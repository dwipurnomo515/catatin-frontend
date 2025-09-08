import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar as CalendarIcon,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import FilterTransaction from "../hooks/filter-transaction-hooks";
import ModalAddTransaction from "../modal/modal-add-transaction";
import ModalEditTransaction from "../modal/modal-edit-transaction";
import { AlertDelete } from "../modal/alert-delete";

export default function Transactions() {
  const categories = [
    "Salary",
    "Freelance",
    "Bonus",
    "Investment", // Income categories
    "Food",
    "Transport",
    "Entertainment",
    "Health",
    "Education",
    "Utilities",
    "Shopping", // Expense categories
  ];

  const {
    dateFrom,
    dateTo,
    searchTerm,
    setSearchTerm,
    filterCategory,
    filterType,
    filteredTransactions,
    formatCurrency,
    setDateFrom,
    setDateTo,
    setFilterCategory,
    setFilterType,
    transactions,
  } = FilterTransaction();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">
            Manage all of your financial transactions
          </p>
        </div>
        <ModalAddTransaction
          triger={
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </>
          }
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Date</Label>
              <div className="flex gap-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start text-left font-normal h-8 text-xs px-2",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {dateFrom ? format(dateFrom, "dd/MM") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 z-50 bg-background border shadow-lg"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDateFrom(date);

                        if (date && dateTo && date > dateTo) {
                          setDateTo(date);
                        }
                      }}
                      disabled={(date) => {
                        return date > new Date();
                      }}
                      className="p-3 pointer-events-auto bg-background"
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start text-left font-normal h-8 text-xs px-2",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {dateTo ? format(dateTo, "dd/MM") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 z-50 bg-background border shadow-lg"
                    align="start"
                  >
                    <Calendar
                      captionLayout="dropdown"
                      mode="single"
                      selected={dateTo}
                      onSelect={(date) => {
                        setDateTo(date);
                        if (date && dateFrom && date < dateFrom) {
                          setDateFrom(date);
                        }
                      }}
                      className="p-3 pointer-events-auto bg-background"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {(dateFrom || dateTo) && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {dateFrom && dateTo
                      ? `${format(dateFrom, "dd/MM")} - ${format(
                          dateTo,
                          "dd/MM"
                        )}`
                      : dateFrom
                      ? `From ${format(dateFrom, "dd/MM")}`
                      : `Until ${format(dateTo!, "dd/MM")}`}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDateFrom(undefined);
                      setDateTo(undefined);
                    }}
                    className="text-xs h-auto p-1"
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Transaction List</CardTitle>
              <CardDescription>
                Showing {filteredTransactions.length} of {transactions.length}{" "}
                transactions
              </CardDescription>
            </div>
            <Badge variant="secondary">
              Total:{" "}
              {formatCurrency(
                filteredTransactions.reduce(
                  (sum, t) =>
                    t.type === "income" ? sum + t.amount : sum - t.amount,
                  0
                )
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === "income"
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpCircle className="h-6 w-6" />
                  ) : (
                    <ArrowDownCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
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
              <div className="flex items-center space-x-4">
                <span
                  className={`font-semibold text-lg ${
                    transaction.type === "income"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
                <div className="flex space-x-2">
                  <ModalEditTransaction
                    triger={
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />

                  <AlertDelete
                    trigger={
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
