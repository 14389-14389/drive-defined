import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { fetchVehicleById, updateVehicle, deleteVehicle, Vehicle } from "@/services/api";
import { useNotifications } from "@/context/NotificationContext";

const AdminEditVehicle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Vehicle>>({});

  useEffect(() => {
    if (id) {
      loadVehicle(id);
    }
  }, [id]);

  const loadVehicle = async (vehicleId: string) => {
    setLoading(true);
    try {
      const data = await fetchVehicleById(vehicleId);
      if (data) {
        setVehicle(data);
        setFormData(data);
      } else {
        addNotification({ title: "Error", message: "Vehicle not found", type: "error" });
        navigate("/admin/vehicles");
      }
    } catch (error) {
      addNotification({ title: "Error", message: "Failed to load vehicle", type: "error" });
      navigate("/admin/vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      const updated = await updateVehicle(id, formData);
      if (updated) {
        addNotification({ title: "Success", message: "Vehicle updated successfully", type: "success" });
        navigate("/admin/vehicles");
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      addNotification({ title: "Error", message: "Failed to update vehicle", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const success = await deleteVehicle(id);
        if (success) {
          addNotification({ title: "Success", message: "Vehicle deleted successfully", type: "success" });
          navigate("/admin/vehicles");
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        addNotification({ title: "Error", message: "Failed to delete vehicle", type: "error" });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleFeaturesChange = (field: string, value: string) => {
    const featuresArray = value.split(',').map(f => f.trim()).filter(f => f);
    setFormData(prev => ({ ...prev, [field]: featuresArray }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-4 sm:p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Vehicle not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/vehicles")} className="h-8 w-8 sm:h-10 sm:w-10">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Edit Vehicle</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {vehicle.year} {vehicle.make} {vehicle.model} - Stock #{vehicle.stockNumber}
            </p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleDelete} className="w-full sm:w-auto">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Vehicle
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-4 sm:space-y-6">
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start sm:justify-center gap-1 p-1">
            <TabsTrigger value="basic" className="text-xs sm:text-sm px-2 sm:px-4">Basic Info</TabsTrigger>
            <TabsTrigger value="details" className="text-xs sm:text-sm px-2 sm:px-4">Details</TabsTrigger>
            <TabsTrigger value="features" className="text-xs sm:text-sm px-2 sm:px-4">Features</TabsTrigger>
            <TabsTrigger value="images" className="text-xs sm:text-sm px-2 sm:px-4">Images</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Basic Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Edit the vehicle's basic details</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make" className="text-xs sm:text-sm">Make *</Label>
                    <Input id="make" name="make" value={formData.make || ''} onChange={handleChange} required className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-xs sm:text-sm">Model *</Label>
                    <Input id="model" name="model" value={formData.model || ''} onChange={handleChange} required className="h-9 sm:h-10 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-xs sm:text-sm">Year *</Label>
                    <Input id="year" name="year" type="number" value={formData.year || ''} onChange={handleChange} required className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-xs sm:text-sm">Price (KES) *</Label>
                    <Input id="price" name="price" type="number" value={formData.price || ''} onChange={handleChange} required className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage" className="text-xs sm:text-sm">Mileage (km) *</Label>
                    <Input id="mileage" name="mileage" type="number" value={formData.mileage || ''} onChange={handleChange} required className="h-9 sm:h-10 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockNumber" className="text-xs sm:text-sm">Stock Number *</Label>
                    <Input id="stockNumber" name="stockNumber" value={formData.stockNumber || ''} onChange={handleChange} required className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color" className="text-xs sm:text-sm">Color</Label>
                    <Input id="color" name="color" value={formData.color || ''} onChange={handleChange} className="h-9 sm:h-10 text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs sm:text-sm">Description *</Label>
                  <Textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} rows={4} required className="text-sm" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelType" className="text-xs sm:text-sm">Fuel Type</Label>
                    <Select value={formData.fuelType || 'Petrol'} onValueChange={(value) => setFormData(prev => ({ ...prev, fuelType: value }))}>
                      <SelectTrigger className="h-9 sm:h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission" className="text-xs sm:text-sm">Transmission</Label>
                    <Select value={formData.transmission || 'Automatic'} onValueChange={(value) => setFormData(prev => ({ ...prev, transmission: value }))}>
                      <SelectTrigger className="h-9 sm:h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bodyType" className="text-xs sm:text-sm">Body Type</Label>
                    <Select value={formData.bodyType || 'SUV'} onValueChange={(value) => setFormData(prev => ({ ...prev, bodyType: value }))}>
                      <SelectTrigger className="h-9 sm:h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                        <SelectItem value="Coupe">Coupe</SelectItem>
                        <SelectItem value="Convertible">Convertible</SelectItem>
                        <SelectItem value="Bakkie">Bakkie</SelectItem>
                        <SelectItem value="Performance">Performance</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-xs sm:text-sm">Status</Label>
                    <Select value={formData.status || 'available'} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger className="h-9 sm:h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Features & Options</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="features" className="text-xs sm:text-sm">Features (comma separated)</Label>
                  <Input
                    id="features"
                    value={(formData.features || []).join(", ")}
                    onChange={(e) => handleFeaturesChange('features', e.target.value)}
                    placeholder="Sunroof, Leather Seats, Navigation, etc."
                    className="h-9 sm:h-10 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Vehicle Images</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {/* Horizontal scroll on mobile */}
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 min-w-max sm:min-w-0">
                    {(formData.images || []).map((img, index) => (
                      <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden w-32 sm:w-auto">
                        <img src={img} alt={`Vehicle ${index + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                </div>
                {(formData.images || []).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No images available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/vehicles")} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="w-full sm:w-auto">
            {saving ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" />Save Changes</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditVehicle;