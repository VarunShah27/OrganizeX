import React from 'react';

export default function SearchBar({ searchQuery, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a task..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
