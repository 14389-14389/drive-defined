import { Link } from "react-router-dom";
import { Calendar, Gauge, Fuel } from "lucide-react";
import { Vehicle, formatPrice, formatMileage } from "@/data/vehicles";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-accent-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full">
            {vehicle.bodyType}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-foreground mb-1">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-accent font-heading font-bold text-xl mb-3">
          {formatPrice(vehicle.price)}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            {vehicle.fuelType}
          </span>
        </div>
        <Link to={`/vehicle/${vehicle.id}`}>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
