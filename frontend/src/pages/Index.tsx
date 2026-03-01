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
import { Loader2 } from "lucide-react";

const Index = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [recentVehicles, setRecentVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      // Fetch featured vehicles
      const featured = await fetchFeaturedVehicles();
      setFeaturedVehicles(featured);

      // Fetch all vehicles for recent section
      const all = await fetchVehicles();
      setRecentVehicles(all.slice(0, 4)); // Show first 4 as recent
    } catch (error) {
      console.error("Error loading vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedVehicles vehicles={featuredVehicles} />
        
        {/* Recent Vehicles Section */}
        {recentVehicles.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Recently Added</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentVehicles.map((vehicle) => (
                  <div 
                    key={vehicle._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => navigate(`/vehicle/${vehicle._id}`)}
                  >
                    <div className="h-48 bg-gray-200 relative">
                      {vehicle.images && vehicle.images[0] ? (
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
                      {vehicle.isFeatured && (
                        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      
                      {/* Use PriceDisplay component for currency conversion */}
                      <PriceDisplay price={vehicle.price} size="md" className="mb-2" />
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="mr-3">{vehicle.mileage.toLocaleString()} km</span>
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {vehicle.features && vehicle.features.slice(0, 3).map((feature, i) => (
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
            </div>
          </section>
        )}

        <ValueProps />
        <Testimonials />
        <BrandsStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
