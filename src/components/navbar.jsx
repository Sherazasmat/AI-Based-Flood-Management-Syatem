import React from "react";
import logo from "../assets/logo.png";

const navbar = () => {
  return (
    <nav className="w-full bg-[#0B4ED8] px-6 md:px-20 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <img src={logo} alt="Monitorex Logo" className="w-5 h-5" />
        </div>
        <h1 className="text-white font-semibold text-lg">Monitorex</h1>
      </div>

      {/* Center Menu */}
      <ul className="hidden md:flex items-center gap-8 text-sm text-white font-medium">
        <li className="cursor-pointer hover:text-blue-200">Home</li>
        <li className="cursor-pointer hover:text-blue-200">About</li>
        <li className="cursor-pointer hover:text-blue-200">Services</li>
        <li className="cursor-pointer hover:text-blue-200">Blog</li>
        <li className="cursor-pointer hover:text-blue-200">Contact</li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50">
          Login
        </button>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default navbar;
