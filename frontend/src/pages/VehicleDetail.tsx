import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Gauge,
  Fuel,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Heart,
  Share2,
  Check,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Camera
} from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { cn } from "@/lib/utils";
import { fetchVehicleById, fetchVehicles, Vehicle } from "@/services/api";

const VehicleDetail = () => {
  const { id } = useParams();
  const { addNotification } = useNotifications();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [similarVehicles, setSimilarVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadVehicle(id);
    }
  }, [id]);

  const loadVehicle = async (vehicleId: string) => {
    setLoading(true);
    try {
      const data = await fetchVehicleById(vehicleId);
      setVehicle(data);
      
      if (data) {
        // Load similar vehicles (same make)
        const allVehicles = await fetchVehicles();
        const similar = allVehicles
          .filter(v => v._id !== vehicleId && v.make === data.make)
          .slice(0, 4);
        setSimilarVehicles(similar);
      }
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiry = () => {
    addNotification({
      title: "Enquiry Sent",
      message: "Thank you for your interest. Our team will contact you shortly.",
      type: "success"
    });
  };

  const handleTestDrive = () => {
    addNotification({
      title: "Test Drive Requested",
      message: "We'll call you within 24 hours to schedule your test drive.",
      type: "info"
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addNotification({
      title: "Link Copied!",
      message: "Vehicle link copied to clipboard",
      type: "success"
    });
  };

  const handleSave = () => {
    addNotification({
      title: "Saved to Favorites",
      message: "You can view this vehicle later in your favorites",
      type: "success"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground">Vehicle not found</h1>
          <p className="text-muted-foreground mt-2">The vehicle you're looking for doesn't exist or has been sold.</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Use vehicle images or fallback
  const images = vehicle.images?.length ? vehicle.images : [
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Vehicle Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline" className="text-sm">
                    Stock #{vehicle.stockNumber}
                  </Badge>
                  <Badge 
                    variant={vehicle.status === "sold" ? "destructive" : "default"}
                    className="text-sm"
                  >
                    {vehicle.status || "Available"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {vehicle.location || 'Main Showroom'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={handleSave}>
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">
                    R {vehicle.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Drive away price</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={images[selectedImage]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>{selectedImage + 1} / {images.length}</span>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors disabled:opacity-50"
                      disabled={selectedImage === 0}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => Math.min(images.length - 1, prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors disabled:opacity-50"
                      disabled={selectedImage === images.length - 1}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                        selectedImage === index 
                          ? "border-blue-900" 
                          : "border-transparent hover:border-gray-300"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-blue-900 text-white text-xs px-1 rounded">
                          Main
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Specs Card */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Key Specifications</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Year</span>
                  </div>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="h-4 w-4" />
                    <span>Mileage</span>
                  </div>
                  <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Fuel className="h-4 w-4" />
                    <span>Fuel Type</span>
                  </div>
                  <span className="font-medium">{vehicle.fuelType}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Car className="h-4 w-4" />
                    <span>Transmission</span>
                  </div>
                  <span className="font-medium">{vehicle.transmission}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Previous Owners</span>
                  </div>
                  <span className="font-medium">{vehicle.previousOwners || 1}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  className="w-full bg-blue-900 hover:bg-blue-800"
                  onClick={handleTestDrive}
                >
                  Schedule Test Drive
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleEnquiry}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Enquiry
                </Button>

                {/* WhatsApp Button */}
                <WhatsAppButton 
                  vehicle={{
                    id: vehicle._id,
                    make: vehicle.make,
                    model: vehicle.model,
                    year: vehicle.year,
                    stockNumber: vehicle.stockNumber
                  }}
                  variant="default"
                />

                <a
                  href="tel:+27110001234"
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-blue-900 pt-2"
                >
                  <Phone className="h-4 w-4" />
                  Call us: 011 000 1234
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Details Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="specs" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Engine & Performance</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-muted-foreground">Fuel Type</dt>
                      <dd className="font-medium">{vehicle.fuelType}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-muted-foreground">Transmission</dt>
                      <dd className="font-medium">{vehicle.transmission}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-muted-foreground">Body Type</dt>
                      <dd className="font-medium">{vehicle.bodyType}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Exterior & Interior</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-muted-foreground">Color</dt>
                      <dd className="font-medium">{vehicle.color}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-muted-foreground">Mileage</dt>
                      <dd className="font-medium">{vehicle.mileage.toLocaleString()} km</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicle.features && vehicle.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Features</h3>
                    <ul className="space-y-2">
                      {vehicle.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="description">
              <div className="prose max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Vehicles Section */}
        {similarVehicles.length > 0 && (
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-heading font-bold text-2xl mb-6">Similar Vehicles</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {similarVehicles.map(v => (
                  <div 
                    key={v._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => window.location.href = `/vehicle/${v._id}`}
                  >
                    <div className="aspect-[4/3] bg-gray-200">
                      {v.images && v.images[0] && (
                        <img 
                          src={v.images[0]} 
                          alt={`${v.make} ${v.model}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{v.year} {v.make} {v.model}</h3>
                      <p className="text-blue-900 font-bold mt-1">R {v.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative max-w-7xl w-full">
            <img
              src={images[selectedImage]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="max-w-full max-h-[90vh] mx-auto object-contain"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => Math.min(images.length - 1, prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                  disabled={selectedImage === images.length - 1}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                {/* Image counter in modal */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default VehicleDetail;
