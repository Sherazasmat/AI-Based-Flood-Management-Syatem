import React from 'react';
import { motion } from 'framer-motion';
// FontAwesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faBookOpen, 
  faShieldHalved, 
  faLifeRing, 
  faHospital, 
  faAmbulance 
} from '@fortawesome/free-solid-svg-icons';

const CriticalInfoSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="w-full bg-white min-h-screen p-6 md:p-18 flex items-center justify-center overflow-hidden font-sans">
      <div className="w-full max-w-7xl relative">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="flex items-center gap-2 bg-red-100 px-5 py-2 rounded-full border border-red-200">
            <FontAwesomeIcon icon={faLifeRing} className="text-red-600 animate-pulse" />
            <span className="text-sm md:text-md font-bold text-red-700 uppercase tracking-wider">Emergency Resources</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Critical Information</h2>
          <p className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">Essential contacts and safety protocols to keep you and your family safe during emergencies.</p>
        </motion.div>

        {/* Main Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-15"
        >
          
          {/* Section 1: Emergency Contacts */}
          <motion.div 
            variants={itemVariants} 
            className="bg-orange-50/80 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 border border-orange-100 relative shadow-sm"
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="bg-red-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200 text-white">
                <FontAwesomeIcon icon={faPhone} size="lg" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">Emergency Contacts</h3>
            </div>

            <div className="space-y-5">
              {[
                { label: "Emergency Services", sub: "24/7 Hotline", val: "911", icon: faHospital, bgColor: "bg-red-50", textColor: "text-red-600" },
                { label: "Disaster Management", sub: "Flood Team", val: "1-800-FLOOD", icon: faShieldHalved, bgColor: "bg-blue-50", textColor: "text-blue-600" },
                { label: "Medical Assistance", sub: "EMS Service", val: "1-800-MEDIC", icon: faAmbulance, bgColor: "bg-emerald-50", textColor: "text-emerald-600" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white p-5 md:p-7 rounded-4xl shadow-sm flex items-center justify-between transition-all border border-transparent hover:border-orange-200 hover:shadow-xl group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${item.bgColor} ${item.textColor} w-12 h-12 flex items-center justify-center rounded-2xl text-lg transition-transform group-hover:rotate-12`}>
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{item.label}</h4>
                      <p className="text-sm md:text-base text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                  <span className={`text-lg md:text-2xl font-black ${item.textColor} tracking-tighter`}>{item.val}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section 2: Safety Guidelines */}
          <motion.div 
            variants={itemVariants} 
            className="bg-cyan-50/80 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 border border-cyan-100 shadow-sm"
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 text-white">
                <FontAwesomeIcon icon={faBookOpen} size="lg" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800">Safety Guidelines</h3>
            </div>

            <div className="space-y-4">
              {[
                { title: "Move to Higher Ground", text: "Evacuate immediately to elevated areas to avoid rising waters." },
                { title: "Avoid Floodwater", text: "Never attempt to walk, swim, or drive through moving flood water." },
                { title: "Emergency Kit Ready", text: "Keep water, non-perishable food, and meds in a waterproof kit." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-4xl shadow-sm flex items-start gap-5 transition-all border border-transparent hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-sm shadow-md">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg md:text-xl">{step.title}</h4>
                    <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Info Diagram Suggestion */}
        <div className="mt-16 opacity-50 flex justify-center">
          
        </div>

      </div>
    </div>
  );
};

export default CriticalInfoSection;