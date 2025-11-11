import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, ShoppingCart, BarChart3, UserRoundPen, Menu, X } from "lucide-react";
// import axios from "axios";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Naveen Kumar",
    initials: "NK",
    email: "naveen@supermart.com"
  });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Shop", path: "/shop", icon: ShoppingCart },
    { name: "Profile", path: "/profile", icon: UserRoundPen },
  ];

  // API Call to fetch user data - Uncomment and implement when backend is ready
  /*
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Example API call to get user profile
        const response = await axios.get('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const userData = response.data;
        setUserProfile({
          name: userData.fullName || userData.name,
          initials: getInitials(userData.fullName || userData.name),
          email: userData.email
        });
        
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        // Keep the default user profile data on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  */

  // Helper function to get initials from name - Uncomment when using API
  /*
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  */





  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-800">SuperMart</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                  pathname === path
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            ))}
            
            {/* User Profile - Desktop */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{userProfile.initials}</span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-800">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.email}</p>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* User Profile Icon - Mobile */}
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{userProfile.initials}</span>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-2">
              {navItems.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    pathname === path
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{name}</span>
                </Link>
              ))}
              
              {/* User Profile Info - Mobile */}
              <div className="px-4 py-3 border-t border-gray-200 mt-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{userProfile.initials}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{userProfile.name}</p>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Navbar;