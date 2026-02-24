import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Bell, Map, BarChart3, Shield, 
  Users, Settings, Waves, MessageSquare, Menu, X 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      {/* 1. Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-110 bg-gray-900 p-2 rounded-md border border-gray-700">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-100 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* 2. SIDEBAR CONTAINER (Design Locked & Horizontal Scroll Removed) */}
      <aside className={`
        fixed lg:sticky lg:top-0 left-0 z-105 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        w-64 min-w-[256px] bg-gray-900 text-white h-screen flex flex-col 
        border-r border-gray-800 overflow-x-hidden
      `}>
        
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-800 flex-none">
          <div className="flex items-center gap-2 mb-1">
            <Waves className="text-blue-400" size={20} />
            <h1 className="text-lg font-bold tracking-tight">FloodGuard AI</h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Disaster Management System</p>
        </div>

        {/* Notifications Bar */}
        <div className="px-4 py-3 border-b border-gray-800 flex-none">
          <div className="flex items-center justify-between opacity-70">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Notifications</span>
            <Bell size={16} className="text-gray-400" />
          </div>
        </div>

        {/* 3. MENU ITEMS (Original Nav Design) */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 no-scrollbar overflow-x-hidden">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
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

        {/* 4. USER PROFILE (Fixed at Bottom as requested) */}
        <div className="p-4 bg-gray-800/30 border-t border-gray-800 flex-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              JA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">John Anderson</p>
              <p className="text-[11px] text-gray-400 truncate opacity-80">john@example.com</p>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        {/* <div className="p-3 border-t border-gray-800 flex-none bg-gray-900">
           <p className="text-[10px] text-center text-gray-600 font-medium tracking-tight">© 2026 FloodGuard AI v2.0</p>
        </div> */}
      </aside>

      {/* CSS to ensure no horizontal scroll and hide vertical scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        
        /* Prevent any global horizontal scrolling */
        body, html {
          overflow-x: hidden !important;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Sidebar;