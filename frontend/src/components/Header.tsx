import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import NotificationBell from './NotificationBell';
import CurrencySwitcher from './CurrencySwitcher';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

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
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="AutoDrive" 
                className="h-8 sm:h-10 w-auto" // Smaller on mobile, larger on sm+
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

          {/* Right side icons - desktop */}
          <div className="hidden md:flex items-center gap-4">
            <CurrencySwitcher />
            <NotificationBell />
            <a
              href="tel:+254726894129"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-900"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">0726 894 129</span>
            </a>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-blue-900 hover:bg-blue-800"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile header right section */}
          <div className="md:hidden flex items-center gap-1 sm:gap-2">
            <CurrencySwitcher />
            <NotificationBell />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with improved touch targets */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-100">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block text-gray-700 hover:text-blue-900 px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <a
              href="tel:+254726894129"
              className="flex items-center gap-3 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-50"
            >
              <Phone className="h-5 w-5" />
              <span className="text-base font-medium">0726 894 129</span>
            </a>
            <Button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="w-full bg-blue-900 hover:bg-blue-800 py-3 text-base"
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