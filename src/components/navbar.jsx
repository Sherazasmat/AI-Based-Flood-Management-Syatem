import React from "react";
import logo from "../assets/logo.png";
import { FiBell } from "react-icons/fi";

// Navbar Component
const Navbar = () => {
  return (
    <nav className="w-full font-sans bg-white px-6 md:px-20 py-4 flex items-center justify-between">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Monitorex Logo" className="w-10 h-12" />
        <div>
          <h1 className="text-black font-bold text-2xl">Flood Guard AI</h1>
          <p className="font-light text-gray-800">
            Disaster Management System
          </p>
        </div>
      </div>

      {/* Center Menu */}
      <ul className="hidden md:flex items-center gap-8 text-xl text-[#374151] font-medium">
        <li className="cursor-pointer hover:text-blue-600">Home</li>
        <li className="cursor-pointer hover:text-blue-600">About</li>
        <li className="cursor-pointer hover:text-blue-600">Services</li>
        <li className="cursor-pointer hover:text-blue-600">Blog</li>
        <li className="cursor-pointer hover:text-blue-600">Contact</li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="bg-white p-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer">
          <FiBell className="text-2xl" />
        </button>
        <button className="bg-[#2563EB] text-white px-8 py-3 rounded-md text-md font-medium hover:bg-blue-500">
          Emergency
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
