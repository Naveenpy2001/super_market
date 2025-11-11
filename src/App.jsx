import React from "react";
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerShop from './pages/Shop';
import InventoryManagement from './pages/Inventory';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* <Navigation /> */}
        <div className="max-w-7xl mx-auto p-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/shop" element={<CustomerShop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
