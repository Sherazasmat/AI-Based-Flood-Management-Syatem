import React from 'react';
import { Bell, HeartHandshake, Home, ArrowRight, AlertTriangle, MapPin } from 'lucide-react';

const ActionSection = () => {
  return (
    <div className="w-full min-h-screen bg-blue-600 p-5 md:p-20 flex items-center justify-center">
      {/* Outer Dotted Container */}
      <div className="w-full max-w-8xl relative">
        
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Take Action Now
          </h2>
          <p className="text-blue-100 text-lg">
            Quick access to essential services and emergency response tools
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: View Active Alerts */}
          <div className="bg-white rounded-4xl p-10 shadow-xl flex flex-col">
            <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
              <Bell className="text-white" size={28} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-4">View Active Alerts</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 grow">
              Access real-time flood alerts, warnings, and safety notifications for your area with detailed severity information.
            </p>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all group">
              View All Alerts <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">Active Alerts</span>
              <span className="text-rose-600 font-bold text-sm">3 Critical</span>
            </div>
          </div>

          {/* Card 2: Report as Flood Victim */}
          <div className="bg-white rounded-4xl p-10 shadow-xl flex flex-col h-full">
            <div className="bg-rose-500 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl mb-8 shadow-lg shadow-rose-100">
              <HeartHandshake className="text-white" size={28} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Report as Flood Victim</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 grow">
              Submit an emergency report if you are affected by flooding. Our rescue teams will respond immediately to your location.
            </p>

            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all">
              Report Emergency <AlertTriangle size={20} />
            </button>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">Response Time</span>
              <span className="text-emerald-500 font-bold text-sm">~15 minutes</span>
            </div>
          </div>

          {/* Card 3: Find Nearby Shelters */}
          <div className="bg-white rounded-4xl p-8 shadow-xl flex flex-col h-full">
            <div className="bg-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-100">
              <Home className="text-white" size={28} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Find Nearby Shelters</h3>
            <p className="text-slate-500 text-lg 
            leading-relaxed mb-8 grow">
              Locate the nearest emergency shelters with available capacity, facilities, and real-time occupancy information.
            </p>

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all">
              Find Shelters <MapPin size={20} />
            </button>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">Nearby Shelters</span>
              <span className="text-blue-600 font-bold text-sm">12 Available</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActionSection;