import React from 'react';
import { motion } from 'framer-motion';
// FontAwesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTriangleExclamation,
  faShieldHalved,
  faClock,
  faMapLocationDot
} from '@fortawesome/free-solid-svg-icons';

const StatusSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 } // Har column ke darmiyan 0.2s ka gap
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] mb-15 font-sans flex flex-col items-center">
      {/* RESTORED: Original p-16 padding */}
      <div className="w-full p-16 relative">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">
            <FontAwesomeIcon icon={faShieldHalved} className="text-orange-500" />
            <span className="text-md font-bold text-orange-600 tracking-widest">AI Risk Assessment</span>
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Current Flood Risk Status
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Machine learning algorithms analyzing multiple data sources in real-time.
          </p>
        </motion.div>

        {/* 3-Column Grid: Staggered Animation Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full"
        >

          {/* Column 1: Risk Level Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }} // Subtle lift on hover
            className="bg-white border border-amber-200 rounded-[2.5rem] p-10 shadow-md relative transition-all hover:shadow-xl"
          >
            <div className="flex justify-between gap-4 items-start mb-8">
              <h3 className="font-bold text-slate-800 items-center text-2xl">Risk Level</h3>
              <div className="p-2 bg-orange-200/50 justify-center rounded-lg text-orange-600">
                <FontAwesomeIcon icon={faTriangleExclamation} size="xl" />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-5xl font-black text-orange-400 tracking-tighter mb-2">WARNING</h2>
              <p className="text-gray-600 text-lg font-semibold">Moderate to High Risk Detected</p>
            </div>

            <div className="space-y-7 pt-6 border-t border-amber-200/50">
              <div className="flex justify-between items-center text-md font-semibold tracking-wider">
                <span className="text-slate-600">Confidence Level</span>
                <span className="text-slate-800 font-bold text-lg">87%</span>
              </div>
              <div className="flex justify-between items-center text-md font-semibold tracking-wider">
                <span className="text-slate-600">Alert Priority</span>
                <span className="text-orange-400 font-bold text-lg">High</span>
              </div>
              <div className="flex justify-between items-center text-md font-semibold tracking-wider">
                <span className="text-slate-600">Last Assessment</span>
                <span className="text-slate-800 font-bold text-lg">2 min ago</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Affected Areas Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-md transition-all hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-bold text-slate-800 text-2xl">Affected Areas</h3>
              <div className="p-2 bg-rose-100 rounded-lg text-rose-500">
                <FontAwesomeIcon icon={faMapLocationDot} size="xl" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-rose-100/70 rounded-2xl border border-rose-100/50">
                <div className="flex items-center gap-3 text-lg font-bold">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                  <span className=" text-slate-800">Riverside District</span>
                </div>
                <span className="font-bold text-rose-600 ">Critical</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-100/70 rounded-2xl border border-orange-100/50 font-bold text-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                  <span className=" text-slate-800">Downtown Valley</span>
                </div>
                <span className=" text-orange-600">Warning</span>
              </div>
              <div className="flex items-center justify-between p-4 text-lg font-bold bg-amber-100/70 rounded-2xl border border-amber-200/50">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                  <span className="text-slate-800">East Suburbs</span>
                </div>
                <span className=" text-amber-600">Watch</span>
              </div>
              <div className="flex items-center justify-between p-4 text-lg font-bold bg-emerald-100/70 rounded-2xl border border-emerald-100/50">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="text-slate-800">North Hills</span>
                </div>
                <span className="text-emerald-600">Safe</span>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Prediction Timeline Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-md transition-all hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-bold text-slate-800 text-2xl">Prediction Timeline</h3>
              <div className="p-2 bg-blue-100 rounded-lg text-blue-800">
                <FontAwesomeIcon icon={faClock} size="xl" />
              </div>
            </div>

            <div className="relative pl-6 space-y-8">
              <div className="absolute left-1.75 top-2 bottom-2 w-px bg-slate-100"></div>
              {/* Timeline Steps */}
              <div className="relative">
                <div className="absolute -left-5.75 top-2 w-4 h-4 rounded-full bg-white border-4 border-blue-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Now</h4>
                  <p className="text-sm text-slate-600 mt-0.5">Water level rising steadily</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-5.75 top-2 w-4 h-4 rounded-full bg-white border-4 border-rose-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">+6 Hours</h4>
                  <p className="text-sm text-slate-600 mt-0.5">Peak water level expected</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-5.75 top-2 w-4 h-4 rounded-full bg-white border-4 border-amber-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">+12 Hours</h4>
                  <p className="text-sm text-slate-600 mt-0.5">Gradual water recession</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-5.75 top-2 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 z-10"></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">+24 Hours</h4>
                  <p className="text-sm text-slate-600 mt-0.5">Safe conditions restored</p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default StatusSection;