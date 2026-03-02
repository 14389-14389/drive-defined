import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 px-2 sm:px-3 h-10 sm:h-auto"
        >
          <span className="text-sm sm:text-base">{currency === 'KES' ? 'KSh' : '$'}</span>
          <span className="hidden md:inline text-sm sm:text-base">{currency}</span>
          <ChevronDown className="h-4 w-4 sm:h-4 sm:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px] sm:min-w-[200px]">
        <DropdownMenuItem 
          onClick={() => setCurrency('KES')}
          className="cursor-pointer py-2 sm:py-1.5"
        >
          <span className="mr-2 text-base">🇰🇪</span>
          <span className="text-sm sm:text-base">Kenyan Shilling (KES)</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setCurrency('USD')}
          className="cursor-pointer py-2 sm:py-1.5"
        >
          <span className="mr-2 text-base">🇺🇸</span>
          <span className="text-sm sm:text-base">US Dollar (USD)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;