import { NavLink, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div>
      <h2>Profile</h2>

      <nav>
        <NavLink to="details">Details</NavLink> |{" "}
        <NavLink to="settings">Settings</NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default Profile;
