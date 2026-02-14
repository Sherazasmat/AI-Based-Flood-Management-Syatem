import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faHeart,
  faWallet,
  faPlusCircle,
  faShieldHalved,
  faWaveSquare,
  faCloudSun,
  faFire,
  faWind,
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
      bgColor: "bg-green-50",
      icon: faHandsHoldingCircle,
      partners: [
        {
          name: "Red Cross Society",
          task: "Emergency Response",
          icon: faHeart,
          iconColor: "text-green-500",
          iconBg: "bg-green-100",
        },
        {
          name: "Community Relief Fund",
          task: "Financial Aid",
          icon: faUsers,
          iconColor: "text-blue-500",
          iconBg: "bg-blue-100",
        },
        {
          name: "Health Aid International",
          task: "Medical Support",
          icon: faHandHoldingMedical,
          iconColor: "text-purple-500",
          iconBg: "bg-purple-100",
        },
      ],
    },
    {
      title: "Government Bodies",
      mainColor: "bg-blue-600",
      bgColor: "bg-blue-50",
      icon: faBuildingColumns,
      partners: [
        {
          name: "National Disaster Authority",
          task: "Coordination",
          icon: faShieldHalved,
          iconColor: "text-blue-500",
          iconBg: "bg-blue-100",
        },
        {
          name: "Water Resources Dept",
          task: "Infrastructure",
          icon: faWater,
          iconColor: "text-cyan-700",
          iconBg: "bg-cyan-100",
        },
        {
          name: "Meteorological Service",
          task: "Weather Monitoring",
          icon: faSatellite,
          iconColor: "text-indigo-500",
          iconBg: "bg-indigo-100",
        },
      ],
    },
    {
      title: "Emergency Services",
      mainColor: "bg-red-600",
      bgColor: "bg-orange-50",
      icon: faTruckMedical,
      partners: [
        {
          name: "Fire & Rescue Services",
          task: "Emergency Response",
          icon: faFireFlameCurved,
          iconColor: "text-red-500",
          iconBg: "bg-red-100",
        },
        {
          name: "Air Rescue Unit",
          task: "Aerial Support",
          icon: faHelicopter,
          iconColor: "text-orange-500",
          iconBg: "bg-orange-100",
        },
        {
          name: "Marine Rescue Team",
          task: "Water Rescue",
          icon: faShip,
          iconColor: "text-yellow-600",
          iconBg: "bg-yellow-100",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-6 font-sans">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full border border-green-100 mb-6">
          <FontAwesomeIcon
            icon={faHandshake}
            className="text-green-600"
            size="sm"
          />
          <span className="text-green-600 text-md font-bold tracking-wide">
            Collaborative Network
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Partner Organizations
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Working together with NGOs, government authorities, and emergency
          services for effective disaster management
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 p-15 gap-5 max-w-8xl mx-auto">
        {partnerSections.map((section, idx) => (
          <div
            key={idx}
            className={`${section.bgColor} rounded-[2.5rem] p-8 border border-opacity-50 border-slate-200 shadow-sm`}
          >
            {/* Column Header */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className={`${section.mainColor} w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-current/20`}
              >
                <FontAwesomeIcon
                  icon={section.icon}
                  className="text-white text-xl"
                />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {section.title}
              </h2>
            </div>

            {/* Partner List */}
            <div className="space-y-4">
              {section.partners.map((partner, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-white rounded-3xl p-5 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-50"
                >
                  <div
                    className={`${partner.iconBg} w-10 h-10 flex items-center justify-center rounded-2xl shrink-0`}
                  >
                    <FontAwesomeIcon
                      icon={partner.icon}
                      className={partner.iconColor}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-tight">
                      {partner.name}
                    </h4>
                    <p className="text-slate-400 text-sm font-semibold mt-1">
                      {partner.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
