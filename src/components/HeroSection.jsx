import React from "react";
import DashboardImg from "../assets/Heroimage.png";
import { TriangleAlert, Bell, HandHeart } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      {/* Alert Bar */}
      <div className="w-full bg-orange-500 shadow-md">
        <div className="px-6 md:px-20 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4 text-white">
              <TriangleAlert className="w-10 h-10 p-2 bg-orange-100/20 rounded-lg" />

              <div className="flex flex-col gap-1">
                <span className="font-bold text-xl">Flood Warning Active</span>
                <span className="text-orange-100 text-sm">
                  Current Status: Moderate Risk | Last Updated: 2 minutes ago
                </span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              <button className="bg-white text-orange-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:bg-orange-100">
                View Details
              </button>

              <button className="bg-white/10 text-white px-6 py-2 border border-amber-100 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:bg-white/20">
                Safety Tips
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-[#0B4ED8] text-white px-6 md:px-20 py-10">
        <div className="grid md:grid-cols-2 items-center gap-10">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center justify-center gap-2 bg-blue-100/20 px-6 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

              <span className="text-lg font-semibold text-white">
                AI-Powered Prediction System Active
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              AI-Based Flood <br />
              <span className="text-cyan-300">Disaster</span> <br />
              <span className="text-cyan-300">Management</span> <br />& Alert
              System
            </h1>

            <p className="text-blue-100 mt-10 text-2xl max-w-2xl">
              Real-time Flood Prediction, Intelligent Alerts & Coordinated
              Rescue Operations powered by Advanced Machine Learning
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="bg-white text-blue-700 px-10 py-4 rounded-xl text-2xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl">
                <Bell className="w-6 h-6 mr-2 inline fill-blue-700 stroke-blue-700" />
                View Active Alerts
              </button>

              <button className="bg-red-600 px-10 py-4 text-amber-100 rounded-xl text-2xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl">
                <HandHeart className="w-8 h-8 mr-2 inline stroke-amber-100" />
                Report Emergency
              </button>
            </div>

            {/* STATS */}
            <div className="flex mt-12 tracking-tight">
              <div className="border-r-2 border-amber-100/50 pr-8">
                <p className="font-bold text-3xl">24/7</p>
                <p className="text-blue-200 text-lg">Monitoring</p>
              </div>

              <div className="border-r-2 border-amber-100/40 px-8">
                <p className="font-bold text-3xl">98%</p>
                <p className="text-blue-200 text-lg">Accuracy</p>
              </div>

              <div className="px-8">
                <p className="font-bold text-3xl">15min</p>
                <p className="text-blue-200 text-lg">Alert Time</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src={DashboardImg}
              alt="Dashboard"
              className="w-full rounded-xl shadow-2xl object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
