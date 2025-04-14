import React, { useState, useMemo } from 'react';

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Groceries', category: 'Food', amount: 50, date: '2025-04-14' },
    { id: 2, name: 'Internet Bill', category: 'Utilities', amount: 75, date: '2025-04-13' },
    { id: 3, name: 'Coffee', category: 'Food', amount: 4.5, date: '2025-04-12' },
    { id: 4, name: 'smoothie', category: 'Food', amount: 4.5, date: '2025-04-12' },
    { id: 5, name: 'Dinner', category: 'Food', amount: 10.5, date: '2025-04-12' },
    { id: 3, name: '', category: '', amount: 0, date: '' }
  ]);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
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
    <div style={{ padding: '1rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Expense Table</h2>

      {/* Search and Sort Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem',height:'3rem' }}>
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

      {/* Expense Table */}
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




