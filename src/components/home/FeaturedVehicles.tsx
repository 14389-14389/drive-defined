import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "@/components/VehicleCard";

const FeaturedVehicles = () => {
  const featured = vehicles.filter((v) => v.featured).slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent font-heading font-semibold text-sm uppercase tracking-wider mb-2">Our Collection</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">Featured Vehicles</h2>
          </div>
          <Link
            to="/inventory"
            className="hidden sm:flex items-center gap-1 text-accent font-heading font-semibold text-sm hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            to="/inventory"
            className="inline-flex items-center gap-1 text-accent font-heading font-semibold text-sm"
          >
            View All Vehicles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
