import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <Car className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <span className="text-lg sm:text-xl font-bold text-white">AutoDrive</span>
            </div>
            <p className="text-xs sm:text-sm mb-4 px-2 sm:px-0">
              Kenya's premier destination for certified pre-owned luxury and performance vehicles.
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/inventory" className="text-sm hover:text-blue-500 transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link to="/finance" className="text-sm hover:text-blue-500 transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">
                  ABC Place, Waiyaki Way,<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <a href="tel:+254726894129" className="text-xs sm:text-sm hover:text-blue-500 transition-colors">
                  0726 894 129
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@autodrive.co.ke" className="text-xs sm:text-sm hover:text-blue-500 transition-colors">
                  info@autodrive.co.ke
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">Newsletter</h3>
            <p className="text-xs sm:text-sm mb-4">
              Get the latest deals and arrivals delivered to your inbox.
            </p>
            <div className="flex flex-col gap-2 max-w-xs mx-auto sm:mx-0">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-sm"
              />
              <Button className="bg-blue-900 hover:bg-blue-800 text-white w-full text-sm py-2">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-xs sm:text-sm text-center">
          <p>© {currentYear} AutoDrive Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;