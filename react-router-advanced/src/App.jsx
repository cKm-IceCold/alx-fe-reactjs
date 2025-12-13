import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";


function App() {
  return (
    <BrowserRouter>
<Route path="/profile" element={<Profile />}>
  <Route path="details" element={<ProfileDetails />} />
  <Route path="settings" element={<ProfileSettings />} />
</Route>
<Route path="/blog/:slug" element={<BlogPost />} />
</BrowserRouter>
  );
}

export default App;
