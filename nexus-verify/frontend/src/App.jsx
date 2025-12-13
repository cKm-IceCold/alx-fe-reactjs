import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>

          <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Nexus Verify. All rights reserved.
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
