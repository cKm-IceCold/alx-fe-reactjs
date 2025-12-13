# 🛡️ Advanced React Router (v6) Demo Project

This project serves as a comprehensive demonstration of advanced routing techniques using **React Router DOM v6**, including nested layouts, dynamic URL handling, and authentication-based protected routes.

## 1. Project Setup

### Prerequisites

* Node.js and npm (or yarn/pnpm)

### Installation

1.  Navigate to your project directory.
2.  Install the required dependency:
    ```bash
    npm install react-router-dom
    ```
3.  Ensure your app is wrapped in the `<BrowserRouter>` and the `AuthProvider` (for authentication context) in `main.jsx`.
4.  Start the development server:
    ```bash
    npm run dev
    ```

## 2. Core Routing Concepts Implemented

The application's routing logic is centralized in `src/App.jsx`.

| Feature | Implementation | Components Involved | Description |
| :--- | :--- | :--- | :--- |
| **Protected Routes** | `<ProtectedRoute>` wrapper | `Profile.jsx`, `ProtectedRoute.jsx`, `AuthContext.jsx` | Restricts access to authenticated users. Unauthenticated users are redirected to `/login`. |
| **Nested Routing** | Parent Route with `<Outlet />` | `Profile.jsx`, `ProfileDetails.jsx`, `ProfileSettings.jsx` | Allows child components (`details`, `settings`) to render inside the parent (`Profile`) component's layout. |
| **Dynamic Routing** | `path="/blog/:postId"` | `PostDetail.jsx` | Uses URL parameters (`:postId`) to load specific content, accessed via the `useParams()` hook. |
| **Authentication Flow** | `useAuth()` + `useNavigate()` | `Login.jsx` | Manages login state and handles redirection back to the page the user intended to visit (`location.state.from`). |
| **Catch-all** | `path="*"` | `NotFound.jsx` | Renders a custom 404 page for invalid URLs. |

## 3. How to Test the Routes

To verify the routing functionality, follow these steps:

1.  **Test Protection (Logged Out State):**
    * Click the **"Profile (Protected)"** link.
    * **Expected:** You should be instantly redirected to the **Login** page.
2.  **Test Authentication Flow:**
    * Enter any username (e.g., `user1`) on the Login page and submit.
    * **Expected:** You are immediately navigated to the **Profile** page.
3.  **Test Nested Routing:**
    * While on the `/profile` page, click the internal **"Details"** and **"Settings"** links.
    * **Expected:** The content within the profile border switches, but the main page header and layout remain constant.
4.  **Test Dynamic Routing:**
    * Click the **"Dynamic Post 123"** link.
    * **Expected:** The `PostDetail` component renders, displaying the ID **123** extracted from the URL.
5.  **Test 404:** Manually type a bad URL (e.g., `/non-existent-page`) into the browser bar.
    * **Expected:** The **404 - Page Not Found** component is displayed.