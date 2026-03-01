import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X, 
  Loader2,
  Image as ImageIcon,
  Star
} from "lucide-react";
import { createVehicle } from "@/services/api";
import { useNotifications } from "@/context/NotificationContext";
import { cn } from "@/lib/utils";

const AdminAddVehicle: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [uploadingImages, setUploadingImages] = useState(false);
  
  const [formData, setFormData] = useState({
    stockNumber: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "",
    description: "",
    features: [] as string[],
    images: [] as string[],
    isFeatured: false,
    status: "available" as const,
    location: "Main Showroom",
    previousOwners: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.stockNumber || !formData.make || !formData.model || !formData.description) {
      addNotification({
        title: "Error",
        message: "Please fill in all required fields",
        type: "error"
      });
      return;
    }

    // Validate at least one image
    if (formData.images.length === 0) {
      addNotification({
        title: "Error",
        message: "Please add at least one photo of the vehicle",
        type: "error"
      });
      setActiveTab("images");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare vehicle data with color fallback
      const vehicleData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        color: formData.color || "Not Specified"  // Add fallback for color
      };
      
      console.log("Submitting vehicle data:", vehicleData);
      
      const result = await createVehicle(vehicleData);
      
      if (result) {
        addNotification({
          title: "Success",
          message: `Vehicle added successfully with ${formData.images.length} photos`,
          type: "success"
        });
        navigate("/admin/vehicles");
      } else {
        throw new Error("Failed to create vehicle");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      addNotification({
        title: "Error",
        message: "Failed to add vehicle. Please check all fields and try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const features = e.target.value.split(',').map(f => f.trim());
    setFormData(prev => ({ ...prev, features }));
  };

  // Simulate image upload (in production, this would upload to Cloudinary)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingImages(true);

    // Simulate upload delay
    setTimeout(() => {
      const newImages: string[] = [];
      
      // Limit to 10 images total
      const remainingSlots = 10 - formData.images.length;
      const filesToProcess = Math.min(files.length, remainingSlots);

      for (let i = 0; i < filesToProcess; i++) {
        // Create object URLs for preview
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 10) // Max 10 images
      }));

      setUploadingImages(false);

      addNotification({
        title: "Success",
        message: `${filesToProcess} photos uploaded. ${formData.images.length + filesToProcess}/10 photos total`,
        type: "success"
      });

      // Clear the input
      e.target.value = '';
    }, 1000);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));

    addNotification({
      title: "Success",
      message: "Photo removed",
      type: "success"
    });
  };

  const setPrimaryImage = (index: number) => {
    // Reorder array to make selected image first
    setFormData(prev => {
      const newImages = [...prev.images];
      const [selectedImage] = newImages.splice(index, 1);
      newImages.unshift(selectedImage);
      return { ...prev, images: newImages };
    });

    addNotification({
      title: "Success",
      message: "Primary image updated",
      type: "success"
    });
  };

  const addSampleImage = () => {
    if (formData.images.length >= 10) {
      addNotification({
        title: "Error",
        message: "Maximum 10 photos allowed",
        type: "error"
      });
      return;
    }

    // Add sample Unsplash images for demo
    const sampleImages = [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7fa0ad9?w=800",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800"
    ];

    const randomImage = sampleImages[formData.images.length % sampleImages.length];
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, randomImage].slice(0, 10)
    }));

    addNotification({
      title: "Success",
      message: "Sample image added",
      type: "success"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/vehicles")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Vehicle</h1>
          <p className="text-muted-foreground mt-1">
            Enter the details of the new vehicle
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="images" className="relative">
              Photos
              {formData.images.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {formData.images.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the vehicle's basic details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockNumber">Stock Number *</Label>
                    <Input
                      id="stockNumber"
                      name="stockNumber"
                      value={formData.stockNumber}
                      onChange={handleChange}
                      placeholder="e.g., PC001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="make">Make *</Label>
                    <Input
                      id="make"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      placeholder="e.g., Porsche"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g., Cayenne"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (R) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      placeholder="e.g., 1895000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (km) *</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      value={formData.mileage}
                      onChange={handleChange}
                      min="0"
                      placeholder="e.g., 8500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter vehicle description, features, condition, etc."
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>
                  Enter technical specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={(value: string) =>
                        setFormData((prev) => ({ ...prev, fuelType: value }))
                      }
                    >
                      <SelectTrigger>
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
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value: string) =>
                        setFormData((prev) => ({ ...prev, transmission: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bodyType">Body Type</Label>
                    <Select
                      value={formData.bodyType}
                      onValueChange={(value: string) =>
                        setFormData((prev) => ({ ...prev, bodyType: value }))
                      }
                    >
                      <SelectTrigger>
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
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      placeholder="e.g., Jet Black (optional)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Sandton Showroom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousOwners">Previous Owners</Label>
                    <Input
                      id="previousOwners"
                      name="previousOwners"
                      type="number"
                      value={formData.previousOwners}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isFeatured">Feature this vehicle on homepage</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Features & Options</CardTitle>
                <CardDescription>
                  Enter features separated by commas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="features">Features</Label>
                  <Input
                    id="features"
                    value={formData.features.join(", ")}
                    onChange={handleFeaturesChange}
                    placeholder="Sunroof, Leather Seats, Navigation, Backup Camera, Bluetooth"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple features with commas
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Photos</CardTitle>
                <CardDescription>
                  Add up to 10 photos of the vehicle. The first photo will be the main image.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image counter */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">{formData.images.length}</span> / 10 photos uploaded
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addSampleImage}
                      disabled={formData.images.length >= 10}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Add Sample
                    </Button>
                    <div className="relative">
                      <input
                        type="file"
                        id="imageUpload"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploadingImages || formData.images.length >= 10}
                      />
                      <Button 
                        type="button" 
                        variant="default"
                        disabled={uploadingImages || formData.images.length >= 10}
                      >
                        {uploadingImages ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photos
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Image grid */}
                {formData.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className={cn(
                          "relative group aspect-square rounded-lg overflow-hidden border-2",
                          index === 0 ? "border-blue-900" : "border-gray-200"
                        )}
                      >
                        <img
                          src={image}
                          alt={`Vehicle ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Primary image indicator */}
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-blue-900 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            Primary
                          </div>
                        )}

                        {/* Image controls */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => setPrimaryImage(index)}
                              className="p-1 bg-white rounded-full hover:bg-blue-900 hover:text-white transition-colors"
                              title="Set as primary"
                            >
                              <Star className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1 bg-white rounded-full hover:bg-red-900 hover:text-white transition-colors"
                            title="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Image number badge */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No photos uploaded yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click "Upload Photos" or "Add Sample" to get started
                    </p>
                  </div>
                )}

                {/* Tips */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">📸 Photo Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• First photo will be the main image displayed in listings</li>
                    <li>• Add multiple angles: front, back, sides, interior, and engine</li>
                    <li>• High-quality photos help sell vehicles faster</li>
                    <li>• You can reorder photos by setting a new primary image</li>
                    <li>• Maximum 10 photos per vehicle</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/vehicles")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Vehicle
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddVehicle;
