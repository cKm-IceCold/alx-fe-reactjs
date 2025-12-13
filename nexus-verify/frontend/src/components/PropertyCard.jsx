import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified':
                return <FaCheckCircle className="text-green-500" />;
            case 'pending':
                return <FaExclamationTriangle className="text-yellow-500" />;
            case 'rejected':
                return <FaTimesCircle className="text-red-500" />;
            default:
                return <FaExclamationTriangle className="text-gray-400" />;
        }
    };

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'low': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Link to={`/property/${property.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1">
                <div className="h-48 bg-gray-300 relative">
                    {/* Placeholder for Image - use API image if available */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <span>No Image</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
                        {getStatusIcon(property.verification_status)}
                        <span className="text-sm font-medium capitalize">{property.verification_status}</span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition-colors">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{property.location}</p>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                            ${property.price_audit_value ? Number(property.price_audit_value).toLocaleString() : 'N/A'}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase ${getRiskColor(property.fraud_risk_level)}`}>
                            Risk: {property.fraud_risk_level}
                        </span>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm text-gray-500">
                        <span>ID: {property.property_id}</span>
                        <span>{property.zoning_status}</span>
                    </div>

                    {/* View Details Button could go here or wrap card in Link */}
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
