// Komponen searchbar di dashboard
import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="p-2 border border-gray-300 rounded-md"
      onChange={e => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
