import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faHeart,
  faShieldHalved,
  faShip,
  faHandsHoldingCircle,
  faBuildingColumns,
  faTruckMedical,
  faUsers,
  faHandHoldingMedical,
  faWater,
  faSatellite,
  faFireFlameCurved,
  faHelicopter,
} from "@fortawesome/free-solid-svg-icons";

const PartnersSection = () => {
  const partnerSections = [
    {
      title: "NGO Partners",
      mainColor: "bg-green-500",
      shadowColor: "shadow-green-200",
      bgColor: "bg-green-50/50",
      icon: faHandsHoldingCircle,
      partners: [
        { name: "Red Cross Society", task: "Emergency Response", icon: faHeart, iconColor: "text-green-500", iconBg: "bg-green-100" },
        { name: "Community Relief Fund", task: "Financial Aid", icon: faUsers, iconColor: "text-blue-500", iconBg: "bg-blue-100" },
        { name: "Health Aid International", task: "Medical Support", icon: faHandHoldingMedical, iconColor: "text-purple-500", iconBg: "bg-purple-100" },
      ],
    },
    {
      title: "Government Bodies",
      mainColor: "bg-blue-600",
      shadowColor: "shadow-blue-200",
      bgColor: "bg-blue-50/50",
      icon: faBuildingColumns,
      partners: [
        { name: "National Disaster Authority", task: "Coordination", icon: faShieldHalved, iconColor: "text-blue-500", iconBg: "bg-blue-100" },
        { name: "Water Resources Dept", task: "Infrastructure", icon: faWater, iconColor: "text-cyan-700", iconBg: "bg-cyan-100" },
        { name: "Meteorological Service", task: "Weather Monitoring", icon: faSatellite, iconColor: "text-indigo-500", iconBg: "bg-indigo-100" },
      ],
    },
    {
      title: "Emergency Services",
      mainColor: "bg-red-600",
      shadowColor: "shadow-red-200",
      bgColor: "bg-orange-50/50",
      icon: faTruckMedical,
      partners: [
        { name: "Fire & Rescue Services", task: "Emergency Response", icon: faFireFlameCurved, iconColor: "text-red-500", iconBg: "bg-red-100" },
        { name: "Air Rescue Unit", task: "Aerial Support", icon: faHelicopter, iconColor: "text-orange-500", iconBg: "bg-orange-100" },
        { name: "Marine Rescue Team", task: "Water Rescue", icon: faShip, iconColor: "text-yellow-600", iconBg: "bg-yellow-100" },
      ],
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full border border-green-100 mb-6 shadow-sm">
          <FontAwesomeIcon icon={faHandshake} className="text-green-600" size="sm" />
          <span className="text-green-600 text-xs md:text-sm font-bold uppercase tracking-widest">
            Collaborative Network
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Partner Organizations
        </h1>
        <p className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          Working together with NGOs, government authorities, and emergency
          services for effective disaster management.
        </p>
      </motion.div>

      {/* Responsive Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {partnerSections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={columnVariants}
            className={`${section.bgColor} rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col h-full`}
          >
            {/* Column Header */}
            <div className="flex items-center gap-5 mb-10">
              <div className={`${section.mainColor} w-14 h-14 flex items-center justify-center rounded-2xl shadow-xl ${section.shadowColor}`}>
                <FontAwesomeIcon icon={section.icon} className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {section.title}
              </h2>
            </div>

            {/* Partner List */}
            <div className="space-y-5 grow">
              {section.partners.map((partner, pIdx) => (
                <motion.div
                  key={pIdx}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-4xl p-5 flex items-center gap-5 shadow-sm border border-slate-50 group cursor-pointer transition-all hover:shadow-xl hover:border-slate-200"
                >
                  <div className={`${partner.iconBg} w-12 h-12 flex items-center justify-center rounded-2xl shrink-0 group-hover:rotate-12 transition-transform`}>
                    <FontAwesomeIcon icon={partner.icon} className={`${partner.iconColor} text-lg`} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-slate-900 text-lg leading-tight truncate">
                      {partner.name}
                    </h4>
                    <p className="text-slate-400 text-sm font-semibold mt-1 uppercase tracking-wide">
                      {partner.task}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Partner Network Diagram Suggestion */}
      <div className="mt-20 opacity-40">
        
      </div>
    </div>
  );
};

export default PartnersSection;