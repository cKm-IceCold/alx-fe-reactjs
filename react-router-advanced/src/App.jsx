import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import BlogPost from "./components/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";

const user = { name: "Paul" }; // simulate auth

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected profile routes */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic route */}
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
      <Route
  path="/profile/*"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

    </BrowserRouter>
  );
}

export default App;
