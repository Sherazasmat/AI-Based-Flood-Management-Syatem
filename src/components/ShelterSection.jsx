import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faLocationArrow,
  faSearch,
  faMapPin,
  faHouseMedical,
  faUtensils,
  faBullseye,
  faFilter,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

const redPinIcon = L.divIcon({
  className: "custom-red-pin",
  html: `<svg width="30" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C15 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 9 17 12 21Z" fill="#ef4444" stroke="white" stroke-width="1.5"/>
      <circle cx="12" cy="9" r="3" fill="white"/>
    </svg>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -40],
});

// Mock database of shelter centers
const shelterData = [
  {
    id: 1,
    province: "Islamabad",
    name: "H-9 Relief Hub",
    location: "ICT, Islamabad",
    cap: 420,
    total: 500,
    hasFoodWater: true,
    hasMedical: true,
    status: "OPEN",
    pos: [33.6844, 73.0479],
  },
  {
    id: 2,
    province: "Punjab",
    name: "DG Khan Al-Khidmat Camp",
    location: "Dera Ghazi Khan",
    cap: 450,
    total: 600,
    hasFoodWater: true,
    hasMedical: true,
    status: "OPEN",
    pos: [30.0489, 70.6403],
  },
  {
    id: 3,
    province: "Sindh",
    name: "Sukkur IBA School",
    location: "Sukkur",
    cap: 980,
    total: 1000,
    hasFoodWater: true,
    hasMedical: false,
    status: "FULL",
    pos: [27.7244, 68.8228],
  },
  {
    id: 4,
    province: "KPK",
    name: "Nowshera Medical Base",
    location: "Nowshera",
    cap: 350,
    total: 400,
    hasFoodWater: false,
    hasMedical: true,
    status: "OPEN",
    pos: [34.015, 71.9747],
  },
];

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [userPos, setUserPos] = useState([33.6844, 73.0479]);
  const [mapCenter, setMapCenter] = useState([30.3753, 69.3451]);
  const [zoomLevel, setZoomLevel] = useState(5);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => console.log("Location Denied"),
      );
    }
  }, []);

  const filteredShelters = useMemo(() => {
    return shelterData
      .filter((s) => {
        const matchesSearch = s.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesProvince =
          selectedProvince === "All" || s.province === selectedProvince;
        return matchesSearch && matchesProvince;
      })
      .map((s) => ({
        ...s,
        distance: calculateDistance(userPos[0], userPos[1], s.pos[0], s.pos[1]),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [searchQuery, selectedProvince, userPos]);

  return (
    <div className="w-full bg-gray-50 p-4 md:p-10 lg:p-18 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full border border-green-200">
          <FontAwesomeIcon icon={faHouseMedical} className="text-green-600" />
          <span className="text-sm md:text-md font-bold text-green-700 uppercase tracking-wider">
            Live Tracker
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Emergency Shelters
        </h2>
        <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">
          Find real-time shelter capacity and medical support near your
          location.
        </p>
      </motion.div>

      {/* Control Bar - Highly Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white p-4 md:p-6 rounded-4xl md:rounded-[3rem] shadow-xl border border-slate-200 flex flex-col lg:flex-row gap-4"
      >
        <div className="relative flex-1 group">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors"
          />
          <input
            placeholder="Search by center or city..."
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl md:rounded-full bg-slate-50 border border-slate-100 focus:border-green-400 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faFilter}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <select
              className="w-full sm:w-48 pl-10 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl md:rounded-full font-bold text-slate-600 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="All">All Regions</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="KPK">KPK</option>
              <option value="Balochistan">Balochistan</option>
            </select>
          </div>

          <button
            onClick={() => {
              setMapCenter(userPos);
              setZoomLevel(13);
            }}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 md:py-4 rounded-2xl md:rounded-full shadow-lg shadow-green-200 transition-all active:scale-95 whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faBullseye} />
            <span className="hidden sm:inline">Focus My Area</span>
            <span className="sm:hidden">My Location</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 min-h-150 lg:h-187.5">
        {/* Map View - responsive height */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-3 md:p-6 shadow-2xl border border-slate-200 h-100 md:h-125 lg:h-full relative overflow-hidden"
        >
          <MapContainer
            center={mapCenter}
            zoom={zoomLevel}
            className="h-full w-full rounded-4xl md:rounded-[3rem] z-0"
          >
            <ChangeView center={mapCenter} zoom={zoomLevel} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filteredShelters.map((s) => (
              <Marker key={s.id} position={s.pos} icon={redPinIcon}>
                <Popup className="custom-popup">
                  <div className="p-1 font-sans">
                    <h4 className="font-bold text-slate-800">{s.name}</h4>
                    <p className="text-xs text-green-600 font-bold">
                      {s.distance} km away
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* Sidebar List - Scrollable */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-4 md:space-y-6 overflow-y-auto pr-2 custom-scrollbar max-h-150 lg:max-h-full"
        >
          <AnimatePresence>
            {filteredShelters.map((s) => {
              const occRate = Math.round((s.cap / s.total) * 100);
              const isFull = occRate > 85;

              return (
                <motion.div
                  key={s.id}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  layout
                  onClick={() => {
                    setMapCenter(s.pos);
                    setZoomLevel(15);
                  }}
                  className={`bg-white border-l-8 ${isFull ? "border-red-500" : "border-green-500"} p-5 md:p-6 rounded-4xl shadow-md hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-800 text-lg md:text-xl group-hover:text-green-600 transition-colors">
                      {s.name}
                    </h3>
                    <span
                      className={`text-[10px] md:text-xs font-black uppercase px-3 py-1 rounded-full ${isFull ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs md:text-sm">
                      <FontAwesomeIcon icon={faMapPin} />
                      <span>{s.distance} Km away</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-500 font-medium truncate">
                        {s.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {s.hasFoodWater && (
                        <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                          <FontAwesomeIcon
                            icon={faUtensils}
                            className="text-orange-500"
                          />{" "}
                          Food
                        </span>
                      )}
                      {s.hasMedical && (
                        <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                          <FontAwesomeIcon
                            icon={faChartLine}
                            className="text-red-500"
                          />{" "}
                          Medical
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-3 mb-4 flex justify-between items-center border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-xs md:text-sm">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-blue-500"
                      />
                      <span>
                        {s.cap} / {s.total} Beds
                      </span>
                    </div>
                    <span
                      className={`text-xs md:text-sm font-black ${isFull ? "text-red-600" : "text-green-600"}`}
                    >
                      {occRate}% Full
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://www.google.com/maps?q=${s.pos[0]},${s.pos[1]}`,
                      );
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg ${isFull ? "bg-red-500 shadow-red-200" : "bg-green-600 shadow-green-200"}`}
                  >
                    <FontAwesomeIcon icon={faLocationArrow} />
                    Get Directions
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MapSection;
