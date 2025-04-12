import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AddTransaction() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'income',
    category: '',
    date: '',
    isRecurring: false,
    interval: 'monthly'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      recurring: form.isRecurring ? { interval: form.interval } : null
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      navigate('/dashboard');
    } else {
      const err = await res.json();
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={form.amount}
          onChange={handleChange}
        />

        <select name="type" className="w-full p-2 border rounded" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Food, Rent)"
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full p-2 border rounded"
          value={form.date}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="isRecurring" checked={form.isRecurring} onChange={handleChange} />
          <span>Recurring</span>
        </label>

        {form.isRecurring && (
          <select name="interval" className="w-full p-2 border rounded" value={form.interval} onChange={handleChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        )}

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
