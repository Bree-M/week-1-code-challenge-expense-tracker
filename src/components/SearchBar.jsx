import React from "react";

function SearchBar({ onSearch }) {
  return (
    <div className="max-w-xl mx-auto mb-4">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by description..."
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
