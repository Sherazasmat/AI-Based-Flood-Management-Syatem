import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChartBar,
  faClock,
  faHouseCircleCheck,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const StatisticsSection = () => {
  const [activeTab, setActiveTab] = useState("7 Days");

  const stats = [
    {
      id: 1,
      label: "Alerts Sent Today",
      value: "2,847",
      change: "+12%",
      isPositive: true,
      icon: <FontAwesomeIcon size="xl" icon={faBell} className="text-blue-600" />,
      iconBg: "bg-blue-100",
    },
    {
      id: 2,
      label: "People Rescued",
      value: "1,234",
      change: "+8%",
      isPositive: true,
      icon: <FontAwesomeIcon size="xl" icon={faUserShield} className="text-green-600" />,
      iconBg: "bg-green-100",
    },
    {
      id: 3,
      label: "Active Shelters",
      value: "47",
      subValue: "Stable",
      change: "+2%",
      isPositive: true,
      icon: <FontAwesomeIcon size="xl" icon={faHouseCircleCheck} className="text-purple-600" />,
      iconBg: "bg-purple-100",
    },
    {
      id: 4,
      label: "Avg. Response Time",
      value: "12m",
      change: "-3min",
      isPositive: false,
      icon: <FontAwesomeIcon size="xl" icon={faClock} className="text-orange-500" />,
      iconBg: "bg-orange-100",
    },
  ];

  const chartData = [
    { day: "Mon", height: "45%", color: "bg-blue-500" },
    { day: "Tue", height: "32%", color: "bg-orange-400" },
    { day: "Wed", height: "55%", color: "bg-blue-500" },
    { day: "Thu", height: "65%", color: "bg-blue-600" },
    { day: "Fri", height: "80%", color: "bg-orange-400" },
    { day: "Sat", height: "95%", color: "bg-red-500" },
    { day: "Sun", height: "70%", color: "bg-orange-400" },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 md:p-12 lg:p-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100/50 px-4 py-1.5 rounded-full border border-blue-200 mb-4">
            <FontAwesomeIcon icon={faChartBar} className="text-blue-600" />
            <span className="text-blue-700 text-xs md:text-sm font-bold uppercase tracking-widest">
              System Performance
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            Live System Statistics
          </h1>
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Real-time metrics and performance indicators of our flood management system across all operational sectors.
          </p>
        </motion.div>

        {/* Stats Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`${stat.iconBg} w-12 h-12 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black ${stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                    {stat.value}
                  </h2>
                  {stat.subValue && (
                    <span className="text-blue-500 font-bold text-xs uppercase tracking-tight">
                      {stat.subValue}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 font-bold text-sm md:text-base mt-2 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 {stat.icon}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-6 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                Alert Distribution
              </h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Activity reports for the current cycle</p>
            </div>

            {/* Responsive Tab Controls */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex w-full lg:w-auto overflow-x-auto">
              {["7 Days", "30 Days", "90 Days"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 lg:flex-none px-4 md:px-8 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="relative h-64 md:h-96 w-full flex items-end gap-2 md:gap-6 px-2 md:px-6">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-10">
              {[400, 300, 200, 100, 0].map((val) => (
                <div key={val} className="w-full flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-300 w-6 text-right">{val}</span>
                  <div className="flex-1 h-px bg-slate-50"></div>
                </div>
              ))}
            </div>

            {/* Actual Bars */}
            <div className="relative z-10 flex-1 h-full flex items-end justify-between gap-2 md:gap-6 ml-8 md:ml-12">
              {chartData.map((bar, index) => (
                <div key={index} className="relative flex-1 flex flex-col items-center group">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: bar.height }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "circOut" }}
                    className={`${bar.color} w-full rounded-t-xl md:rounded-t-2xl hover:brightness-110 transition-all cursor-pointer relative`}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl pointer-events-none z-20">
                      {bar.height}
                    </div>
                  </motion.div>
                  <span className="mt-4 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-tighter">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsSection;