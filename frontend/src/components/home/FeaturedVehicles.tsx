import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "@/services/api";
import PriceDisplay from "@/components/PriceDisplay";

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({ vehicles }) => {
  const navigate = useNavigate();

  if (vehicles.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>
          <p className="text-center text-gray-500">No featured vehicles available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.slice(0, 3).map((vehicle) => (
            <div 
              key={vehicle._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/vehicle/${vehicle._id}`)}
            >
              <div className="h-64 bg-gray-200 relative">
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
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <PriceDisplay price={vehicle.price} size="lg" className="mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Mileage:</span> {vehicle.mileage.toLocaleString()} km
                  </div>
                  <div>
                    <span className="font-semibold">Fuel:</span> {vehicle.fuelType}
                  </div>
                  <div>
                    <span className="font-semibold">Transmission:</span> {vehicle.transmission}
                  </div>
                  <div>
                    <span className="font-semibold">Stock #:</span> {vehicle.stockNumber}
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-900 hover:bg-blue-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/vehicle/${vehicle._id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/inventory")}
            className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
          >
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
