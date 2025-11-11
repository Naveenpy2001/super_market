import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Package, AlertCircle, ShoppingCart, Archive, 
  IndianRupee, Clock, X
} from 'lucide-react';
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'https://your-api-url.com/api';

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const getExpiringSoonProducts = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return products.filter(product => {
      if (!product.expiryDate) return false;
      const expiryDate = new Date(product.expiryDate);
      return expiryDate <= nextWeek && expiryDate >= today;
    });
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const lowStockProducts = products.filter(p => p.quantity < p.minStock && p.quantity > 0);
  const outOfStockProducts = products.filter(p => p.quantity === 0);
  const expiringSoonProducts = getExpiringSoonProducts();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);

  const topSellingProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5);
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading dashboard data...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
    <Navbar />

    <div className="space-y-6 p-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 lg:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl lg:text-3xl font-bold mt-2">₹{totalRevenue.toFixed(2)}</p>
              <p className="text-blue-100 text-xs mt-1">From {orders.length} orders</p>
            </div>
            <IndianRupee className="w-8 h-8 lg:w-10 lg:h-10 text-blue-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 lg:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Inventory Value</p>
              <p className="text-2xl lg:text-3xl font-bold mt-2">₹{totalValue.toFixed(2)}</p>
              <p className="text-green-100 text-xs mt-1">{totalProducts} products</p>
            </div>
            <Archive className="w-8 h-8 lg:w-10 lg:h-10 text-green-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 lg:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Items Sold</p>
              <p className="text-2xl lg:text-3xl font-bold mt-2">{totalSold}</p>
              <p className="text-purple-100 text-xs mt-1">Across all products</p>
            </div>
            <ShoppingCart className="w-8 h-8 lg:w-10 lg:h-10 text-purple-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 lg:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Low Stock Alerts</p>
              <p className="text-2xl lg:text-3xl font-bold mt-2">{lowStockProducts.length}</p>
              <p className="text-orange-100 text-xs mt-1">Need restock</p>
            </div>
            <AlertCircle className="w-8 h-8 lg:w-10 lg:h-10 text-orange-200 opacity-80" />
          </div>
        </div>

        {/* Expiring Soon Stats Card */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 lg:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Expiring Soon</p>
              <p className="text-2xl lg:text-3xl font-bold mt-2">{expiringSoonProducts.length}</p>
              <p className="text-red-100 text-xs mt-1">Next 7 days</p>
            </div>
            <Clock className="w-8 h-8 lg:w-10 lg:h-10 text-red-200 opacity-80" />
          </div>
        </div>
      </div>

      {/* Expiring Soon Section */}
      {expiringSoonProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-600" />
            Expiring Soon (Next 7 Days)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {expiringSoonProducts.map((product) => (
              <div key={product.id} className="p-3 lg:p-4 border border-red-200 bg-red-50 rounded-lg">
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-600 mt-1">Expires: {product.expiryDate}</p>
                <p className="text-sm text-gray-600">Current Stock: {product.quantity}</p>
                <p className="text-xs text-red-600 font-medium mt-2">Urgent attention needed</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topSellingProducts.length > 0 ? (
              topSellingProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 text-blue-600 font-bold rounded-full text-xs lg:text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800 text-sm lg:text-base">{product.name}</p>
                      <p className="text-xs lg:text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-sm lg:text-base">{product.sold || 0}</p>
                    <p className="text-xs lg:text-sm text-gray-500">sold</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 text-sm lg:text-base">{order.customer || 'Customer'}</p>
                    <p className="text-xs lg:text-sm text-gray-500">{order.date} • {order.items || 0} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm lg:text-base">₹{(order.total || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Products */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Low Stock Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="p-3 lg:p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-600 mt-1">Current: {product.quantity} • Min: {product.minStock}</p>
                <p className="text-xs text-orange-600 font-medium mt-2">Restock needed</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Out of Stock Products */}
      {outOfStockProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <X className="w-5 h-5 text-red-600" />
            Out of Stock Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {outOfStockProducts.map((product) => (
              <div key={product.id} className="p-3 lg:p-4 border border-red-200 bg-red-50 rounded-lg">
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-600 mt-1">Category: {product.category}</p>
                <p className="text-xs text-red-600 font-medium mt-2">Out of stock</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Dashboard;