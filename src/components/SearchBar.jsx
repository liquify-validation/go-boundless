import React, { useState } from "react";
import { MagnifyingGlassIcon } from "../assets";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-8 max-w-full">
      <div className="relative flex items-center">
        <img
          src={MagnifyingGlassIcon}
          alt="Search Icon"
          className="absolute left-3 w-5 h-5 z-10"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full p-3 pl-10 endpoint-card border border-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-1"
        />
      </div>
    </div>
  );
};

export default SearchBar;
