import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Users, Navigation, Search, MapPin, Globe, MapPinHouse, Activity, Utensils, MapIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

/** * Calculate distance between two points in KM using Haversine formula
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
};

// Custom Marker configurations
const redPinIcon = L.divIcon({
  className: "custom-red-pin",
  html: `<svg width="30" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C15 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 9 17 12 21Z" fill="#ef4444" stroke="white" stroke-width="1.5"/>
      <circle cx="12" cy="9" r="3" fill="white"/>
    </svg>`,
  iconSize: [30, 42], iconAnchor: [15, 42], popupAnchor: [0, -40],
});

const futureIcon = L.divIcon({
  className: 'custom-div-icon',
  html: "<div style='background-color:#64748b; width:14px; height:14px; border-radius:50%; border:2px solid white;'></div>",
  iconSize: [14, 14], iconAnchor: [7, 7]
});

// Mock database of shelter centers
const shelterData = [
  { id: 1, province: 'Islamabad', name: 'H-9 Relief Hub', location: 'ICT, Islamabad', cap: 420, total: 500, hasFoodWater: true, hasMedical: true, status: 'OPEN', type: 'ACTIVE', pos: [33.6844, 73.0479] },
  { id: 2, province: 'Punjab', name: 'DG Khan Al-Khidmat Camp', location: 'Dera Ghazi Khan', cap: 450, total: 600, hasFoodWater: true, hasMedical: true, status: 'OPEN', type: 'ACTIVE', pos: [30.0489, 70.6403] },
  { id: 3, province: 'Sindh', name: 'Sukkur IBA Public School', location: 'Military Road, Sukkur', cap: 980, total: 1000, hasFoodWater: true, hasMedical: false, status: 'FULL', type: 'ACTIVE', pos: [27.7244, 68.8228] },
  { id: 4, province: 'KPK', name: 'Nowshera Medical Base', location: 'Kabul River Road', cap: 350, total: 400, hasFoodWater: false, hasMedical: true, status: 'OPEN', type: 'ACTIVE', pos: [34.0150, 71.9747] },
  { id: 5, province: 'Balochistan', name: 'Sibi Junction Shelter', location: 'Sibi District', cap: 120, total: 300, hasFoodWater: true, hasMedical: false, status: 'OPEN', type: 'ACTIVE', pos: [29.5448, 67.8789] },
  { id: 6, province: 'GB', name: 'Gilgit City DMA Center', location: 'River View Road', cap: 190, total: 200, hasFoodWater: true, hasMedical: true, status: 'OPEN', type: 'ACTIVE', pos: [35.9208, 74.3089] },
];

// Helper to update map view programmatically
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [userPos, setUserPos] = useState([33.6844, 73.0479]); 
  const [mapCenter, setMapCenter] = useState([30.3753, 69.3451]);
  const [zoomLevel, setZoomLevel] = useState(5);

  /** * Filter logic + Distance calculation + Nearest sorting
   */
  const filteredShelters = useMemo(() => {
    return shelterData.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProvince = selectedProvince === "All" || s.province === selectedProvince;
      return matchesSearch && matchesProvince;
    }).map(s => ({
      ...s,
      distance: calculateDistance(userPos[0], userPos[1], s.pos[0], s.pos[1])
    })).sort((a, b) => a.distance - b.distance);
  }, [searchQuery, selectedProvince, userPos]);

  return (
    <div className="w-full relative p-18 flex flex-col gap-6 font-sans bg-gray-200/30 mb-10">
      
      {/* Visual Header */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-green-200 px-5 py-2 rounded-full border border-green-100">
          <MapPinHouse size={20} className="text-green-600" />
          <span className="text-md font-semibold text-green-600">Live Shelter Track</span>
        </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Emergency Shelters Near You</h2>
        <p className="text-slate-500 text-lg">Real-time capacity and distance from your current location</p>
      </div>

      {/* Control Bar (Search & Filters) */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-5 rounded-[2.5rem] shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-slate-400">
        <div className="flex flex-1 gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              placeholder="Search center or city..."
              className="w-full pl-15 pr-4 py-3 rounded-[2.5rem] bg-slate-200 border-none focus:ring-2 focus:ring-green-500 outline-none text-md font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="bg-slate-200 border-none rounded-[2.5rem] px-4 py-3 text-sm font-bold text-slate-600" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
            <option value="All">All Pakistan</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">KPK</option>
            <option value="Balochistan">Balochistan</option>
          </select>
        </div>
        <button onClick={() => { setMapCenter(userPos); setZoomLevel(12); }} className="flex items-center gap-2 text-white font-bold text-sm bg-green-600 px-8 py-3 rounded-[2.5rem] hover:bg-green-700 shadow-lg">
          <MapPin size={18} /> Focus My Area
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-175">
        
        {/* Map View */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-slate-400 overflow-hidden relative">
          <MapContainer center={mapCenter} zoom={zoomLevel} className="h-full w-full rounded-[2.5rem]">
            <ChangeView center={mapCenter} zoom={zoomLevel} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filteredShelters.map(s => (
              <Marker key={s.id} position={s.pos} icon={s.type === 'FUTURE' ? futureIcon : redPinIcon}>
                <Popup><div className="p-2 font-sans"><h4 className="font-bold">{s.name}</h4><p className="text-[10px]">{s.distance} km away</p></div></Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Shelter Sidebar List */}
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {filteredShelters.map((s) => {
            // Determine alert state based on 80% occupancy threshold
            const occRate = Math.round((s.cap / s.total) * 100);
            const isCritical = occRate > 85; 
            
            return (
              <div 
                key={s.id} 
                className={`bg-white border-l-6 ${s.type === 'FUTURE' ? 'border-slate-400' : (isCritical ? 'border-red-600 shadow-slate-400' : 'border-green-500')} p-6 rounded-4xl hover:shadow-[0_10px_15px_rgba(0,0,0,0.2)] transition-all cursor-pointer`}
                onClick={() => { setMapCenter(s.pos); setZoomLevel(14); }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{s.name}</h3>
                  <span className={`text-xs font-bold ${isCritical ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-200'} px-3 py-1 rounded-full`}>
                    {s.status}
                  </span>
                </div>
                
                {/* Distance Indicator */}
                <div className="flex flex-col items-left text-slate-600 text-md mb-2 font-bold">
                <div className="flex items-left gap-1 text-slate-600 font-bold mb-4">
                  <MapPin size={18} className="text-blue-500 items-center" /> 
                  <span className="text-blue-600">{s.distance} Km away</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">{s.location}</span>
                </div>
                 {/* Facilities List (Conditional) */}
                <div className="flex flex-col gap-2">
                  {s.hasFoodWater && <div className="flex gap-3 items-left font-bold text-slate-600 bg-blue-50/50 rounded-lg w-fit"><Utensils size={18} className="text-orange-500" /> Food & water available</div>}
                  {s.hasMedical && <div className="flex items-left gap-3 font-bold text-slate-600 bg-red-50/50 rounded-lg w-fit"><Activity size={18} className="text-red-600" /> medical Support Available</div>}
                </div>
                </div>

                <div className="flex items-center justify-between text-md font-bold text-slate-700 mb-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-blue-600" />
                    <span>{s.cap}/{s.total} Beds</span>
                  </div>
                  <span className={isCritical ? 'text-red-600' : 'text-green-600'}>{occRate}% Full</span>
                </div>

                {/* External Navigation Link */}
                <button onClick={(e) => { e.stopPropagation(); window.open(`https://www.google.com/maps?q=${s.pos[0]},${s.pos[1]}`); }} className={`w-full ${isCritical ? 'bg-red-500' : 'bg-green-600'} text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg`}>
                  <Navigation size={18} /> Get Directions
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapSection;