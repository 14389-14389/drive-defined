
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield,
  Save,
  Loader2,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Bell,
  Palette,
  CreditCard,
  Users,
  Eye,
  EyeOff,
  Plus,
  Trash2
} from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DealershipSettings {
  // General Info
  name: string;
  email: string;
  phone: string;
  alternativePhone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  
  // Business Hours
  businessHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  
  // Social Media
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
  
  // Contact
  whatsappNumber: string;
  whatsappEnabled: boolean;
  whatsappGreeting: string;
  
  // Financial
  currency: string;
  taxRate: number;
  taxNumber: string;
  
  // Appearance
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  favicon: string;
  
  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  newEnquiryAlert: boolean;
  testDriveAlert: boolean;
  lowInventoryAlert: boolean;
  dailySummary: boolean;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  
  // Staff
  salesTeam: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    active: boolean;
  }>;
}

const AdminSettings: React.FC = () => {
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  const [settings, setSettings] = useState<DealershipSettings>({
    // General Info
    name: "AutoDrive",
    email: "info@autodrive.co.za",
    phone: "011 000 1234",
    alternativePhone: "011 000 1235",
    address: "123 Motor Way",
    city: "Sandton",
    province: "Gauteng",
    postalCode: "2196",
    country: "South Africa",
    
    // Business Hours
    businessHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "15:00", closed: false },
      sunday: { open: "00:00", close: "00:00", closed: true }
    },
    
    // Social Media
    socialMedia: {
      facebook: "https://facebook.com/autodrive",
      instagram: "https://instagram.com/autodrive",
      twitter: "https://twitter.com/autodrive",
      linkedin: "https://linkedin.com/company/autodrive",
      youtube: "https://youtube.com/autodrive",
      tiktok: "https://tiktok.com/@autodrive"
    },
    
    // Contact
    whatsappNumber: "+27110001234",
    whatsappEnabled: true,
    whatsappGreeting: "Hi! How can we help you today?",
    
    // Financial
    currency: "ZAR",
    taxRate: 15,
    taxNumber: "1234567890",
    
    // Appearance
    primaryColor: "#1a2b3c",
    secondaryColor: "#e67e22",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    newEnquiryAlert: true,
    testDriveAlert: true,
    lowInventoryAlert: true,
    dailySummary: false,
    
    // SEO
    metaTitle: "AutoDrive - Premium Quality Vehicles",
    metaDescription: "South Africa's premier destination for certified pre-owned luxury and performance vehicles.",
    metaKeywords: "cars, dealership, auto, vehicles, south africa, sandton",
    googleAnalyticsId: "UA-12345678-1",
    
    // Staff
    salesTeam: [
      {
        id: "1",
        name: "John Smith",
        email: "john@autodrive.co.za",
        phone: "011 000 1236",
        role: "Senior Sales Consultant",
        active: true
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@autodrive.co.za",
        phone: "011 000 1237",
        role: "Sales Manager",
        active: true
      }
    ]
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // Try to load from localStorage first
      const saved = localStorage.getItem('autodrive_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
        addNotification({
          title: "Settings Loaded",
          message: "Your settings have been loaded successfully",
          type: "success"
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      addNotification({
        title: "Error",
        message: "Failed to load settings",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('autodrive_settings', JSON.stringify(settings));
      
      // In a real app, you would also save to your backend
      // await fetch('/api/settings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      
      addNotification({
        title: "Success",
        message: "Settings saved successfully",
        type: "success"
      });
    } catch (error) {
      addNotification({
        title: "Error",
        message: "Failed to save settings",
        type: "error"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof DealershipSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessHoursChange = (
    day: string, 
    field: 'open' | 'close' | 'closed', 
    value: string | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value
        }
      }
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const addStaffMember = () => {
    const newStaff = {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      role: "Sales Consultant",
      active: true
    };
    setSettings(prev => ({
      ...prev,
      salesTeam: [...prev.salesTeam, newStaff]
    }));
  };

  const removeStaffMember = (id: string) => {
    setSettings(prev => ({
      ...prev,
      salesTeam: prev.salesTeam.filter(member => member.id !== id)
    }));
  };

  const updateStaffMember = (id: string, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      salesTeam: prev.salesTeam.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your dealership settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="business">Hours</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Dealership Information
              </CardTitle>
              <CardDescription>
                Configure your basic dealership details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Dealership Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Primary Phone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternativePhone">Alternative Phone</Label>
                  <Input
                    id="alternativePhone"
                    value={settings.alternativePhone}
                    onChange={(e) => handleChange('alternativePhone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={settings.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    value={settings.province}
                    onChange={(e) => handleChange('province', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={settings.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={settings.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Hours */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
              <CardDescription>
                Set your dealership's operating hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 font-medium capitalize">{day}</div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!hours.closed}
                      onCheckedChange={(checked) => 
                        handleBusinessHoursChange(day, 'closed', !checked)
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      {hours.closed ? 'Closed' : 'Open'}
                    </span>
                  </div>

                  {!hours.closed && (
                    <>
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => 
                            handleBusinessHoursChange(day, 'open', e.target.value)
                          }
                          className="w-24"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => 
                            handleBusinessHoursChange(day, 'close', e.target.value)
                          }
                          className="w-24"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>
                Add your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Label>
                <Input
                  value={settings.socialMedia.facebook}
                  onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  value={settings.socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  Twitter/X
                </Label>
                <Input
                  value={settings.socialMedia.twitter}
                  onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  LinkedIn
                </Label>
                <Input
                  value={settings.socialMedia.linkedin}
                  onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourpage"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact & WhatsApp
              </CardTitle>
              <CardDescription>
                Configure your contact options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Enable WhatsApp</Label>
                  <Switch
                    checked={settings.whatsappEnabled}
                    onCheckedChange={(checked) => 
                      handleChange('whatsappEnabled', checked)
                    }
                  />
                </div>
              </div>

              {settings.whatsappEnabled && (
                <>
                  <div className="space-y-2">
                    <Label>WhatsApp Number</Label>
                    <Input
                      value={settings.whatsappNumber}
                      onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                      placeholder="+27110001234"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>WhatsApp Greeting Message</Label>
                    <Textarea
                      value={settings.whatsappGreeting}
                      onChange={(e) => handleChange('whatsappGreeting', e.target.value)}
                      placeholder="Hi! How can we help you today?"
                      rows={2}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Financial Settings
              </CardTitle>
              <CardDescription>
                Configure currency and tax settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => handleChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tax Rate (%)</Label>
                  <Input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleChange('taxRate', Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tax/VAT Number</Label>
                <Input
                  value={settings.taxNumber}
                  onChange={(e) => handleChange('taxNumber', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize your website's look and feel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      placeholder="#1a2b3c"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      placeholder="#e67e22"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input
                  value={settings.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  placeholder="/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label>Favicon URL</Label>
                <Input
                  value={settings.favicon}
                  onChange={(e) => handleChange('favicon', e.target.value)}
                  placeholder="/favicon.ico"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Channels</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        handleChange('emailNotifications', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Notifications</Label>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => 
                        handleChange('smsNotifications', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>WhatsApp Notifications</Label>
                    <Switch
                      checked={settings.whatsappNotifications}
                      onCheckedChange={(checked) => 
                        handleChange('whatsappNotifications', checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Alert Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>New Enquiry Alert</Label>
                    <Switch
                      checked={settings.newEnquiryAlert}
                      onCheckedChange={(checked) => 
                        handleChange('newEnquiryAlert', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Test Drive Booking Alert</Label>
                    <Switch
                      checked={settings.testDriveAlert}
                      onCheckedChange={(checked) => 
                        handleChange('testDriveAlert', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Low Inventory Alert</Label>
                    <Switch
                      checked={settings.lowInventoryAlert}
                      onCheckedChange={(checked) => 
                        handleChange('lowInventoryAlert', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Daily Summary</Label>
                    <Switch
                      checked={settings.dailySummary}
                      onCheckedChange={(checked) => 
                        handleChange('dailySummary', checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                SEO Settings
              </CardTitle>
              <CardDescription>
                Optimize your website for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={settings.metaTitle}
                  onChange={(e) => handleChange('metaTitle', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={settings.metaDescription}
                  onChange={(e) => handleChange('metaDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Meta Keywords (comma separated)</Label>
                <Input
                  value={settings.metaKeywords}
                  onChange={(e) => handleChange('metaKeywords', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Google Analytics ID</Label>
                <Input
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                  placeholder="UA-XXXXXXXXX-X"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
