import React from 'react';

const ProfileDetails = () => (
  <div style={{ padding: '10px' }}>
    <h4>User Details Content</h4>
    <p>This information is only available when the URL is `/profile/details`.</p>
    <p>This is rendered inside the parent Profile component via the {'<Outlet />'} component.</p>
  </div>
);

export default ProfileDetails;