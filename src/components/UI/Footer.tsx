import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 mt-12 min-w-[100vw] text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">Our Store</h3>
          <p className="text-sm">
            We are dedicated to providing you with the highest quality products
            and services. Our mission is to make your experience delightful.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="/about" className="hover:text-slate-400 transition">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:text-slate-400 transition">
                Contact Us
              </a>
            </li>
            <li className="mb-2">
              <a href="/faq" className="hover:text-slate-400 transition">
                FAQ
              </a>
            </li>
            <li className="mb-2">
              <a href="/privacy" className="hover:text-slate-400 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Connect with Us</h3>
          <p className="text-sm mb-3">1234 Hay el Farah, Rabat, Morocco</p>
          <p className="text-sm mb-3">Email: info@gecko.com</p>
          <p className="text-sm mb-5">Phone: (123) 456-7890</p>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-white transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-slate-600 pt-4">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Gecko. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
