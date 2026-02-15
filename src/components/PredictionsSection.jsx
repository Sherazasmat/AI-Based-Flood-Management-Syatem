import React from 'react';
import { motion } from 'framer-motion';
// FontAwesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDatabase, 
  faSatellite, 
  faWater, 
  faCloudRain, 
  faClockRotateLeft,
  faBrain,
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';

const PredictionsSection = () => {
  // Column Animations
  const leftColumnVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "circOut" } }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "circOut", delay: 0.2 } }
  };

  const dataSources = [
    {
      title: 'Weather Satellites',
      desc: 'Real-time atmospheric data',
      status: 'Active',
      icon: faSatellite,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      statusColor: 'text-green-600'
    },
    {
      title: 'River Sensors',
      desc: 'Water level monitoring',
      status: 'Active',
      icon: faWater,
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-100',
      statusColor: 'text-green-600'
    },
    {
      title: 'Rain Gauges',
      desc: 'Precipitation measurement',
      status: 'Active',
      icon: faCloudRain,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      statusColor: 'text-green-600'
    },
    {
      title: 'Historical Data',
      desc: '10 years of records',
      status: 'Archive',
      icon: faClockRotateLeft,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      statusColor: 'text-blue-600'
    }
  ];

  return (
    <div className="w-full relative p-6 md:p-10 bg-white flex flex-col items-center font-sans overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center px-4"
      >
        <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-1.5 rounded-full border border-purple-100 mb-6">
          <FontAwesomeIcon icon={faBrain} className="text-purple-600 text-sm md:text-base" />
          <span className="text-purple-600 text-xs md:text-md font-bold tracking-tight uppercase">AI-Powered Analytics</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Machine Learning Predictions</h1>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Advanced neural networks analyzing historical data and real-time sensors for accurate flood forecasting
        </p>
      </motion.div>

      {/* Main Content Grid - Responsive Padding Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full p-4 md:p-8 lg:p-15">
        
        {/* Left Panel: Prediction Accuracy */}
        <motion.div 
          variants={leftColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-purple-200/40 rounded-[2.5rem] p-6 md:p-10 border border-purple-50 relative overflow-hidden shadow-sm"
        >
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Prediction Accuracy</h2>
            <div className="bg-purple-600 px-2 py-3 md:px-3 md:py-4 rounded-xl shadow-lg shadow-purple-200 flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="text-white text-lg md:text-xl" />
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-1">
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-6xl md:text-7xl font-black text-purple-600 leading-none tracking-tighter"
              >
                98.3
              </motion.span>
              <span className="text-3xl md:text-4xl ml-2 font-black text-purple-400 leading-none">%</span>
            </div>
            <p className="text-slate-600 font-semibold text-md md:text-lg mt-4">Based on last 1000 predictions</p>
          </div>

          {/* Progress Bars */}
          <div className="space-y-8">
            <ProgressBar label="Short-term (0-6h)" value="99.2%" progress={99.2} />
            <ProgressBar label="Medium-term (6-24h)" value="97.8%" progress={97.8} />
            <ProgressBar label="Long-term (24-72h)" value="95.6%" progress={95.6} />
          </div>
        </motion.div>

        {/* Right Panel: Data Sources */}
        <motion.div 
          variants={rightColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-blue-200/40 rounded-[2.5rem] p-6 md:p-10 border border-blue-50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Data Sources</h2>
            <div className="bg-blue-600 px-2 py-3 md:px-3 md:py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center">
              <FontAwesomeIcon icon={faDatabase} className="text-white text-lg md:text-xl" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {dataSources.map((source, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02, x: 8 }}
                className="bg-white rounded-3xl md:rounded-3xl p-4 md:p-5 flex items-center justify-between shadow-sm border border-blue-100/20 transition-all duration-200 hover:shadow-xl cursor-pointer"
              >
                <div className="flex items-center gap-3 md:gap-5">
                  <div className={`${source.iconBg} w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl shrink-0`}>
                    <FontAwesomeIcon icon={source.icon} className={`${source.iconColor} text-sm md:text-lg`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm md:text-lg leading-tight truncate">{source.title}</h4>
                    <p className="text-slate-500 text-xs md:text-md mt-0.5 truncate">{source.desc}</p>
                  </div>
                </div>
                <span className={`text-xs md:text-lg font-bold ${source.statusColor} shrink-0 ml-2`}>{source.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// Reusable Progress Bar Component
const ProgressBar = ({ label, value, progress }) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <span className="text-slate-600 font-bold text-xs md:text-sm tracking-tight">{label}</span>
      <span className="text-slate-800 font-black text-xs md:text-sm tracking-tighter">{value}</span>
    </div>
    <div className="h-2.5 md:h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "anticipate" }}
        className="h-full bg-purple-600 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.3)]"
      ></motion.div>
    </div>
  </div>
);

export default PredictionsSection;