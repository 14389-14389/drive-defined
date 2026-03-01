import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import NotificationBell from './NotificationBell';
import CurrencySwitcher from './CurrencySwitcher';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png'; // Import your logo

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Finance', href: '/finance' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with image */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="AutoDrive" 
                className="h-10 w-auto" // Adjust height as needed (h-8, h-10, h-12)
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Switcher */}
            <CurrencySwitcher />
            
            {/* Notification Bell */}
            <NotificationBell />

            {/* Phone Number - Kenyan format */}
            <a
              href="tel:+254726894129"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-900"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">0726 894 129</span>
            </a>

            {/* Contact Button */}
            <Button
              onClick={() => navigate('/contact')}
              className="bg-blue-900 hover:bg-blue-800"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <CurrencySwitcher />
            <NotificationBell />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <a
              href="tel:+254726894129"
              className="flex items-center gap-2 text-gray-700 px-3 py-2"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">0726 894 129</span>
            </a>
            <Button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="w-full bg-blue-900 hover:bg-blue-800"
            >
              Enquire Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
