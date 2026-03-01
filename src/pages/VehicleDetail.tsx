import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { vehicles } from "@/data/vehicles";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground">Vehicle not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-4">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
        <p className="text-muted-foreground">Full detail page coming soon.</p>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetail;
