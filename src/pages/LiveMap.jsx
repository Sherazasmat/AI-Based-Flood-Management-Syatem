import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/logo.png';
import {
  faHome,
  faShieldHeart,
  faHospital,
  faCircleCheck,
  faSliders,
  faMagnifyingGlass,
  faLocationCrosshairs,
  faHospitalUser,
  faPersonShelter,
  faRoute,
  faPhoneVolume
} from '@fortawesome/free-solid-svg-icons';

const LiveMap = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoc, setSelectedLoc] = useState(null);

  const locations = [
    { id: 1, name: 'Central Edhi Shelter', city: 'Karachi', coords: '24.9545,67.0822', type: 'shelter', status: 'Available', capacity: '120/350', percent: 35, address: 'Sohrab Goth', distance: '0.8 mi' },
    { id: 2, name: 'Mayo Medical Center', city: 'Lahore', coords: '31.5204,74.3587', type: 'medical', status: 'Full', capacity: 'Full Service', percent: 100, address: 'Anarkali', distance: '1.2 mi' },
    { id: 3, name: 'PIMS Community Shelter', city: 'Islamabad', coords: '33.6844,73.0479', type: 'shelter', status: 'Limited', capacity: '180/240', percent: 75, address: 'G-8/3', distance: '1.5 mi' },
    { id: 4, name: 'Lady Reading Hospital', city: 'Peshawar', coords: '34.0097,71.5583', type: 'medical', status: 'Full', capacity: 'Full', percent: 100, address: 'Peshawar City', distance: '3.1 mi' },
    { id: 5, name: 'Quetta Relief Camp', city: 'Quetta', coords: '30.1798,66.9750', type: 'shelter', status: 'Available', capacity: '40/200', percent: 20, address: 'Airport Road', distance: '4.5 mi' },
    { id: 6, name: 'Nishtar Medical Hub', city: 'Multan', coords: '30.1968,71.4474', type: 'medical', status: 'Open', capacity: 'High', percent: 65, address: 'Nishtar Road', distance: '2.8 mi' },
    { id: 7, name: 'Sukkur IBA Shelter', city: 'Sukkur', coords: '27.7244,68.8228', type: 'shelter', status: 'Available', capacity: '90/400', percent: 22, address: 'Military Road', distance: '5.2 mi' },
    { id: 8, name: 'Gwadar Emergency Point', city: 'Gwadar', coords: '25.1216,62.3253', type: 'medical', status: 'Limited', capacity: '30/100', percent: 30, address: 'Marine Drive', distance: '6.7 mi' },
    { id: 9, name: 'Satellite Town Point', city: 'Rawalpindi', coords: '33.6358,73.0714', type: 'shelter', status: 'Full', capacity: '300/300', percent: 100, address: 'Block B', distance: '2.4 mi' }
  ];

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Shelters') return matchesSearch && loc.type === 'shelter';
    if (activeFilter === 'Medical') return matchesSearch && loc.type === 'medical';
    if (activeFilter === 'Available') return matchesSearch && loc.percent < 100;

    return matchesSearch;
  });

  const getMapUrl = () => {
    if (selectedLoc) {
      return `https://maps.google.com/maps?q=${selectedLoc.coords}&z=15&output=embed`;
    }

    // Sab points ko '|' se join karke map URL mein pass kiya hai
    const allPoints = filteredLocations.map(l => `${l.name}, ${l.city}`).join('|');

    // Zoom Level 5 poore Pakistan ko front page par fit karta hai
    const zoomLevel = 5;

    if (filteredLocations.length === 0) {
      return `https://maps.google.com/maps?q=Pakistan&z=5&output=embed`;
    }

    return `https://maps.google.com/maps?q=${encodeURIComponent(allPoints)}&z=${zoomLevel}&t=m&output=embed`;
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden font-inter text-left">

      {/* HEADER */}
      <header className="flex-none border-b border-gray-100 p-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={Logo} alt="logo" className="object-contain" />
          </div>
          <div>
            <h1 className="text-[#2563EB] text-xl font-black leading-tight">FloodGuard AI</h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Disaster Management System</p>
          </div>
        </div>

        <div className="flex-1 max-w-5xl px-10 relative hidden md:block">
          <input
            type="text"
            placeholder="Search city, shelter or hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border-gray-200/70 border-2 shadow-lg rounded-full text-md focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-14 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <button onClick={() => { setSelectedLoc(null); setActiveFilter('All'); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
          <FontAwesomeIcon icon={faLocationCrosshairs} className="text-lg" />
        </button>
      </header>

      {/* TABS SECTION */}
      <div className="flex-none p-4 px-6 flex items-center gap-3 bg-white border-gray-200/70 border-3 shadow-lg overflow-x-auto no-scrollbar">
        <Tab
          active={activeFilter === 'All'}
          onClick={() => { setActiveFilter('All'); setSelectedLoc(null); }}
          icon={faHome}
          label="All Locations"
        />
        <Tab
          active={activeFilter === 'Shelters'}
          onClick={() => { setActiveFilter('Shelters'); setSelectedLoc(null); }}
          icon={faShieldHeart}
          label="Shelters"
          iconColor="text-[#EA580C]"
        />
        <Tab
          active={activeFilter === 'Medical'}
          onClick={() => { setActiveFilter('Medical'); setSelectedLoc(null); }}
          icon={faHospital}
          label="Medical Centers"
          iconColor="text-[#DC2626]"
        />
        <Tab
          active={activeFilter === 'Available'}
          onClick={() => { setActiveFilter('Available'); setSelectedLoc(null); }}
          icon={faCircleCheck}
          label="Available Only"
          iconColor="text-green-500"
        />

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all">
          <FontAwesomeIcon icon={faSliders} className="text-gray-500" />
          More Filters
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-full lg:w-105 flex flex-col border-r border-gray-100 bg-white overflow-y-auto no-scrollbar">
          <div className="px-6 py-2 border-b border-gray-200/70  shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Nearby Locations</h2>
            <p className="text-sm text-gray-500 mt-0.5 font-medium">
              Showing {filteredLocations.length} points on map
            </p>
          </div>

          <div className="flex flex-col ">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setSelectedLoc(loc)}
                className={`p-6 border-b border-gray-200 shadow-lg cursor-pointer transition-all ${selectedLoc?.id === loc.id ? 'bg-blue-50/40 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-3 ">
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${loc.type === 'medical' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                      <FontAwesomeIcon icon={loc.type === 'medical' ? faHospitalUser : faPersonShelter} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 leading-snug">{loc.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{loc.address}, {loc.city}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-blue-600">{loc.distance}</p>
                </div>

                <div className="mt-4 mb-4">
                  <div className="flex justify-between items-center mb-1.5 px-0.5">
                    <p className="text-[11px] text-gray-500">Occupancy: {loc.capacity}</p>
                    <p className={`text-[11px] font-bold ${loc.percent === 100 ? 'text-red-600' : 'text-green-600'}`}>
                      {loc.percent === 100 ? 'Full' : 'Available'}
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${loc.percent > 85 ? 'bg-red-500' : 'bg-blue-600'}`}
                      style={{ width: `${loc.percent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[#2563EB] text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                    <FontAwesomeIcon icon={faRoute} /> Directions
                  </button>
                  <button className="w-10 border border-gray-200 rounded-lg text-gray-600 flex items-center justify-center hover:bg-gray-50">
                    <FontAwesomeIcon icon={faPhoneVolume} className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DYNAMIC MAP */}
        <div className="flex-1 relative bg-slate-50">
          <iframe
            key={`${activeFilter}-${selectedLoc?.id || 'all'}-${filteredLocations.length}`}
            title="Relief Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={getMapUrl()}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const Tab = ({ active, onClick, icon, label, iconColor = "text-blue-600" }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${active
        ? 'bg-[#2563EB] text-white shadow-md ring-2 ring-blue-100 scale-[1.02]'
        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
      }`}
  >
    <FontAwesomeIcon icon={icon} className={`${active ? 'text-white' : iconColor}`} />
    {label}
  </button>
);

export default LiveMap;