import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Bell, 
  Map, 
  BarChart3, 
  Shield, 
  Users, 
  Settings, 
  Search,
  Waves,
  MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Bell, label: 'Flood Alerts', path: '/flood-alerts' },
    { icon: Map, label: 'Live Map', path: '/live-map' },
    { icon: MessageSquare, label: 'Live Chat', path: '/live-chat' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Shield, label: 'Safety Guide', path: '/safety-guide' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <Waves className="text-blue-400" size={28} />
          <h1 className="text-lg font-bold">FloodGuard AI</h1>
        </div>
        <p className="text-xs text-gray-400">Disaster Management System</p>
      </div>

      {/* Notifications */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Notifications</span>
          <Bell className="text-gray-400" size={18} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800 text-white text-sm pl-10 pr-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-gray-800 text-yellow-400 border-l-4 border-yellow-400'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            JA
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">John Anderson</p>
            <p className="text-xs text-gray-400">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
