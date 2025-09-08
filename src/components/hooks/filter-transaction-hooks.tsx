import { useState } from "react";

export default function FilterTransaction() {
  const transactions = [
    {
      id: 1,
      type: "income",
      amount: 5000000,
      category: "Gaji",
      description: "Gaji bulan ini",
      date: "2024-01-15",
    },
    {
      id: 2,
      type: "expense",
      amount: 500000,
      category: "Makanan",
      description: "Belanja bulanan",
      date: "2024-01-14",
    },
    {
      id: 3,
      type: "expense",
      amount: 200000,
      category: "Transport",
      description: "Bensin motor",
      date: "2024-01-13",
    },
    {
      id: 4,
      type: "income",
      amount: 1000000,
      category: "Freelance",
      description: "Project website",
      date: "2024-01-12",
    },
    {
      id: 5,
      type: "expense",
      amount: 150000,
      category: "Hiburan",
      description: "Nonton bioskop",
      date: "2024-01-11",
    },
    {
      id: 6,
      type: "expense",
      amount: 300000,
      category: "Kesehatan",
      description: "Periksa dokter",
      date: "2024-01-10",
    },
    {
      id: 7,
      type: "income",
      amount: 750000,
      category: "Bonus",
      description: "Bonus performance",
      date: "2024-01-09",
    },
    {
      id: 8,
      type: "expense",
      amount: 100000,
      category: "Pendidikan",
      description: "Beli buku",
      date: "2024-01-08",
    },
  ];

  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesCategory =
      filterCategory === "all" || transaction.category === filterCategory;
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const transactionDate = new Date(transaction.date);
    const fromDate = dateFrom
      ? new Date(
          dateFrom.getFullYear(),
          dateFrom.getMonth(),
          dateFrom.getDate()
        )
      : null;
    const toDate = dateTo
      ? new Date(
          dateTo.getFullYear(),
          dateTo.getMonth(),
          dateTo.getDate(),
          23,
          59,
          59
        )
      : null;

    const matchesDateFrom = !fromDate || transactionDate >= fromDate;
    const matchesDateTo = !toDate || transactionDate <= toDate;

    return (
      matchesType &&
      matchesCategory &&
      matchesSearch &&
      matchesDateFrom &&
      matchesDateTo
    );
  });
  return {
    filteredTransactions,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    searchTerm,
    setSearchTerm,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    formatCurrency,
    transactions
  };
}
