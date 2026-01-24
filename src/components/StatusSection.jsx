import React from "react";
import { AlertTriangle, MapPin, Shield, ArrowRight } from "lucide-react";

const StatusSection = () => {
  return (
    <div className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Current Flood Risk Status
          </h2>
          <p className="text-gray-500 text-sm">
            Get an overview of the current flood risk levels and affected areas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Risk Status */}
          <div className="bg-white border-2 border-yellow-200 rounded-xl shadow-lg p-6">
            <AlertTriangle className="text-yellow-600 mb-4" size={32} />
            <h2 className="text-3xl font-bold text-yellow-600 mb-2">WARNING</h2>
            <p className="text-yellow-600 font-medium mb-4">Risk Level: High</p>
            <p className="text-gray-500 text-sm mb-4">Last Updated: 10:30 AM</p>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              View Details
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Affected Areas */}
          <div className="bg-white border-2 border-red-200 rounded-xl shadow-lg p-6">
            <MapPin className="text-red-600 mb-4" size={32} />
            <h3 className="text-red-600 font-semibold mb-4">Affected Areas</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Riverdale Valley</span>
                <span className="ml-auto text-red-600 font-medium">12</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Willow Creek</span>
                <span className="ml-auto text-red-600 font-medium">8</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Greenwood</span>
                <span className="ml-auto text-red-600 font-medium">5</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Oakwood</span>
                <span className="ml-auto text-red-600 font-medium">3</span>
              </li>
            </ul>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              View All
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Evacuation Status */}
          <div className="bg-white border-2 border-green-200 rounded-xl shadow-lg p-6">
            <Shield className="text-green-600 mb-4" size={32} />
            <h3 className="text-green-600 font-semibold mb-4">Evacuation Status</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Evacuation in Progress</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Shelters Open</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Safe Routes</span>
              </li>
            </ul>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              View Details
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSection;
