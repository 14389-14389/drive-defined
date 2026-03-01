import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { makes, bodyTypes } from "@/data/vehicles";
import heroImage from "@/assets/hero-showroom.jpg";

const budgetRanges = [
  { label: "Under R30,000", value: "0-30000" },
  { label: "R30,000 - R50,000", value: "30000-50000" },
  { label: "R50,000 - R80,000", value: "50000-80000" },
  { label: "R80,000+", value: "80000-999999" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (bodyType) params.set("bodyType", bodyType);
    if (budget) params.set("budget", budget);
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl text-primary-foreground mb-4 leading-tight">
            Find Your{" "}
            <span className="text-gradient-accent">Perfect Drive</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-body">
            Browse our handpicked collection of premium certified vehicles
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-card/95 backdrop-blur-lg rounded-xl p-6 max-w-4xl mx-auto shadow-hero"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select onValueChange={setMake}>
              <SelectTrigger className="h-12 font-heading text-sm">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                {makes.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setBodyType}>
              <SelectTrigger className="h-12 font-heading text-sm">
                <SelectValue placeholder="Body Type" />
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setBudget}>
              <SelectTrigger className="h-12 font-heading text-sm">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((b) => (
                  <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleSearch}
              className="h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold text-sm"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
