import React from 'react'
import { Users, Radio, Bell, AlertTriangle, BarChart3 } from 'lucide-react'

const StatisticsSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BarChart3 className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Live System Statistics
          </h2>
          <p className="text-gray-500 text-sm">
            Real-time data on system performance and flood incidents.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl text-center">
            <Users className="mx-auto mb-3" size={32} />
            <h3 className="text-3xl font-bold mb-2">12,000</h3>
            <p className="text-sm text-blue-100">Total Users</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white p-6 rounded-xl text-center">
            <Radio className="mx-auto mb-3" size={32} />
            <h3 className="text-3xl font-bold mb-2">1,500</h3>
            <p className="text-sm text-cyan-100">Active Sensors</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl text-center">
            <Bell className="mx-auto mb-3" size={32} />
            <h3 className="text-3xl font-bold mb-2">450</h3>
            <p className="text-sm text-orange-100">Alerts Sent</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl text-center">
            <AlertTriangle className="mx-auto mb-3" size={32} />
            <h3 className="text-3xl font-bold mb-2">150</h3>
            <p className="text-sm text-red-100">Flood Incidents</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Flood Incidents Over Time</h3>
            <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Year</option>
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
          
          {/* Simple Bar Chart Representation */}
          <div className="flex items-end justify-between gap-2 h-64">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-blue-500 rounded-t mb-2" style={{ height: '60%' }}></div>
              <span className="text-xs text-gray-600">Jan</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-yellow-500 rounded-t mb-2" style={{ height: '40%' }}></div>
              <span className="text-xs text-gray-600">Feb</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-orange-500 rounded-t mb-2" style={{ height: '70%' }}></div>
              <span className="text-xs text-gray-600">Mar</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-red-500 rounded-t mb-2" style={{ height: '90%' }}></div>
              <span className="text-xs text-gray-600">Apr</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-blue-500 rounded-t mb-2" style={{ height: '50%' }}></div>
              <span className="text-xs text-gray-600">May</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-yellow-500 rounded-t mb-2" style={{ height: '30%' }}></div>
              <span className="text-xs text-gray-600">Jun</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
