import React, { useState } from "react";
import { User, Mail, Phone, Store, MapPin, CheckCircle,ChevronRight,ChevronLeft  } from "lucide-react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    shop_name: "",
    shop_address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (formData.full_name && formData.email && formData.phone) setStep(2);
    else alert("Please fill out all personal details.");
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (formData.shop_name && formData.shop_address) {
      setSubmitted(true);
      setTimeout(() => alert("✅ Registration successful!"), 400);
    } else {
      alert("Please fill out all shop details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex justify-center items-center p-1">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 transition-all duration-300 border-t-4 border-green-500">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
          <Store className="text-green-600" /> SuperMarket Registration
        </h2>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 relative">
          <div
            className={`absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 rounded-full`}
          ></div>
          <div
            className={`absolute top-1/2 left-0 h-[3px] bg-green-500 rounded-full transition-all duration-500 ${
              step === 1 ? "w-1/2" : "w-full"
            }`}
          ></div>
          <div
            className={`step-circle ${step >= 1 ? "bg-green-500" : "bg-gray-300"}`}
          >
            <User size={16} color="white" />
          </div>
          <div
            className={`step-circle ${step === 2 ? "bg-green-500" : "bg-gray-300"}`}
          >
            <Store size={16} color="white" />
          </div>
        </div>

        {/* Step 1 — Personal Info */}
        {step === 1 && !submitted && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="text-gray-600 font-medium flex items-center gap-2">
                <User size={16} className="text-green-600" /> Full Name
              </label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="input"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium flex items-center gap-2">
                <Mail size={16} className="text-green-600" /> Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="input"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium flex items-center gap-2">
                <Phone size={16} className="text-green-600" /> Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="input"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2 cursor-pointer"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Shop Details */}
        {step === 2 && !submitted && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="text-gray-600 font-medium flex items-center gap-2">
                <Store size={16} className="text-green-600" /> Shop Name
              </label>
              <input
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
                placeholder="Enter shop name"
                className="input"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium flex items-center gap-2">
                <MapPin size={16} className="text-green-600" /> Shop Address
              </label>
              <textarea
                name="shop_address"
                value={formData.shop_address}
                onChange={handleChange}
                placeholder="Enter shop address"
                className="input h-24 resize-none"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={handleBack}
                className="btn-secondary flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex items-center gap-2 cursor-pointer"
              >
                Register 
              </button>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {submitted && (
          <div className="text-center py-12 animate-fadeIn">
            <CheckCircle
              size={64}
              className="mx-auto text-green-500 mb-4 animate-bounce"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Registration Successful!
            </h3>
            <p className="text-gray-600 mt-2">
              Welcome, <span className="font-semibold">{formData.full_name}</span> 👋
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Your supermarket <span className="font-semibold">{formData.shop_name}</span> is now registered.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
