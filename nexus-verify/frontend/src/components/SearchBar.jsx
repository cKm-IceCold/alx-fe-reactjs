import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState({ location: '', zoning: '', type: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ term, ...filter });
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex-grow flex items-center border rounded-md px-3 py-2 bg-gray-50">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search by ID, Name, or Location"
                    className="bg-transparent outline-none w-full text-gray-700"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
            </div>

            {/* Filters (Optional enhancement) */}
            <select
                className="border rounded-md px-3 py-2 bg-gray-50 text-gray-700 outline-none"
                value={filter.location}
                onChange={(e) => setFilter({ ...filter, location: e.target.value })}
            >
                <option value="">Any Location</option>
                {/* Mock locations - replace with dynamic if needed */}
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
            </select>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
