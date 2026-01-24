import React from 'react'
import { MapPin, ArrowRight } from 'lucide-react'

const ShelterSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Emergency Shelter Locations
          </h2>
          <p className="text-gray-500 text-sm">
            Find the nearest safe shelters and their current occupancy status.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">Map Visualization</p>
              <p className="text-gray-400 text-sm mt-2">Shelter locations displayed on map</p>
            </div>
          </div>

          {/* Shelter Details */}
          <div className="space-y-4">
            {/* Shelter 1 */}
            <div className="bg-white border-2 border-green-200 rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-green-600 mt-1" size={24} />
                <div className="flex-1">
                  <h3 className="text-green-600 font-semibold mb-2">Shelter Name: Community Hall</h3>
                  <p className="text-gray-600 text-sm mb-1">Address: 123 Main St, City</p>
                  <p className="text-gray-600 text-sm mb-1">Capacity: 200</p>
                  <p className="text-gray-600 text-sm mb-1">Occupancy: 150</p>
                  <p className="text-green-600 font-medium text-sm">Available: 50</p>
                </div>
              </div>
              <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
                Get Directions
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Shelter 2 */}
            <div className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-orange-600 mt-1" size={24} />
                <div className="flex-1">
                  <h3 className="text-orange-600 font-semibold mb-2">Shelter Name: School Gym</h3>
                  <p className="text-gray-600 text-sm mb-1">Address: 456 Oak Ave, City</p>
                  <p className="text-gray-600 text-sm mb-1">Capacity: 180</p>
                  <p className="text-gray-600 text-sm mb-1">Occupancy: 160</p>
                  <p className="text-orange-600 font-medium text-sm">Available: 20</p>
                </div>
              </div>
              <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800">
                Get Directions
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShelterSection
