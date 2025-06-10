import React from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import icon from '../assets/images/logo/icon.png';

const Footer = () => {
  return (
    <footer className="bg-[#022C3A] text-white py-12 px-6 sm:px-12 rounded-3xl mt-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">
        {/* Logo & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <img src={icon} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold">CNS</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Experience the difference with Flib's professional home cleaning services.
            From top to bottom, we ensure every corner of your home sparkles with cleanliness and care.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Pricing</li>
            <li>Booking</li>
            <li>Services Overview</li>
            <li>Service Details</li>
            <li>Portfolio Showcase</li>
            <li>Gallery</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Events</li>
            <li>Affiliate</li>
            <li>Blog Overview</li>
            <li>Author Profile</li>
            <li>Team Members</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Home</li>
            <li>About</li>
            <li>Error 404</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Contact</li>
            <li>Sign In</li>
            <li>2FA Security</li>
            <li>Reset Password</li>
            <li>Change Password</li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h5 className="font-semibold">Subscribe to our newsletter</h5>
          <p className="text-gray-400 text-sm">
            Every week, you will get the latest news, articles, and resources in your email.
          </p>
        </div>
       <form className="flex w-full max-w-md bg-gray-200 rounded-full shadow-md overflow-hidden">
  <label htmlFor="email" className="sr-only">
    Email address
  </label>
  <input
    id="email"
    type="email"
    placeholder="Enter your email"
    className="flex-grow px-5 py-3 text-black placeholder-gray-500 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
    required
  />
  <button
    type="submit"
    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-r-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
  >
    Subscribe
  </button>
</form>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-600 pt-6 text-sm text-gray-400">
        <p>© 2025 Your Company, Inc. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaLinkedin className="hover:text-white cursor-pointer" />
          <FaXTwitter className="hover:text-white cursor-pointer" />
          <FaYoutube className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
