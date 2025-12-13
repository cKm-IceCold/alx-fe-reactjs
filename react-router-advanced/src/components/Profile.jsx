import React from 'react';
import { useAuth } from '../AuthContext';
import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <h3>Error: User is not authenticated.</h3>;
  }

  return (
    <div>
      <h2>{user.name}'s Profile Page (Protected)</h2>
      
      {/* Nested Navigation */}
      <nav style={{ marginBottom: '15px' }}>
        <NavLink 
          to="details" 
          style={({ isActive }) => ({ margin: '0 10px', fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Details
        </NavLink>
        <NavLink 
          to="settings" 
          style={({ isActive }) => ({ margin: '0 10px', fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Settings
        </NavLink>
      </nav>
      
      {/* Renders the matching NESTED route component */}
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Profile;