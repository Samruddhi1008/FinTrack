import { useState, useEffect } from "react";
import TransactionCard from "../components/TransactionCard";
import AddTransactionForm from "../components/AddTransactionForm";
import SummaryChart from "../components/SummaryChart";
import BarChartView from "../components/BarChart";
import DownloadButtons from "../components/DownloadButtons";
import DarkModeToggle from "../components/DarkModeToggle";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../api/transactions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [budget, setBudget] = useState(5000);
  const [editTx, setEditTx] = useState(null);
  const [theme, setTheme] = useState("light");

  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    getTransactions()
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Fetch error:", err));

    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleAdd = async (tx) => {
    try {
      const res = await addTransaction(tx);
      setTransactions([res.data, ...transactions]);
      toast.success("Transaction added!");
    } catch (err) {
      toast.error("Error adding transaction");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((tx) => tx._id !== id));
      toast.success("Transaction deleted!");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (tx) => setEditTx(tx);

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await updateTransaction(id, updatedData);
      setTransactions(
        transactions.map((tx) => (tx._id === id ? res.data : tx))
      );
      setEditTx(null);
      toast.success("Transaction updated!");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Summary
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;
  const isOverBudget = totalExpense > budget;

  // Monthly summary
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTransactions = transactions.filter(
    (tx) => new Date(tx.date).toISOString().slice(0, 7) === currentMonth
  );
  const monthlyIncome = monthlyTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const monthlyExpense = monthlyTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const monthlyBalance = monthlyIncome - monthlyExpense;

  // Filter logic
  const filtered = transactions.filter((tx) => {
    const matchType = filterType === "all" || tx.type === filterType;
    const matchCategory =
      filterCategory === "" ||
      tx.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchMonth =
      !filterMonth ||
      new Date(tx.date).toISOString().slice(0, 7) === filterMonth;
    return matchType && matchCategory && matchMonth;
  });

  return (
    <div className={`${theme === "dark" ? "bg-jet text-white" : "bg-white text-black"} min-h-screen p-4`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <DarkModeToggle theme={theme} setTheme={setTheme} />
      </div>
      {user && <p className="mb-4 text-sm">Welcome, {user.email}</p>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-600 p-4 rounded text-center shadow text-white">
          <h3>Total Income</h3>
          <p className="text-xl font-bold">₹{totalIncome}</p>
        </div>
        <div className="bg-red-600 p-4 rounded text-center shadow text-white">
          <h3>Total Expense</h3>
          <p className="text-xl font-bold">₹{totalExpense}</p>
        </div>
        <div className="bg-indigo_dye p-4 rounded text-center shadow text-white">
          <h3>Balance</h3>
          <p className="text-xl font-bold">₹{balance}</p>
        </div>
      </div>

      {/* Chart + Form */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <SummaryChart income={totalIncome} expense={totalExpense} />
        <AddTransactionForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editTx={editTx}
          setEditTx={setEditTx}
        />
      </div>

      {/* Budget & Monthly Summary */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white p-4 rounded shadow mb-4 text-black">
          <label className="font-semibold text-indigo_dye block mb-1">
            Set Monthly Budget (₹)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="border px-3 py-2 rounded w-full"
          />
          {isOverBudget && (
            <div className="mt-2 text-red-700 font-semibold">
              ⚠️ You have exceeded your monthly budget!
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-700 p-4 rounded text-center text-white">
            <h4>This Month's Income</h4>
            <p className="text-xl font-bold">₹{monthlyIncome}</p>
          </div>
          <div className="bg-red-700 p-4 rounded text-center text-white">
            <h4>This Month's Expense</h4>
            <p className="text-xl font-bold">₹{monthlyExpense}</p>
          </div>
          <div className="bg-indigo_dye p-4 rounded text-center text-white">
            <h4>This Month's Balance</h4>
            <p className="text-xl font-bold">₹{monthlyBalance}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow max-w-4xl mx-auto mb-6 text-black flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <label>Type</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border px-2 py-1 rounded">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="e.g. Food"
          />
        </div>
        <div>
          <label>Month</label>
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Bar Chart + Export Buttons */}
      <div className="grid md:grid-cols-2 gap-4 mb-6 max-w-6xl mx-auto">
        <BarChartView transactions={transactions} />
        <DownloadButtons data={filtered} />
      </div>

      {/* Transaction List */}
      <div className="grid gap-4 max-w-4xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-sm">No transactions found.</p>
        ) : (
          filtered.map((tx) => (
            <TransactionCard
              key={tx._id}
              {...tx}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}
