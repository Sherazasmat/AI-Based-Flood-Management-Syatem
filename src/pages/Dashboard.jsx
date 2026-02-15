import React from 'react';
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
    <>
      <Navbar />
      <HeroSection />  
      <WeatherSection /> 
      <StatusSection /> 
      <ActionSection />
      <CriticalInfoSection />
      <ShelterSection />
      <PredictionsSection />
      <StatisticsSection />
      <PartnersSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default Dashboard;
