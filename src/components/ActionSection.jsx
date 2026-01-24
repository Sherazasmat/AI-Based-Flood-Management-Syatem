import React from 'react'
import { CloudRain, AlertTriangle, Shield, ArrowRight } from "lucide-react";

const ActionSection = () => {
  return (
   <div className="bg-[#0B4ED8] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-white mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="text-white" size={20} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Take Action Now</h2>
          <p className="text-blue-100 text-sm">
            Immediate steps to ensure safety and minimize damage during a flood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flood Situation Status */}
          <div className="bg-blue-700 rounded-xl shadow-lg p-6 text-white">
            <CloudRain className="mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-3">Flood Situation Status</h3>
            <p className="text-blue-100 text-sm mb-4">
              Stay updated with real-time flood conditions and alerts in your area.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-500 transition">
              View Status
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Urgent and Critical Status */}
          <div className="bg-red-600 rounded-xl shadow-lg p-6 text-white">
            <AlertTriangle className="mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-3">Urgent and Critical Status</h3>
            <p className="text-red-100 text-sm mb-4">
              Access critical information and emergency contacts for immediate assistance.
            </p>
            <button className="bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-red-800 transition">
              Get Help Now
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Safe and Healthy Status */}
          <div className="bg-green-600 rounded-xl shadow-lg p-6 text-white">
            <Shield className="mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-3">Safe and Healthy Status</h3>
            <p className="text-green-100 text-sm mb-4">
              Find safe routes, open shelters, and health advisories to protect yourself.
            </p>
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-green-800 transition">
              Find Safety
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionSection;