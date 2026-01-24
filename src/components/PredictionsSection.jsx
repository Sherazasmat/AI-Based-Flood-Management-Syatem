import React from 'react'
import { Waves, BarChart3, ArrowRight } from 'lucide-react'

const PredictionsSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BarChart3 className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            FloodFlow Learning Predictions
          </h2>
          <p className="text-gray-500 text-sm">
            AI-powered predictions for future flood events and water levels.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flood Probability */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg p-8 text-white">
            <Waves className="mb-4" size={40} />
            <h3 className="text-5xl font-bold mb-2">98.3%</h3>
            <p className="text-purple-100 mb-6">Flood Probability</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-purple-500 transition">
              View Details
              <ArrowRight size={14} />
            </button>
            
            {/* Water Level Prediction Chart */}
            <div className="mt-8">
              <p className="text-sm text-purple-100 mb-4">Water Level Prediction</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm w-20">Low</span>
                  <div className="flex-1 relative bg-purple-400/30 rounded h-6 overflow-hidden">
                    <div className="bg-purple-400 h-full rounded flex items-center justify-end pr-2" style={{ width: '20%' }}>
                      <span className="text-xs text-white">20%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm w-20">Medium</span>
                  <div className="flex-1 relative bg-purple-300/30 rounded h-6 overflow-hidden">
                    <div className="bg-purple-300 h-full rounded flex items-center justify-end pr-2" style={{ width: '50%' }}>
                      <span className="text-xs text-white">50%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm w-20">High</span>
                  <div className="flex-1 relative bg-purple-200/30 rounded h-6 overflow-hidden">
                    <div className="bg-purple-200 h-full rounded flex items-center justify-end pr-2" style={{ width: '30%' }}>
                      <span className="text-xs text-white">30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prediction Details */}
          <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-6">
            <BarChart3 className="text-blue-600 mb-4" size={32} />
            <h3 className="text-blue-600 font-semibold text-lg mb-4">Prediction Details</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">Next 24 Hours: High Risk</span>
                <BarChart3 className="text-blue-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">Next 48 Hours: Medium Risk</span>
                <BarChart3 className="text-blue-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">Next 72 Hours: Low Risk</span>
                <BarChart3 className="text-blue-600" size={16} />
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="flex-1">Long-term Outlook: Stable</span>
                <BarChart3 className="text-blue-600" size={16} />
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

export default PredictionsSection
