import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ExportCSV, exportToPDF } from "../utils/Export";

function Dashboard() {
  const { token, logout } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="bg-yellow-500 text-white px-10 py-1 rounded"
          >
            Toggle Theme
          </button>
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            Reports
          </button>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>
                <td>${tx.amount}</td>
                <td>{tx.type}</td>
                <td>{tx.category}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mb-4">
        <ExportCSV data={transactions} />
        <button
          onClick={() => exportToPDF("export-section")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>

      <div id="export-section">
        {/* your transactions table or list here */}
      </div>
    </div>
  );
}

export default Dashboard;
