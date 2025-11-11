import React, { useState } from "react";
import { 
  Edit3, 
  LogOut, 
  Store, 
  CreditCard, 
  User, 
  MapPin, 
  QrCode, 
  Building, 
  Phone, 
  Mail, 
  Globe,
  Clock,
  Truck,
  Shield,
  Star,
  Camera,
  Upload,
  Save,
  X
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [qrPreview, setQrPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    // Store Basic Information
    shop_name: "FreshMart Superstore",
    shop_type: "Supermarket",
    tagline: "Your Daily Needs, Delivered Fresh",
    established_year: "2018",
    
    // Contact Information
    shop_address: "123, Market Road, Madanapalle, Andhra Pradesh - 517325",
    phone_number: "+91 9876543210",
    email: "info@freshmart.com",
    website: "www.freshmart.com",
    
    // Business Hours
    opening_time: "07:00",
    closing_time: "22:00",
    working_days: "Monday to Sunday",
    
    // Store Features
    delivery_available: true,
    home_delivery: true,
    parking_available: true,
    accepts_online_orders: true,
    
    // Payment Information
    bank_account_name: "FreshMart Superstore",
    bank_account_number: "12345678901234",
    bank_name: "State Bank of India",
    ifsc_code: "SBIN0001234",
    upi_id: "freshmart@oksbi",
    
    // Business Registration Details
    gst_number: "29ABCDE1234F1Z5",
    tin_number: "12345678901",
    pan_number: "ABCDE1234F",
    cin_number: "U74999MH2021PTC123456",
    
    // Discount Information
    discount_offers: "10% off on first order | 5% cashback above ₹1000",
    
    // Additional Payment Methods
    accepted_payment_methods: ["Cash", "UPI", "Credit Card", "Debit Card", "Net Banking"],
    
    // Store Categories
    product_categories: ["Groceries", "Fresh Produce", "Dairy", "Beverages", "Snacks", "Household"],
    
    // Social Media
    facebook: "freshmart_superstore",
    instagram: "@freshmart_official",
    google_business_rating: "",
    
    // Store Capacity
    store_area: "2500",
    employees_count: "15",
    
    // Files
    qr_code: null,
    profile_photo: "https://www.sigmaonline.in/wp-content/themes/estore/images/placeholder-shop.jpg",
    store_photos: []
  });

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({ 
      ...profile, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleArrayChange = (field, value, checked) => {
    if (checked) {
      setProfile({
        ...profile,
        [field]: [...profile[field], value]
      });
    } else {
      setProfile({
        ...profile,
        [field]: profile[field].filter(item => item !== value)
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (e.target.name === "qr_code") setQrPreview(fileURL);
      if (e.target.name === "profile_photo") setPhotoPreview(fileURL);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Store profile updated successfully!");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("🚪 Logged out successfully!");
    }
    navigate('/login');
  };

  const paymentMethods = ["Cash", "UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet", "EMI"];
  const productCategories = [
    "Groceries", "Fresh Produce", "Dairy", "Beverages", 
    "Snacks", "Household", "Personal Care", "Frozen Foods",
    "Bakery", "Meat & Poultry", "Organic", "Baby Care"
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Store Profile</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your supermarket store information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden mb-6">
          {/* Profile Header with Background */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-6 lg:p-8 text-white relative">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              <div className="relative">
                <img
                  src={photoPreview || profile.profile_photo}
                  alt="Store"
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl sm:rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute -bottom-2 -right-2 bg-white text-blue-600 rounded-full p-1 sm:p-2 shadow-lg hover:bg-gray-100 transition"
                >
                  <Camera size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-2">
                  <Building size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">{profile.shop_name}</h2>
                </div>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-2">{profile.tagline}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm">
                  <span className="flex items-center gap-1 bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                    <Clock size={12} className="sm:w-3 sm:h-3" />
                    Since {profile.established_year}
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                    <Store size={12} className="sm:w-3 sm:h-3" />
                    {profile.store_area} sq.ft
                  </span>
                </div>
              </div>

              {/* Edit Button - Top Right */}
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm"
              >
                <Edit3 size={16} /> Edit
              </button>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Phone  size={18} className="sm:w-5 sm:h-5 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MapPin size={14} className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{profile.shop_address}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{profile.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Mail size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Globe size={14} className="text-gray-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{profile.website}</span>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Clock  size={18} className="sm:w-5 sm:h-5 text-green-600" />
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Opening Time:</span>
                      <span className="font-medium">{profile.opening_time} AM</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Closing Time:</span>
                      <span className="font-medium">{profile.closing_time} PM</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Working Days:</span>
                      <span className="font-medium">{profile.working_days}</span>
                    </div>
                  </div>
                </div>

                {/* Discounts & Offers */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Star  size={18} className="sm:w-5 sm:h-5 text-yellow-600" />
                    Discounts & Offers
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm sm:text-base text-yellow-800">{profile.discount_offers}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Payment Information */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <CreditCard  size={18} className="sm:w-5 sm:h-5 text-purple-600" />
                    Payment Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">Bank Name</span>
                      <p className="font-medium text-sm sm:text-base">{profile.bank_name}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">Account Holder</span>
                      <p className="font-medium text-sm sm:text-base">{profile.bank_account_name}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">Account Number</span>
                      <p className="font-medium text-sm sm:text-base">{profile.bank_account_number}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">IFSC Code</span>
                      <p className="font-medium text-sm sm:text-base">{profile.ifsc_code}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">UPI ID</span>
                      <p className="font-medium text-sm sm:text-base">{profile.upi_id}</p>
                    </div>
                  </div>
                </div>

                {/* Business Registration */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Building  size={18} className="sm:w-5 sm:h-5 text-green-600" />
                    Business Registration
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">GST Number</span>
                      <p className="font-medium text-sm sm:text-base">{profile.gst_number}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">PAN Number</span>
                      <p className="font-medium text-sm sm:text-base">{profile.pan_number}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">TIN Number</span>
                      <p className="font-medium text-sm sm:text-base">{profile.tin_number}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">CIN Number</span>
                      <p className="font-medium text-sm sm:text-base">{profile.cin_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="mt-4 sm:mt-6 bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <QrCode  size={18} className="sm:w-5 sm:h-5 text-blue-600" />
                Payment QR Code
              </h3>
              {qrPreview || profile.qr_code ? (
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg'
                    alt="QR Code"
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-2 border-gray-300 rounded-lg"
                  />
                  <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                    <p>Scan this QR code to make payments</p>
                    <p className="text-xs mt-1">UPI ID: {profile.upi_id}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <QrCode size={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">No QR code uploaded</p>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm mt-2"
                  >
                    Upload QR Code
                  </button>
                </div>
              )}
            </div>

            {/* Logout Button - Bottom Center */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-medium text-sm sm:text-base"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Edit3  size={18} className="sm:w-5 sm:h-5 text-blue-600" /> 
                Edit Store Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Form Sections */}
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Store Basic Information */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Store size={16} className="sm:w-4 sm:h-4" />
                  Store Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <input className="input text-sm sm:text-base" name="shop_name" placeholder="Shop Name" value={profile.shop_name} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="shop_type" placeholder="Shop Type" value={profile.shop_type} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="tagline" placeholder="Tagline" value={profile.tagline} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="established_year" placeholder="Established Year" value={profile.established_year} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base md:col-span-2" name="shop_address" placeholder="Full Address" value={profile.shop_address} onChange={handleEditChange} />
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Phone size={16} className="sm:w-4 sm:h-4" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <input className="input text-sm sm:text-base" name="phone_number" placeholder="Phone Number" value={profile.phone_number} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="email" placeholder="Email" value={profile.email} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="website" placeholder="Website" value={profile.website} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="store_area" placeholder="Store Area (sq.ft)" value={profile.store_area} onChange={handleEditChange} />
                </div>
              </section>

              {/* Business Registration */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Building size={16} className="sm:w-4 sm:h-4" />
                  Business Registration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <input className="input text-sm sm:text-base" name="gst_number" placeholder="GST Number" value={profile.gst_number} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="pan_number" placeholder="PAN Number" value={profile.pan_number} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="tin_number" placeholder="TIN Number" value={profile.tin_number} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="cin_number" placeholder="CIN Number" value={profile.cin_number} onChange={handleEditChange} />
                </div>
              </section>

              {/* Discounts & Offers */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Star size={16} className="sm:w-4 sm:h-4" />
                  Discounts & Offers
                </h4>
                <textarea 
                  className="input text-sm sm:text-base md:col-span-2" 
                  name="discount_offers" 
                  placeholder="Enter discount offers and promotions (separate with | )" 
                  value={profile.discount_offers} 
                  onChange={handleEditChange}
                  rows="3"
                />
              </section>

              {/* Business Hours */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Clock size={16} className="sm:w-4 sm:h-4" />
                  Business Hours
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  <input type="time" className="input text-sm sm:text-base" name="opening_time" value={profile.opening_time} onChange={handleEditChange} />
                  <input type="time" className="input text-sm sm:text-base" name="closing_time" value={profile.closing_time} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="working_days" placeholder="Working Days" value={profile.working_days} onChange={handleEditChange} />
                </div>
              </section>

              {/* Payment Information */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <CreditCard size={16} className="sm:w-4 sm:h-4" />
                  Payment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <input className="input text-sm sm:text-base" name="bank_name" placeholder="Bank Name" value={profile.bank_name} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="bank_account_name" placeholder="Account Holder Name" value={profile.bank_account_name} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="bank_account_number" placeholder="Account Number" value={profile.bank_account_number} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="ifsc_code" placeholder="IFSC Code" value={profile.ifsc_code} onChange={handleEditChange} />
                  <input className="input text-sm sm:text-base" name="upi_id" placeholder="UPI ID" value={profile.upi_id} onChange={handleEditChange} />
                </div>
                
                {/* Accepted Payment Methods */}
                <div className="mt-3 sm:mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accepted Payment Methods</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {paymentMethods.map(method => (
                      <label key={method} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs sm:text-sm">
                        <input
                          type="checkbox"
                          checked={profile.accepted_payment_methods.includes(method)}
                          onChange={(e) => handleArrayChange('accepted_payment_methods', method, e.target.checked)}
                          className="rounded"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Store Features */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Shield size={16} className="sm:w-4 sm:h-4" />
                  Store Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 text-sm sm:text-base">
                    <input type="checkbox" name="home_delivery" checked={profile.home_delivery} onChange={handleEditChange} className="rounded" />
                    <span>Home Delivery Available</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm sm:text-base">
                    <input type="checkbox" name="parking_available" checked={profile.parking_available} onChange={handleEditChange} className="rounded" />
                    <span>Parking Available</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm sm:text-base">
                    <input type="checkbox" name="accepts_online_orders" checked={profile.accepts_online_orders} onChange={handleEditChange} className="rounded" />
                    <span>Accepts Online Orders</span>
                  </label>
                  <input className="input text-sm sm:text-base" name="employees_count" placeholder="Number of Employees" value={profile.employees_count} onChange={handleEditChange} />
                </div>
              </section>

              {/* File Uploads */}
              <section>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Upload size={16} className="sm:w-4 sm:h-4" />
                  Upload Files
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo/Photo</label>
                    <input type="file" name="profile_photo" onChange={handleFileChange} className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment QR Code</label>
                    <input type="file" name="qr_code" onChange={handleFileChange} className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t p-4 sm:p-6 flex justify-end gap-2 sm:gap-3">
              <button onClick={() => setIsEditing(false)} className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition text-sm sm:text-base">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition text-sm sm:text-base">
                <Save size={16} className="sm:w-4 sm:h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}