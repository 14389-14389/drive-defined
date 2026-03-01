import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import ValueProps from "@/components/home/ValueProps";
import Testimonials from "@/components/home/Testimonials";
import BrandsStrip from "@/components/home/BrandsStrip";
import PriceDisplay from "@/components/PriceDisplay";
import { fetchVehicles, fetchFeaturedVehicles, Vehicle } from "@/services/api";

// Skeleton loader for vehicle cards
const VehicleCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="flex gap-4 mb-3">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
    </div>
  </div>
);

// Skeleton for featured cards (larger)
const FeaturedSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-64 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);

const Index = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [recentVehicles, setRecentVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const featured = await fetchFeaturedVehicles();
      setFeaturedVehicles(featured);

      const all = await fetchVehicles();
      setRecentVehicles(all.slice(0, 4));
    } catch (error) {
      console.error("Error loading vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Featured Vehicles Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeaturedSkeleton />
                <FeaturedSkeleton />
                <FeaturedSkeleton />
              </div>
            ) : featuredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredVehicles.slice(0, 3).map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => navigate(`/vehicle/${vehicle._id}`)}
                  >
                    <div className="h-64 bg-gray-200 relative">
                      {vehicle.images?.[0] ? (
                        <img
                          src={vehicle.images[0]}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
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
                      <button
                        className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vehicle/${vehicle._id}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No featured vehicles available.</p>
            )}
          </div>
        </section>

        {/* Recently Added Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recently Added</h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <VehicleCardSkeleton />
                <VehicleCardSkeleton />
                <VehicleCardSkeleton />
                <VehicleCardSkeleton />
              </div>
            ) : recentVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentVehicles.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => navigate(`/vehicle/${vehicle._id}`)}
                  >
                    <div className="h-48 bg-gray-200 relative">
                      {vehicle.images?.[0] ? (
                        <img
                          src={vehicle.images[0]}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <PriceDisplay price={vehicle.price} size="md" className="mb-2" />
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="mr-3">{vehicle.mileage.toLocaleString()} km</span>
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {vehicle.features?.slice(0, 3).map((feature, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {vehicle.features && vehicle.features.length > 3 && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            +{vehicle.features.length - 3} more
                          </span>
                        )}
                      </div>
                      <button
                        className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vehicle/${vehicle._id}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No vehicles available.</p>
            )}
          </div>
        </section>

        <ValueProps />
        <Testimonials />
        <BrandsStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
