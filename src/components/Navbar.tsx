import React, { useState } from 'react';
import { Search, LogOut, Bell, User } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onSearch: (query: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <nav className="shadow-lg border-b-2" style={{ backgroundColor: '#073b4c', borderBottomColor: '#052d3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center gap-4">
            {/* OpenReach Logo */}
            <div 
              className="w-12 h-8 sm:w-16 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm p-1"
              style={{ backgroundColor: '#ffffff' }}
            >
              <img 
                src="/openreach-logo.jpeg" 
                alt="OpenReach Logo" 
                className="w-full h-full object-contain rounded"
              />
            </div>
            
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="hidden sm:inline">Order Dashboard</span>
              <span className="sm:hidden">Orders</span>
            </h1>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4 md:mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 border-2 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 transition-all duration-200 font-normal text-sm sm:text-base"
                  style={{ 
                    borderColor: '#0a4d5c',
                    fontFamily: 'Arial, sans-serif'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0a4d5c';
                    e.target.style.boxShadow = '0 0 0 3px rgba(7, 59, 76, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#0a4d5c';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative transition-all duration-200 h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/10"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#FF6B35' }}></span>
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-200 h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/10"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Logout */}
            <Button
              onClick={onLogout}
              variant="ghost"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium text-white hover:bg-white/10"
              style={{ 
                fontFamily: 'Arial, sans-serif'
              }}
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block text-xs sm:text-sm">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 