import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
                        Nexus<span className="text-gray-800">Verify</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                        {user ? (
                            <>
                                <span className="text-gray-800 font-medium flex items-center">
                                    <FaUserCircle className="mr-2 text-xl text-blue-500" />
                                    {user.username} ({user.role || 'User'})
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-red-500 hover:text-red-700 font-medium transition-colors"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    <FaSignInAlt className="mr-2" /> Login
                                </Link>
                                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center">
                                    <FaUserPlus className="mr-2" /> Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100">
                            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                            {user ? (
                                <>
                                    <span className="text-gray-800 font-medium">Hi, {user.username}</span>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="text-red-500 font-medium flex items-center"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium flex items-center" onClick={() => setIsOpen(false)}>
                                        <FaSignInAlt className="mr-2" /> Login
                                    </Link>
                                    <Link to="/register" className="text-blue-600 font-medium flex items-center" onClick={() => setIsOpen(false)}>
                                        <FaUserPlus className="mr-2" /> Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
