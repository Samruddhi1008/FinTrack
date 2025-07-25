import { useState, useEffect } from "react";

export default function AddTransactionForm({ onAdd, onUpdate, editTx, setEditTx }) {
  const [form, setForm] = useState({ type: "income", category: "", amount: "", date: "" });

  useEffect(() => {
    if (editTx) setForm(editTx);
  }, [editTx]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTx) {
      onUpdate(editTx._id, form);
    } else {
      onAdd(form);
    }
    setForm({ type: "income", category: "", amount: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-4 rounded shadow h-full">
      <h3 className="text-lg font-bold mb-4">
        {editTx ? "✏️ Edit Transaction" : "➕ Add Transaction"}
      </h3>
      <div className="mb-2">
        <label>Type</label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-2">
        <label>Category</label>
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="mb-2">
        <label>Amount</label>
        <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="mb-4">
        <label>Date</label>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border rounded" />
      </div>
      <button className="bg-caribbean_current text-white px-4 py-2 rounded w-full">
        {editTx ? "Update" : "Add"}
      </button>
      {editTx && (
        <button type="button" onClick={() => setEditTx(null)} className="mt-2 text-red-500 underline w-full">
          Cancel Edit
        </button>
      )}
    </form>
  );
}
