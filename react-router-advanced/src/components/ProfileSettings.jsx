import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

const ProfileSettings = () => (
  <div style={{ padding: '10px' }}>
    <h4>User Settings Content</h4>
    <p>Here, a user can change preferences or update their password.</p>
    <p>The parent Profile layout (header, nav links) persists when this component is active.</p>
  </div>
);

export default ProfileSettings;