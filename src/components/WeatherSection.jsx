import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // FIX: Alias hata kar standard 'motion' rakha hai
import {
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  CloudRain,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const WeatherSection = () => {
  const [weather, setWeather] = useState({
    rainfall: "45.2",
    humidity: "78",
    temp: "28",
    feelsLike: "31",
    windSpeed: "12",
    direction: "NE",
    loading: true,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY`,
        );
        const data = await response.json();

        if (response.ok) {
          setWeather({
            rainfall: data.rain ? data.rain["1h"] || "0.0" : "0.0",
            humidity: data.main.humidity,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            windSpeed: data.wind.speed,
            direction: "NE",
            loading: false,
          });
        }
      } catch (error) {
        console.error("Weather fetch failed:", error);
      }
    };

    fetchWeather();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const cardData = [
    { title: "Rainfall (Last 24h)", value: `${weather.rainfall}`, unit: "mm", status: "Heavy", icon: <CloudRain size={28} />, gradient: "from-blue-600 to-blue-500", label: "Status" },
    { title: "Humidity Level", value: `${weather.humidity}`, unit: "%", status: "High", icon: <Droplets size={28} />, gradient: "from-cyan-500 to-cyan-400", label: "Condition" },
    { title: "Temperature", value: `${weather.temp}`, unit: "°C", status: `${weather.feelsLike}°C`, icon: <Thermometer size={28} />, gradient: "from-orange-500 to-orange-400", label: "Feels Like" },
    { title: "Wind Speed", value: `${weather.windSpeed}`, unit: "km/h", status: `${weather.direction}`, icon: <Wind size={28} />, gradient: "from-emerald-500 to-emerald-400", label: "Direction" },
  ];

  return (
    <section className="bg-white px-4 sm:px-6 md:px-20 py-16 overflow-hidden">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex text-blue-600 font-semibold text-sm md:text-lg items-center justify-center gap-2 mb-2 bg-blue-100 px-6 py-1.5 rounded-full border border-blue-100">
          <CloudSun className="text-blue-600" size={20} /> Live Weather Data
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">
          Real-Time Weather Monitoring
        </h2>
        <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto">
          Powered by OpenWeatherMap API with continuous updates every 5 minutes
        </p>
      </motion.div>

      {/* Weather Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className={`relative overflow-hidden bg-linear-to-br ${card.gradient} rounded-4xl p-8 shadow-lg transition-all hover:shadow-2xl cursor-default`}
          >
            <div className="flex justify-between items-start mb-10">
              <motion.div whileHover={{ rotate: 15 }} className="bg-white/20 p-3 rounded-2xl backdrop-blur-md text-white">
                {card.icon}
              </motion.div>
              <div className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest italic">Live</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter flex items-baseline">
                {card.value}
                <span className="text-xl font-medium ml-1 opacity-90">{card.unit}</span>
              </h2>
              <p className="text-sm font-semibold text-white/70 mt-1 uppercase tracking-tight">{card.title}</p>
            </div>

            <div className="flex justify-between items-center border-t border-white/20 pt-4">
              <span className="text-sm font-bold text-gray-200 tracking-widest">{card.label}</span>
              <span className="text-sm font-semibold text-white uppercase tracking-wider">{card.status}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Forecast Trend Bar */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-blue-50/50 border border-blue-100 rounded-4xl mt-8 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
      >
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">Weather Forecast Trend</h3>
            <p className="text-slate-500 text-sm">Next 48 hours prediction based on AI analysis</p>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full md:w-auto bg-blue-600 text-white font-bold py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 text-sm cursor-pointer"
        >
          View Detailed Forecast <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default WeatherSection;