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
        <Button variant="ghost" className="flex items-center gap-1">
          <span>{currency === 'KES' ? 'KSh' : '$'}</span>
          <span className="hidden md:inline">{currency}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setCurrency('KES')}>
          <span className="mr-2">🇰🇪</span>
          <span>Kenyan Shilling (KES)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency('USD')}>
          <span className="mr-2">🇺🇸</span>
          <span>US Dollar (USD)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;
