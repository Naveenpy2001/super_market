import React, { useState } from "react";
import { Package, Plus, Search, Edit2, Trash2, AlertCircle, TrendingDown, ShoppingCart, BarChart3, X, Minus, DollarSign, Archive, CreditCard, Smartphone, QrCode, CheckCircle, XCircle, Clock } from 'lucide-react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import PaymentSection from "../components/PaymentSection";

// Main CustomerShop Component
const CustomerShop = () => {
  const [currentView, setCurrentView] = useState('shop');
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Fresh Milk', 
      category: 'Dairy', 
      quantity: 45, 
      price: 3.99, 
      minStock: 20, 
      supplier: 'Dairy Farm Co', 
      lastUpdated: '2025-10-30', 
      sold: 155,
      expiryDate: '2025-11-15'
    },
    { 
      id: 2, 
      name: 'Whole Wheat Bread', 
      category: 'Bakery', 
      quantity: 12, 
      price: 2.49, 
      minStock: 15, 
      supplier: 'Local Bakery', 
      lastUpdated: '2025-10-31', 
      sold: 89,
      expiryDate: '2025-11-05'
    },
    { 
      id: 3, 
      name: 'Organic Apples', 
      category: 'Produce', 
      quantity: 8, 
      price: 4.99, 
      minStock: 25, 
      supplier: 'Fresh Farms', 
      lastUpdated: '2025-10-29', 
      sold: 203,
      expiryDate: '2025-11-20'
    },
    { 
      id: 4, 
      name: 'Ground Beef', 
      category: 'Meat', 
      quantity: 30, 
      price: 7.99, 
      minStock: 10, 
      supplier: 'Premium Meats', 
      lastUpdated: '2025-10-31', 
      sold: 67,
      expiryDate: '2025-11-10'
    },
    { 
      id: 5, 
      name: 'Orange Juice', 
      category: 'Beverages', 
      quantity: 55, 
      price: 5.49, 
      minStock: 20, 
      supplier: 'Citrus Co', 
      lastUpdated: '2025-10-30', 
      sold: 134,
      expiryDate: '2025-12-01'
    },
    { 
      id: 6, 
      name: 'Cheddar Cheese', 
      category: 'Dairy', 
      quantity: 25, 
      price: 6.99, 
      minStock: 15, 
      supplier: 'Dairy Farm Co', 
      lastUpdated: '2025-10-30', 
      sold: 78,
      expiryDate: '2025-11-25'
    },
    { 
      id: 7, 
      name: 'Chocolate Chip Cookies', 
      category: 'Snacks', 
      quantity: 40, 
      price: 3.49, 
      minStock: 20, 
      supplier: 'Sweet Treats', 
      lastUpdated: '2025-10-31', 
      sold: 112,
      expiryDate: '2025-12-15'
    },
    { 
      id: 8, 
      name: 'Frozen Pizza', 
      category: 'Frozen', 
      quantity: 18, 
      price: 8.99, 
      minStock: 10, 
      supplier: 'Quick Meals Inc', 
      lastUpdated: '2025-10-30', 
      sold: 95,
      expiryDate: '2025-11-30'
    },
  ]);

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    { id: 1, date: '2025-10-30', total: 45.67, items: 5, customer: 'John Doe' },
    { id: 2, date: '2025-10-30', total: 78.90, items: 8, customer: 'Jane Smith' },
    { id: 3, date: '2025-10-31', total: 32.45, items: 4, customer: 'Bob Wilson' },
    { id: 4, date: '2025-10-31', total: 156.78, items: 12, customer: 'Alice Brown' },
  ]);

  const [shopSearch, setShopSearch] = useState('');
  const [shopCategory, setShopCategory] = useState('All');

  const categories = ['All', 'Dairy', 'Bakery', 'Produce', 'Meat', 'Beverages', 'Frozen', 'Snacks', 'Household'];

  const calculateDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (expiryDate) => {
    const days = calculateDaysUntilExpiry(expiryDate);
    if (days < 0) return { label: 'Expired', color: 'text-red-600 bg-red-50', days };
    if (days <= 7) return { label: 'Expiring Soon', color: 'text-orange-600 bg-orange-50', days };
    return { label: 'Fresh', color: 'text-green-600 bg-green-50', days };
  };

  const availableProducts = products.filter(p => p.quantity > 0);
  const filteredShopProducts = availableProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(shopSearch.toLowerCase());
    const matchesCategory = shopCategory === 'All' || product.category === shopCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.quantity) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      const product = products.find(p => p.id === productId);
      if (newQuantity <= product.quantity) {
        setCart(cart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
      }
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = cartTotal * 0.1;
  const finalTotal = cartTotal + taxAmount;

  const handleCheckout = () => {
    setCurrentView('payment');
  };

  const handlePaymentSuccess = () => {
    // Update products inventory after successful payment
    setProducts(products.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      if (cartItem) {
        return { ...p, quantity: p.quantity - cartItem.quantity, sold: p.sold + cartItem.quantity };
      }
      return p;
    }));

    // Add new order
    const newOrder = {
      id: orders.length + 1,
      date: new Date().toISOString().split('T')[0],
      total: finalTotal,
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      customer: 'Customer ' + (orders.length + 1)
    };
    
    setOrders([...orders, newOrder]);
    setCart([]);
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  if (currentView === 'payment') {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <PaymentSection
            cart={cart}
            cartTotal={cartTotal}
            taxAmount={taxAmount}
            finalTotal={finalTotal}
            onBackToShop={handleBackToShop}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Shop Products</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={shopSearch}
                    onChange={(e) => setShopSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={shopCategory}
                  onChange={(e) => setShopCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredShopProducts.map(product => {
                const expiryStatus = getExpiryStatus(product.expiryDate);
                return (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          {product.quantity} in stock
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${expiryStatus.color}`}>
                          {expiryStatus.label} {expiryStatus.days > 0 && `(${expiryStatus.days} days)`}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Expires: {product.expiryDate}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">₹{product.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Shopping Cart ({cart.length})
              </h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">₹{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax (10%)</span>
                      <span>₹{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                      <span>Total</span>
                      <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium mt-4"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerShop;