import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TinyLink</h1>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;