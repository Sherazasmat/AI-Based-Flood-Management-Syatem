import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardImg from "../assets/Heroimage.png";
import { TriangleAlert, Bell, HandHeart, Menu, X } from "lucide-react";

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full font-sans">
      {/* PROFESSIONAL NAVBAR (Added as per prompt) */}
      <motion.nav >

        {/* Mobile Toggle */}
        <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-[#0B4ED8] border-b border-blue-400/30 flex flex-col p-6 gap-4 md:hidden"
            >
              <a href="#" className="text-white border-b border-white/10 pb-2">Dashboard</a>
              <a href="#" className="text-white border-b border-white/10 pb-2">Alerts</a>
              <a href="#" className="text-white">Rescue Team</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Alert Bar */}
      <div className="w-full bg-orange-500 shadow-md">
        <div className="px-6 md:px-20 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-white text-center md:text-left">
              <TriangleAlert className="w-10 h-10 p-2 bg-orange-100/20 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg md:text-xl leading-tight">Flood Warning Active</span>
                <span className="text-orange-100 text-xs md:text-sm">
                  Current Status: Moderate Risk | Last Updated: 2 minutes ago
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-white text-orange-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:opacity-90">
                View Details
              </button>
              <button className="flex-1 md:flex-none bg-white/10 text-white px-6 py-2 border border-amber-100 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:bg-white/20">
                Safety Tips
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-[#0B4ED8] text-white px-6 md:px-20 py-10 md:py-20">
        <div className="grid md:grid-cols-2 items-center gap-10">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center gap-2 bg-blue-100/20 px-4 md:px-6 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm md:text-lg font-semibold text-white">
                AI-Powered Prediction System Active
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mt-6 leading-tight">
              AI-Based Flood <br />
              <span className="text-cyan-300">Disaster</span> <br />
              <span className="text-cyan-300">Management</span> <br />& Alert
              System
            </h1>

            <p className="text-blue-100 mt-6 md:mt-10 text-lg md:text-2xl max-w-2xl">
              Real-time Flood Prediction, Intelligent Alerts & Coordinated
              Rescue Operations powered by Advanced Machine Learning
            </p>

            {/* BUTTONS (Responsive Stack) */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="bg-white text-blue-700 px-6 md:px-10 py-3 md:py-4 rounded-xl text-lg md:text-2xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center">
                <Bell className="w-5 h-5 md:w-6 md:h-6 mr-2 fill-blue-700 stroke-blue-700" />
                View Active Alerts
              </button>

              <button className="bg-red-600 px-6 md:px-10 py-3 md:py-4 text-amber-100 rounded-xl text-lg md:text-2xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center">
                <HandHeart className="w-6 h-6 md:w-8 md:h-8 mr-2 stroke-amber-100" />
                Report Emergency
              </button>
            </div>

            {/* STATS (Responsive Grid) */}
            <div className="grid grid-cols-3 mt-12 tracking-tight">
              <div className="border-r-2 border-amber-100/50 pr-4 md:pr-8">
                <p className="font-bold text-xl md:text-3xl">24/7</p>
                <p className="text-blue-200 text-sm md:text-lg">Monitoring</p>
              </div>

              <div className="border-r-2 border-amber-100/40 px-4 md:px-8 text-center">
                <p className="font-bold text-xl md:text-3xl">98%</p>
                <p className="text-blue-200 text-sm md:text-lg">Accuracy</p>
              </div>

              <div className="pl-4 md:pl-8 text-right md:text-left">
                <p className="font-bold text-xl md:text-3xl">15min</p>
                <p className="text-blue-200 text-sm md:text-lg">Alert Time</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={DashboardImg}
              alt="Dashboard"
              className="w-full rounded-xl shadow-2xl object-contain hover:rotate-1 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;