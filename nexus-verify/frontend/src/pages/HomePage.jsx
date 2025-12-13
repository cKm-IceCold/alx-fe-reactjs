import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('properties/', { params });
            setProperties(response.data);
        } catch (err) {
            console.error("Failed to fetch properties", err);
            setError("Failed to load properties. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleSearch = (filters) => {
        // Convert 'term' to 'search' query param if your API expects it
        // My viewset uses valid search_fields = ['title', 'location', 'owner_name', 'property_id']
        // And filter_backends = [filters.SearchFilter] which uses 'search' param by default

        const params = {};
        if (filters.term) params.search = filters.term;
        if (filters.location) params.location = filters.location; // Custom filter in get_queryset

        fetchProperties(params);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Nexus Verify</h1>
                <p className="text-gray-600 text-lg">Trusted Property Verification & Valuation Reports</p>
            </header>

            <SearchBar onSearch={handleSearch} />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    {/* Simple CSS Loader */}
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.length > 0 ? (
                        properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <p className="text-xl">No properties found matching your criteria.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
