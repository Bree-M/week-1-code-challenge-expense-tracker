import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      alert("Please fill out all fields");
      return;
    }

    const newExpense = {
      ...formData,
      id: Date.now(), // Add unique ID
      amount: parseFloat(formData.amount)
    };

    onAddExpense(newExpense); // 🚀 Pass data up
    setFormData({ title: '', amount: '', category: '', date: '' }); // Reset
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-xl mx-auto mb-6">
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="p-2 border w-full mb-2" />
      <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" className="p-2 border w-full mb-2" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="p-2 border w-full mb-2" />
      <input name="date" type="date" value={formData.date} onChange={handleChange} className="p-2 border w-full mb-2" />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Add</button>
    </form>
  );
};

export default ExpenseForm;

