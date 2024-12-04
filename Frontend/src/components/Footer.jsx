import React from "react";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-6">
              <img
                className="w-12 h-12 object-contain"
                src="fitness.png"
                alt="FitTrack Logo"
              />
              <h2 className="ml-3 text-xl font-bold text-gray-900">FitTrack</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              FitTrack is a revolutionary fitness platform offering personalized insights, 
              smart analytics, and cutting-edge technology to help users achieve their fitness goals. 
              From gyms to yoga to sports training, FitTrack is your ultimate fitness companion.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Visit Instagram page"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Visit Facebook page"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-800 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919050570307"
                  aria-label="Call FitTrack"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 mr-3">
                    <Phone size={16} className="group-hover:text-blue-600" />
                  </span>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p>+91 9050570307</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sharmagaurank63@gmail.com"
                  aria-label="Email FitTrack"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 mr-3">
                    <Mail size={16} className="group-hover:text-blue-600" />
                  </span>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p>info@fittrack.com</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} FitTrack. All rights reserved. | Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
