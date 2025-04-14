import React, { useState, useMemo } from 'react';

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Groceries', category: 'Food', amount: 50, date: '2025-04-14' },
    { id: 2, name: 'Internet Bill', category: 'Utilities', amount: 75, date: '2025-04-13' },
    { id: 3, name: 'Coffee', category: 'Food', amount: 4.5, date: '2025-04-12' },
    { id: 4, name: 'Smoothie', category: 'Food', amount: 4.5, date: '2025-04-12' },
    { id: 5, name: 'Dinner', category: 'Food', amount: 10.5, date: '2025-04-12' },
    { id: 6, name: 'Lunch', category: 'Food', amount: 10.5, date: '2025-04-12' },
    { id: 7, name: 'Snacks', category: 'Food', amount: 10.5, date: '2025-04-12' },
    { id: 8, name: 'Dinner', category: '', amount: 10.5, date: '2025-04-12' },
    { id: 9, name: 'Lunch', category: 'Food', amount: 10.5, date: '2025-04-12' },
    { id: 10, name: 'Snacks', category: '', amount: 10.5, date: '2025-04-12' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    amount: '',
    date: '',
  });

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.amount || !formData.date) return;

    const newExpense = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    setExpenses(prev => [...prev, newExpense]);
    setFormData({ name: '', category: '', amount: '', date: '' });
  };

  const filteredExpenses = useMemo(() => {
    let filtered = expenses.filter(
      (e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase())
    );
    if (sortKey) {
      filtered.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    }
    return filtered;
  }, [expenses, search, sortKey]);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Track My Expense.</h2>

      {/* --- Add Expense Form --- */}
      <form onSubmit={handleAddExpense} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} />
        <button type="submit" style={{ gridColumn: 'span 2', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Add Expense
        </button>
      </form>

      {/* --- Search & Sort --- */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="">Sort by...</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* --- Expense Table --- */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount ($)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No expenses found</td>
            </tr>
          ) : (
            filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.name}</td>
                <td>{exp.category}</td>
                <td>{exp.amount.toFixed(2)}</td>
                <td>{exp.date}</td>
                <td>
                  <button onClick={() => handleDelete(exp.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;





