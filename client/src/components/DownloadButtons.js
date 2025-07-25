import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DownloadButtons({ data }) {
  const headers = [
    { label: "Type", key: "type" },
    { label: "Category", key: "category" },
    { label: "Amount", key: "amount" },
    { label: "Date", key: "date" },
  ];

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 14, 16);
    const tableData = data.map((tx) => [tx.type, tx.category, tx.amount, new Date(tx.date).toLocaleDateString()]);
    doc.autoTable({
      head: [["Type", "Category", "Amount", "Date"]],
      body: tableData,
    });
    doc.save("transactions.pdf");
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col gap-2 items-center">
      <h3 className="text-lg font-semibold text-indigo_dye mb-2">Export Data</h3>
      <CSVLink data={data} headers={headers} filename="transactions.csv" className="text-blue-600 underline">
        ⬇️ Download CSV
      </CSVLink>
      <button onClick={handlePDF} className="text-red-600 underline">
        ⬇️ Download PDF
      </button>
    </div>
  );
}
