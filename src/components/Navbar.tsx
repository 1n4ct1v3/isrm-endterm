import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, CreditCard, Shield } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="flex items-center py-4 px-2">
              <NavLink 
                to="/" 
                className="text-2xl font-bold text-indigo-600 hover:text-indigo-500"
              >
                Risk Management
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculator
            </NavLink>
            <NavLink
              to="/pci-dss"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <CreditCard className="w-5 h-5 mr-2" />
              PCI DSS
            </NavLink>
            <NavLink
              to="/gdpr"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Shield className="w-5 h-5 mr-2" />
              GDPR
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;