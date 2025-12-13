import React from 'react';
// Note: BrowserRouter is NOT imported here, as it belongs in main.jsx
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'; 
import { useAuth } from './AuthContext';

// Import all required components
import Home from './components/Home';
import About from './components/About';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Simple 404 Component
const NotFound = () => <h2>404 - Page Not Found</h2>;

const App = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // NavLink styling function
  const linkStyle = ({ isActive }) => ({
    margin: '0 10px', 
    textDecoration: isActive ? 'underline' : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    color: '#333'
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Advanced React Routing Demo</h1>

      {/* Navigation Bar */}
      <nav style={{ padding: '10px 0', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/blog/123" style={linkStyle}>Dynamic Post 123</NavLink>
        
        {/* Protected Link */}
        <NavLink to="/profile" style={linkStyle}>Profile (Protected)</NavLink>
        
        {/* Authentication Buttons/Links */}
        {user ? (
          <>
            <span style={{ marginLeft: '30px', color: 'green' }}>Logged in as {user.name}</span>
            <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        ) : (
          <NavLink 
            to="/login" 
            style={linkStyle}
            // State is used to tell the Login component where to navigate after successful login
            state={{ from: location }} 
          >
            Login
          </NavLink>
        )}
      </nav>

      {/* --- START OF ROUTE INTEGRATION: The <Routes> component is added here --- */}
      <Routes>
        
        {/* Public Routes (Basic Router Setup) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* Dynamic Route */}
        <Route path="/blog/:postId" element={<PostDetail />} /> 

        {/* Protected Route with Nested Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute> {/* Protects the entire profile path */}
              <Profile />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes: Renders inside the <Outlet /> in the Profile component. */}
          <Route index element={<ProfileDetails />} /> 
          <Route path="details" element={<ProfileDetails />} /> 
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        
        {/* Catch-all Route (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
       {/* --- END OF ROUTE INTEGRATION --- */}
    </div>
  );
};

export default App;