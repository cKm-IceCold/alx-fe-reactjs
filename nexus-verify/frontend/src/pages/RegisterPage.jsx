import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserShield } from 'react-icons/fa';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer' // Default role
    });
    const [error, setError] = useState('');
    const { registerUser, loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await registerUser(formData);
            // Optionally auto-login after register
            await loginUser(formData.username, formData.password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Registration failed. Username may already be taken.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join Nexus Verify today</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <div className="grid grid-cols-3 gap-3">
                            <div
                                onClick={() => setFormData({ ...formData, role: 'customer' })}
                                className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.role === 'customer' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'hover:bg-gray-50'}`}
                            >
                                <FaUser className="mx-auto mb-2 text-xl" />
                                <span className="text-xs font-semibold block">Customer</span>
                            </div>
                            <div
                                onClick={() => setFormData({ ...formData, role: 'realty_co' })}
                                className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.role === 'realty_co' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'hover:bg-gray-50'}`}
                            >
                                <FaBuilding className="mx-auto mb-2 text-xl" />
                                <span className="text-xs font-semibold block">Realty Co.</span>
                            </div>
                            <div
                                onClick={() => setFormData({ ...formData, role: 'auditor' })}
                                className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.role === 'auditor' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'hover:bg-gray-50'}`}
                            >
                                <FaUserShield className="mx-auto mb-2 text-xl" />
                                <span className="text-xs font-semibold block">Auditor</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
