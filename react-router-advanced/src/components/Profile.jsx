import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile</h2>

      <nav>
        <NavLink to="details">Details</NavLink> |{" "}
        <NavLink to="settings">Settings</NavLink>
      </nav>

      <hr />

      {/* Nested Routes */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}

export default Profile;
