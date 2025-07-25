import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3c6e71", "#ff6961"]; // Income, Expense

export default function SummaryChart({ income, expense }) {
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="bg-white h-full p-4 rounded shadow w-full">
      <h3 className="text-xl font-semibold text-center mb-4 text-indigo_dye">Income vs Expense</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
