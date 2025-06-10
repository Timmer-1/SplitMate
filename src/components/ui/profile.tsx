'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Settings, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Shield
} from 'lucide-react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: Settings,
      label: 'Settings',
      description: 'Preferences & privacy',
      action: () => router.push('/settings'),
      href: '/settings',
    },
    {
      icon: CreditCard,
      label: 'Billing',
      description: 'Plans & payments',
      action: () => router.push('/billing'),
      href: '/billing',
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Alerts & updates',
      badge: '3',
      action: () => router.push('/notifications'),
      href: '/notifications',
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get assistance',
      action: () => router.push('/help'),
      href: '/help',
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Small Profile Picture Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 rounded-full hover:bg-slate-100/70 transition-all duration-200 group"
        aria-label="Open profile menu"
      >
        {/* Small Profile Picture */}
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-emerald-500 transition-all duration-200"
        />
        {/* Small Online Status Indicator */}
        <div className="absolute -bottom-0 -right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-xl shadow-slate-900/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Alex Chen</h3>
                <p className="text-sm text-slate-500">alex@example.com</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-xs text-emerald-600 font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 hover:bg-slate-50 transition-colors duration-150 group"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg mr-3 group-hover:bg-emerald-100 transition-colors">
                  <item.icon className="w-4 h-4 text-slate-600 group-hover:text-emerald-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {item.label}
                    </p>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-slate-100 p-2">
            <button
              onClick={() => {
                console.log('Logout clicked');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 hover:bg-red-50 transition-colors duration-150 group rounded-lg"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg mr-3 group-hover:bg-red-200 transition-colors">
                <LogOut className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-red-600">Sign Out</p>
                <p className="text-sm text-red-400">Log out of your account</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;