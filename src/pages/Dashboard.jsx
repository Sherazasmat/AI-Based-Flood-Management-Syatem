import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import WeatherSection from '../components/WeatherSection';
import StatusSection from '../components/StatusSection';
import ActionSection from '../components/ActionSection';
import CriticalInfoSection from '../components/CriticalInfoSection';
import ShelterSection from '../components/ShelterSection';
import PredictionsSection from '../components/PredictionsSection';
import StatisticsSection from '../components/StatisticsSection';
import PartnersSection from '../components/PartnersSection';
import TestimonialsSection from '../components/TestimonialsSection';

const Dashboard = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
      
      {/* Navbar */}
      <div className="flex-none z-100">
        <Navbar />
      </div>
      <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar">
        <HeroSection />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-351 mx-auto space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 py-6"
        >
          <WeatherSection /> 
          <StatusSection />          
          <ActionSection />
          <CriticalInfoSection />
          <ShelterSection />
          <PredictionsSection />
          <StatisticsSection />
          <PartnersSection />
          <TestimonialsSection />

          <div className="pt-10">
            <Footer />
          </div>
        </motion.div>
      </main>

      <style jsx>{`
        /* Hide scrollbars but keep functionality for all browsers */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE/Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Prevent unwanted horizontal shifts on mobile */
        :global(html, body) {
          overflow-x: hidden;
          position: relative;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;