import React, { useState } from "react";
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
      icon: (
        <FontAwesomeIcon
          size="xl"
          icon={faBell}
          className="text-blue-600 fill-blue-600"
        />
      ),
      iconBg: "bg-blue-100",
    },
    {
      id: 2,
      label: "People Rescued",
      value: "1,234",
      change: "+8%",
      isPositive: true,
      icon: (
        <FontAwesomeIcon
          size="xl"
          icon={faUserShield}
          className="text-green-600"
        />
      ),
      iconBg: "bg-green-100",
    },
    {
      id: 3,
      label: "Active Shelters",
      value: "47",
      subValue: "Stable",
      change: "+8%",
      isPositive: true,
      icon: (
        <FontAwesomeIcon
          size="xl"
          icon={faHouseCircleCheck}
          className="text-purple-600"
        />
      ),
      iconBg: "bg-purple-100",
    },
    {
      id: 4,
      label: "Avg. Response Time",
      value: "12m",
      change: "-3min",
      isPositive: false,
      icon: (
        <FontAwesomeIcon
          size="xl"
          icon={faClock}
          className="text-orange-500 font-bold"
        />
      ),
      iconBg: "bg-orange-100",
    },
  ];

  // Chart data matching the image colors and heights
  const chartData = [
    { day: "Mon", height: "15%", color: "bg-blue-500" },
    { day: "Tue", height: "12%", color: "bg-orange-400" },
    { day: "Tue", height: "25%", color: "bg-blue-500" },
    { day: "Wed", height: "35%", color: "bg-blue-500" },
    { day: "Thu", height: "55%", color: "bg-orange-400" },
    { day: "Fri", height: "70%", color: "bg-orange-400" },
    { day: "Sat", height: "82%", color: "bg-red-500" },
    { day: "Sat", height: "95%", color: "bg-red-600" },
    { day: "Sun", height: "55%", color: "bg-orange-400" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 md:p-20 font-sans">
      <div className="max-w-9xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1 rounded-full border border-blue-100 mb-4">
            <FontAwesomeIcon
              size="xl"
              icon={faChartBar}
              className="text-blue-600 font-bold"
            />
            <span className="text-blue-600 text-md font-bold tracking-wider">
              System Performance
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Live System Statistics
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Real-time metrics and performance indicators of our flood management
            system
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-7 rounded-4xl border border-slate-300 flex flex-col justify-between relative shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.iconBg} px-3 py-4 rounded-xl`}>
                  {stat.icon}
                </div>
                <span
                  className={`text-lg font-bold ${stat.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-4xl font-black text-slate-900">
                    {stat.value}
                  </h2>
                  {stat.subValue && (
                    <span className="text-blue-500 font-bold text-sm">
                      {stat.subValue}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 font-semibold text-md mt-3">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              Alert Distribution (Last 7 Days)
            </h3>

            {/* Tab Controls */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
              {["7 Days", "30 Days", "90 Days"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="relative h-80 w-full flex items-end gap-4 px-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {[500, 400, 300, 200, 100, 0].map((val) => (
                <div key={val} className="w-full flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 w-8 text-right">
                    {val}
                  </span>
                  <div className="flex-1 h-px bg-slate-100"></div>
                </div>
              ))}
            </div>

            {/* Actual Bars  */}
            <div className="relative z-10 flex-1 h-full flex items-end justify-between gap-4 ml-12">
              {chartData.map((bar, index) => (
                <div
                  key={index}
                  className="relative flex-1 flex flex-col items-center group"
                >
                  <div
                    className={`${bar.color} w-full rounded-md transition-all duration-700 hover:brightness-110 cursor-pointer shadow-sm`}
                    style={{ height: bar.height }}
                  >
                    {/* Optional: Tooltip on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {bar.height}
                    </div>
                  </div>
                  <span className="absolute -bottom-8 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
