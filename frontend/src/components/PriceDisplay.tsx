import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, className, size = 'md' }) => {
  const { convertPrice, currency } = useCurrency();
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div>
      <p className={cn('font-bold text-blue-900', sizeClasses[size], className)}>
        {convertPrice(price)}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        *Approximate conversion
      </p>
    </div>
  );
};

export default PriceDisplay;
