import React from 'react';
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-400 py-12 px-6 md:px-12 font-sans border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600  rounded-xl shadow-lg shadow-blue-500/20">
                <img src={logo} alt="Monitorex Logo" className="w-10 h-12" />
              </div>
              <div>
                <h2 className="text-white text-3xl font-bold leading-none tracking-tight">FloodGuard AI</h2>
                <p className="text-sm text-slate-500 mt-1 font-semibold tracking-wider">Disaster Management System</p>
              </div>
            </div>
            <p className="text-md leading-relaxed max-w-xs text-white">
              AI-powered flood prediction and disaster management system providing real-time alerts, 
              emergency response coordination, and community safety solutions.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map((icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center bg-slate-800/40 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 border border-slate-700/50"
                >
                  <FontAwesomeIcon icon={icon} size="md" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-md">
              {['Home', 'Active Alerts', 'Find Shelters', 'Weather Data', 'Safety Tips'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-500 transition-colors duration-200 inline-block">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: NGO Partners */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">NGO Partners</h3>
            <ul className="space-y-4 text-md">
              {[
                'Red Cross Society', 
                'Community Relief Fund', 
                'Health Aid International', 
                'Disaster Response Network', 
                'Emergency Aid Foundation'
              ].map((ngo) => (
                <li key={ngo}>
                  <a href="#" className="hover:text-blue-500 transition-colors duration-200 inline-block">{ngo}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact & Support</h3>
            <ul className="space-y-4 text-md">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="text-blue-500 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <span className="group-hover:text-white transition-colors">1-800-FLOOD-911</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="text-blue-500 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <span className="group-hover:text-white transition-colors">help@floodguard.ai</span>
              </li>
  
                  <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Authorities</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                </ul>
              
          
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium tracking-wide">
          <p className="text-center md:text-left">
            © {currentYear} <span className="text-white">FloodGuard AI</span>. All rights reserved. 
            <span className="mx-2 text-slate-700">|</span>
            <span className="text-slate-500 italic">Powered by Advanced Machine Learning</span>
          </p>
          <div className="flex gap-6 text-md font-bold">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;