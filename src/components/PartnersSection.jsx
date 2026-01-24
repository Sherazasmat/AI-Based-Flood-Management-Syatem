import React from 'react'
import { Building2, Handshake, Siren } from 'lucide-react'

const PartnersSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Handshake className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Partner Organizations
          </h2>
          <p className="text-gray-500 text-sm">
            Collaborating with leading organizations for effective disaster management.
          </p>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Government */}
          <div className="bg-white border-2 border-green-200 rounded-xl shadow-lg p-6">
            <Building2 className="text-green-600 mb-4" size={32} />
            <h3 className="text-green-600 font-semibold text-lg mb-4">Government</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>FEMA</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>Red Cross</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>UNICEF</span>
              </li>
            </ul>
          </div>

          {/* NGOs */}
          <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-6">
            <Handshake className="text-blue-600 mb-4" size={32} />
            <h3 className="text-blue-600 font-semibold text-lg mb-4">NGOs</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Doctors Without Borders</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Oxfam</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Save the Children</span>
              </li>
            </ul>
          </div>

          {/* Emergency Services */}
          <div className="bg-white border-2 border-red-200 rounded-xl shadow-lg p-6">
            <Siren className="text-red-600 mb-4" size={32} />
            <h3 className="text-red-600 font-semibold text-lg mb-4">Emergency Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Local Police</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Fire Department</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span>Ambulance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
