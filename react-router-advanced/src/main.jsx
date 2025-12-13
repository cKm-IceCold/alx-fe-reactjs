import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CRITICAL: BrowserRouter must wrap the entire application */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);