import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { makes, bodyTypes } from "@/data/vehicles";
import heroImage from "@/assets/hero-showroom.jpg";

const budgetRanges = [
  { label: "Any Budget", value: "any" },
  { label: "Under KSH500,000", value: "0-500000" },
  { label: "KSH500,000 - KSH1,000,000", value: "500000-1000000" },
  { label: "KSH1,000,000 - KSH1,500,000", value: "1000000-1500000" },
  { label: "KSH1,500,000 - KSH2,000,000", value: "1500000-2000000" },
  { label: "Above KSH2,000,000", value: "2000000-9999999" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState<string>("any");
  const [bodyType, setBodyType] = useState<string>("any");
  const [budget, setBudget] = useState<string>("any");

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (make && make !== "any") {
      params.set("make", make);
    }
    
    if (bodyType && bodyType !== "any") {
      params.set("bodyType", bodyType);
    }
    
    if (budget && budget !== "any") {
      // Extract max price from budget range
      const budgetValue = budget.split('-')[1];
      if (budgetValue) {
        params.set("maxPrice", budgetValue);
      }
    }
    
    navigate(`/inventory?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Add "Any" option to makes and bodyTypes
  const allMakes = ["any", ...makes];
  const allBodyTypes = ["any", ...bodyTypes];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Subtle gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white mb-4 leading-tight drop-shadow-lg">
            Find Your{" "}
            <span className="text-yellow-400">Perfect Drive</span>
          </h1>
          <p className="text-white/95 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-body drop-shadow">
            Browse our handpicked collection of premium certified vehicles
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={make} onValueChange={setMake}>
              <SelectTrigger className="h-12 font-heading text-sm border-gray-200 bg-white">
                <SelectValue placeholder="Select Make" />
              </SelectTrigger>
              <SelectContent>
                {allMakes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m === "any" ? "All Makes" : m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={bodyType} onValueChange={setBodyType}>
              <SelectTrigger className="h-12 font-heading text-sm border-gray-200 bg-white">
                <SelectValue placeholder="Select Body Type" />
              </SelectTrigger>
              <SelectContent>
                {allBodyTypes.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b === "any" ? "All Body Types" : b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="h-12 font-heading text-sm border-gray-200 bg-white">
                <SelectValue placeholder="Select Budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleSearch}
              className="h-12 bg-blue-900 hover:bg-blue-800 text-white font-heading font-bold text-sm transition-all duration-300 hover:scale-105"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Vehicles
            </Button>
          </div>
          
          {/* Quick search tips */}
          <div className="mt-4 text-sm text-gray-600">
            <p>Popular searches: 
              <button 
                onClick={() => { setMake("Porsche"); setBodyType("any"); setBudget("any"); handleSearch(); }} 
                className="text-blue-900 hover:text-blue-700 hover:underline mx-1 font-medium"
              >
                Porsche
              </button> 
              • 
              <button 
                onClick={() => { setMake("any"); setBodyType("SUV"); setBudget("any"); handleSearch(); }} 
                className="text-blue-900 hover:text-blue-700 hover:underline mx-1 font-medium"
              >
                SUV
              </button> 
              • 
              <button 
                onClick={() => { setMake("any"); setBodyType("any"); setBudget("1500000-2000000"); handleSearch(); }} 
                className="text-blue-900 hover:text-blue-700 hover:underline mx-1 font-medium"
              >
                ksh 500k - ksh 10M
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
