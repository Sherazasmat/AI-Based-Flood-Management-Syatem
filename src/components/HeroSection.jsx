import React from 'react'
import DashboardImg from '../assets/Heroimage.png'

const heroSection = () => {
  return (
   <section className="bg-[#0B4ED8] text-white px-6 md:px-20 py-10">
      
      {/* Warning Bar */}
      <div className="bg-orange-500 flex flex-wrap items-center justify-between px-10 py-4 rounded-md mb-6 text-sm">
        <div className="flex items-center gap-2">
          ⚠️
          <span className="font-semibold">Flood Warning Active</span>
          <span className="text-orange-100">
            Current Status: Moderate Risk | Last Updated: 2 minutes ago
          </span>
        </div>

        <div className="flex gap-3 mt-2 md:mt-0">
          <button className="bg-white text-orange-600 px-3 py-1 rounded-md text-xs font-semibold">
            View Details
          </button>
          <button className="bg-orange-600 text-white px-3 py-1 rounded-md text-xs font-semibold">
            Safety Tips
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <span className="text-xs bg-blue-700 px-3 py-1 rounded-full">
            AI-Powered Prediction System Active
          </span>

          <h1 className="text-5xl md:text-4xl font-bold mt-4 leading-tight">
  AI-Based Flood <br />
  <span className="text-cyan-300">Disaster</span> <br />
  <span className="text-cyan-300">Management</span> <br />
  & Alert System
</h1>

          <p className="text-blue-100 mt-4 text-sm max-w-lg">
            Real-time Flood Prediction, Intelligent Alerts & Coordinated Rescue
            Operations powered by Advanced Machine Learning
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-white text-blue-700 px-5 py-2 rounded-md text-sm font-semibold">
              View Active Alerts
            </button>
            <button className="bg-red-600 px-5 py-2 rounded-md text-sm font-semibold">
              Report Emergency
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-8 text-sm">
            <div>
              <p className="font-bold text-lg">24/7</p>
              <p className="text-blue-200">Monitoring</p>
            </div>
            <div>
              <p className="font-bold text-lg">98%</p>
              <p className="text-blue-200">Accuracy</p>
            </div>
            <div>
              <p className="font-bold text-lg">15min</p>
              <p className="text-blue-200">Alert Time</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src={DashboardImg}
            alt="Dashboard"
            className="w-full rounded-xl shadow-lg object-contain"
          />
        </div>

      </div>
    </section>
  )
}

export default heroSection;