import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="px-4 py-8 text-sm text-gray-600 border-t-[1px] border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="space-y-2">
          <div className="font-semibold text-gray-800">About</div>
          <div className="flex flex-col space-y-1">
            <a href="#" className="hover:text-gray-900">
              About Us
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-gray-800">Resources</div>
          <div className="flex flex-col space-y-1">
            <a href="#" className="hover:text-gray-900">
              Documentation
            </a>
            <a href="#" className="hover:text-gray-900">
              Help Center
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-gray-800">Legal</div>
          <div className="flex flex-col space-y-1">
            <a href="#" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-gray-800">Connect</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900">
              <FaLinkedin size={30} />
            </a>
            <a href="#" className="hover:text-gray-900">
              <FaFacebookSquare size={30} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-xs">
        © 2024 Student Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
