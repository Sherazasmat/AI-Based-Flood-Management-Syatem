import React from 'react';
import { motion } from 'framer-motion';
// FontAwesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faHandHoldingHeart, 
  faHouse, 
  faArrowRight, 
  faTriangleExclamation, 
  faLocationDot 
} from '@fortawesome/free-solid-svg-icons';

const ActionSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-600 p-5 md:p-20 flex items-center justify-center overflow-hidden font-sans">
      <div className="w-full max-w-8xl relative">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Take Action Now</h2>
          <p className="text-blue-100 text-lg">Quick access to essential services and emergency response tools</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={cardVariants} className="bg-white rounded-4xl p-10 shadow-xl flex flex-col">
            <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200 text-white">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">View Active Alerts</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 grow">
              Access real-time flood alerts, warnings, and safety notifications for your area.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all group">
              View All Alerts <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">Active Alerts</span>
              <span className="text-rose-600 font-bold text-sm">3 Critical</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={cardVariants} className="bg-white rounded-4xl p-10 shadow-xl flex flex-col h-full">
            <div className="bg-rose-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-rose-100 text-white">
              <FontAwesomeIcon icon={faHandHoldingHeart} size="lg" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Report as Victim</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 grow">
              Submit an emergency report if you are affected by flooding. Response teams will respond immediately.
            </p>
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all">
              Report Emergency <FontAwesomeIcon icon={faTriangleExclamation} />
            </button>
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">Response Time</span>
              <span className="text-emerald-500 font-bold text-sm">~15 minutes</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={cardVariants} className="bg-white rounded-4xl p-8 shadow-xl flex flex-col h-full md:col-span-2 lg:col-span-1">
            <div className="bg-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-100 text-white">
              <FontAwesomeIcon icon={faHouse} size="lg" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Find Shelters</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 grow">
              Locate the nearest emergency shelters with available capacity and real-time occupancy.
            </p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all">
              Find Shelters <FontAwesomeIcon icon={faLocationDot} />
            </button>
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">Nearby Shelters</span>
              <span className="text-blue-600 font-bold text-sm">12 Available</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default ActionSection;