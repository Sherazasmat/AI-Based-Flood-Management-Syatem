import React from 'react'
import { Phone, FileText, ArrowRight } from 'lucide-react'

const CriticalInfoSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Critical Information & Resources
          </h2>
          <p className="text-gray-500 text-sm">
            Essential contacts and resources for flood preparedness and response.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <div className="bg-white border-2 border-red-200 rounded-xl shadow-lg p-6">
            <Phone className="text-red-600 mb-4" size={32} />
            <h3 className="text-red-600 font-semibold text-lg mb-4">Emergency Contacts</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span className="flex-1">Emergency Services</span>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-xs font-medium">911</button>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span className="flex-1">Local Police</span>
                <Phone className="text-red-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span className="flex-1">Fire Department</span>
                <Phone className="text-red-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span className="flex-1">Medical Assistance</span>
                <Phone className="text-red-600" size={16} />
              </li>
            </ul>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              View All
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Critical Information */}
          <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-6">
            <FileText className="text-blue-600 mb-4" size={32} />
            <h3 className="text-blue-600 font-semibold text-lg mb-4">Critical Information</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">Flood Preparedness Guide</span>
                <FileText className="text-blue-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">Evacuation Routes Map</span>
                <FileText className="text-blue-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">First Aid Tips</span>
                <FileText className="text-blue-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">Shelter Information</span>
                <FileText className="text-blue-600" size={16} />
              </li>
            </ul>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
              View All
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CriticalInfoSection
