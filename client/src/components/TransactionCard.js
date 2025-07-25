export default function TransactionCard({ type, category, amount, date, _id, onDelete, onEdit }) {
  const bgColor = type === "income" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`flex justify-between items-center p-4 rounded-lg ${bgColor} text-white mb-3`}>
      <div>
        <h4 className="font-semibold">{category}</h4>
        <p className="text-sm">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">₹{amount}</span>
        <button onClick={() => onEdit({ type, category, amount, date, _id })} className="bg-white text-blue-600 px-2 py-1 rounded text-sm font-semibold">
          Edit
        </button>
        <button onClick={() => onDelete(_id)} className="bg-white text-red-600 px-2 py-1 rounded text-sm font-semibold">
          Delete
        </button>
      </div>
    </div>
  );
}
