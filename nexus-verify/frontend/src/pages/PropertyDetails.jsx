import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaMapMarkerAlt, FaUser, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await api.get(`properties/${id}/`);
                setProperty(response.data);
            } catch (err) {
                console.error("Failed to fetch property", err);
                setError("Failed to load property details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;
    if (error) return <div className="container mx-auto p-4 text-center text-red-600 font-semibold">{error} <br /> <Link to="/" className="text-blue-500 underline mt-4 inline-block">Go Home</Link></div>;
    if (!property) return null;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified': return <FaCheckCircle className="text-green-500 inline mr-2 text-2xl" />;
            case 'pending': return <FaExclamationTriangle className="text-yellow-500 inline mr-2 text-2xl" />;
            case 'rejected': return <FaTimesCircle className="text-red-500 inline mr-2 text-2xl" />;
            default: return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium">
                <FaArrowLeft className="mr-2" /> Back to Properties
            </Link>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Section with Image Placeholder */}
                <div className="h-64 md:h-80 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-medium">
                        No Image Available
                    </div>
                    <div className={`absolute top-0 right-0 m-6 px-4 py-2 rounded-full shadow-md font-bold uppercase tracking-wide bg-white/90 backdrop-blur-md flex items-center ${property.verification_status === 'verified' ? 'text-green-700' :
                            property.verification_status === 'rejected' ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                        {getStatusIcon(property.verification_status)}
                        {property.verification_status}
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{property.title}</h1>
                            <div className="flex items-center text-gray-600">
                                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                <span className="text-lg">{property.location}</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Audited Price</p>
                            <p className="text-3xl font-bold text-blue-600">
                                {property.price_audit_value ? `$${Number(property.price_audit_value).toLocaleString()}` : <span className="text-gray-400 italic text-xl">Pending Audit</span>}
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-100 my-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Property Information */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <FaBuilding className="mr-2 text-gray-400" /> Property Details
                            </h2>
                            <div className="bg-gray-50 rounded-xl p-6  space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Property ID</span>
                                    <span className="font-semibold text-gray-700">{property.property_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Zoning Status</span>
                                    <span className="font-semibold text-gray-700 capitalize">{property.zoning_status}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Owner</span>
                                    <span className="font-semibold text-gray-700 flex items-center h-full">
                                        <FaUser className="mr-2 text-gray-400 text-xs" /> {property.owner_name}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Risk Assessment */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <FaExclamationTriangle className="mr-2 text-gray-400" /> Risk Assessment
                            </h2>
                            <div className={`rounded-xl p-6 border ${property.fraud_risk_level === 'low' ? 'bg-green-50 border-green-100' :
                                    property.fraud_risk_level === 'high' ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'
                                }`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600 font-medium">Fraud Risk Level</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${property.fraud_risk_level === 'low' ? 'bg-green-200 text-green-800' :
                                            property.fraud_risk_level === 'high' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                                        }`}>
                                        {property.fraud_risk_level}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    {property.fraud_risk_level === 'low'
                                        ? "This property has passed all major verification checks. No significant flags found."
                                        : property.fraud_risk_level === 'high'
                                            ? "Critical issues found during verification. Proceed with extreme caution."
                                            : "Some verification steps are pending or have raised minor warnings."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
