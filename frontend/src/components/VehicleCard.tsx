import React from "react";
import { useNavigate } from "react-router-dom";
import { Car, Gauge, Fuel } from "lucide-react";
import { Vehicle } from "@/services/api";
import { Button } from "@/components/ui/button";
import PriceDisplay from "./PriceDisplay";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => navigate(`/vehicle/${vehicle._id}`)}
    >
      {/* Image container - fixed height works well, but ensure image covers */}
      <div className="h-48 bg-gray-200 relative">
        {vehicle.images && vehicle.images[0] ? (
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
        {vehicle.isFeatured && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>

        <PriceDisplay price={vehicle.price} className="mt-2 mb-3" />

        {/* Specs: wrap on small screens, reduce gap */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Gauge size={14} className="sm:size-4" />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel size={14} className="sm:size-4" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car size={14} className="sm:size-4" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        {/* Feature chips - already wrap nicely */}
        <div className="mt-4 flex flex-wrap gap-1">
          {vehicle.features &&
            vehicle.features.slice(0, 3).map((feature, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          {vehicle.features && vehicle.features.length > 3 && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              +{vehicle.features.length - 3}
            </span>
          )}
        </div>

        <Button
          className="w-full mt-4 bg-blue-900 text-white hover:bg-blue-800 text-sm sm:text-base"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/vehicle/${vehicle._id}`);
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;