import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChartView({ transactions }) {
  // Group by week/month
  const grouped = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!grouped[key]) grouped[key] = { month: key, income: 0, expense: 0 };
    grouped[key][tx.type] += tx.amount;
  });

  const data = Object.values(grouped);

  return (
    <div className="bg-white text-black p-4 rounded shadow w-full">
      <h3 className="text-xl font-semibold text-center mb-4 text-indigo_dye">Monthly Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#3c6e71" />
          <Bar dataKey="expense" fill="#ff6961" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
