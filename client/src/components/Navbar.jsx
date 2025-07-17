import React from "react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-scroll"; // Optional: for scrolling to sections
import logo from "../assets/logo.png";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-zinc-50 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="HireRank Logo"
            className="h-20 w-auto"
          />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium text-lg">
          <li><a href="#Features" className="relative text-gray-700 hover:text-gray-900 transition">
            <span className="after:block after:h-[2px] after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              Features
            </span></a></li>
          <li><a href="#About" className="relative text-gray-700 hover:text-gray-900 transition">
            <span className="after:block after:h-[2px] after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              About
            </span></a></li>
          <li><a href="#How It Works!" className="relative text-gray-700 hover:text-gray-900 transition">
            <span className="after:block after:h-[2px] after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              How It Works!
            </span></a></li>
          <li><a href="#Contact Us" className="relative text-gray-700 hover:text-gray-900 transition">
            <span className="after:block after:h-[2px] after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              Contact Us
            </span></a></li>
        </ul>

        {/* CTA Button */}
        
        <div className=" ">
        <a
          href="#upload"
          className="px-4 py-2 text-white font-medium rounded-full shadow-md bg-[radial-gradient(circle_at_center,_#231159,_#443c5a,_#938ca9)] hover:opacity-90 transition">
            Try now
        </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
          <ul className="flex flex-col gap-4 mt-2 text-gray-700 text-sm font-medium">
            <li><a href="#features" onClick={toggleMenu}>Features</a></li>
            <li><a href="#how" onClick={toggleMenu}>How it Works</a></li>
            <li><a href="#about" onClick={toggleMenu}>About</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
            <li>
              <a
                href="#upload"
                onClick={toggleMenu}
                className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Try Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
