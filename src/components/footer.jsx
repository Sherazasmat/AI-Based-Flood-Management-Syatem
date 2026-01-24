import React from 'react'
import logo from "../assets/logo.png";

const footer = () => {
  return (
    <footer className="bg-[#0B1220] text-gray-400 px-6 md:px-20 pt-16 pb-8">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <img src={logo} alt="Monitorex Logo" className="w-5 h-5" />
            </div>
            <h2 className="text-white font-semibold text-lg">
              Monitorex
            </h2>
          </div>

          <p className="text-sm leading-relaxed max-w-sm mb-6">
            Our AI-powered platform offers real-time flood monitoring, predictive analytics, and instant alerts to help communities prepare, respond, and recover from flood disasters effectively.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#111827] hover:bg-blue-600 cursor-pointer text-white">f</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#111827] hover:bg-blue-600 cursor-pointer text-white">t</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#111827] hover:bg-blue-600 cursor-pointer text-white">i</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#111827] hover:bg-blue-600 cursor-pointer text-white">in</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Support</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">
            Product
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Testimonials</li>
            <li className="hover:text-white cursor-pointer">Case Studies</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        <p>
          © 2023 Monitorex. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default footer;