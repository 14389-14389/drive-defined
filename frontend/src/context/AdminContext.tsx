import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle } from '../types/vehicle.types';

// Types
export type UserRole = 'admin' | 'sales' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AdminStats {
  totalVehicles: number;
  soldVehicles: number;
  availableVehicles: number;
  totalEnquiries: number;
  pendingEnquiries: number;
  totalTestDrives: number;
  featuredVehicles: number;
  totalViews: number;
  recentLeads: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'sold';
  targetType: 'vehicle' | 'user' | 'enquiry';
  targetId: string;
  targetName: string;
  timestamp: string;
  details?: string;
}

interface AdminContextType {
  // Vehicle Management
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  markAsSold: (id: string) => void;
  
  // User Management
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Stats
  stats: AdminStats;
  activityLogs: ActivityLog[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@autodrive.co.za',
    role: 'admin',
    createdAt: '2026-01-01',
    isActive: true
  },
  {
    id: '2',
    name: 'Sales Manager',
    email: 'sales@autodrive.co.za',
    role: 'sales',
    createdAt: '2026-01-15',
    isActive: true
  }
];

// Initial mock vehicles
const initialVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Porsche',
    model: 'Cayenne',
    year: 2023,
    price: 1895000,
    mileage: 8500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Jet Black',
    exteriorColor: 'Jet Black Metallic',
    interiorColor: 'Bordeaux Red',
    engineSize: '3.0L V6',
    power: '335 hp',
    topSpeed: '245 km/h',
    acceleration: '5.9 sec',
    images: ['/images/placeholder.jpg'],
    description: 'Stunning Porsche Cayenne with low mileage.',
    features: ['Panoramic Roof', 'Air Suspension', 'Sport Chrono Package'],
    safetyFeatures: ['Lane Keep Assist', 'Adaptive Cruise Control', '360° Camera'],
    comfortFeatures: ['Heated Seats', 'Ventilated Seats', '4-Zone Climate Control'],
    location: 'Sandton Showroom',
    registrationYear: 2023,
    previousOwners: 1,
    serviceHistory: 'Full',
    condition: 'Excellent',
    stockNumber: 'PC23045',
    vin: 'WP1ZZZ9YZPDA12345',
    isFeatured: true,
    isNewArrival: true,
    status: 'available'
  },
  {
    id: '2',
    make: 'BMW',
    model: 'X7',
    year: 2023,
    price: 2150000,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Mineral White',
    exteriorColor: 'Mineral White Metallic',
    interiorColor: 'Tartufo Brown',
    engineSize: '4.4L V8',
    power: '530 hp',
    topSpeed: '250 km/h',
    acceleration: '4.7 sec',
    images: ['/images/placeholder.jpg'],
    description: 'Executive spec BMW X7 with full M Sport package.',
    features: ['Laserlights', 'Sky Lounge Roof', 'Bowers & Wilkins Sound'],
    safetyFeatures: ['Driving Assistant Professional', 'Active Protection'],
    comfortFeatures: ['Executive Lounge Seating', 'Massage Seats'],
    location: 'Midrand Showroom',
    registrationYear: 2023,
    previousOwners: 1,
    serviceHistory: 'Full',
    condition: 'Excellent',
    stockNumber: 'BM78654',
    vin: '5UXCW2C50P9P12345',
    isFeatured: true,
    status: 'available'
  }
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('autodrive_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  });
  
  const [users] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('autodrive_logs');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('autodrive_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);
  
  useEffect(() => {
    localStorage.setItem('autodrive_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Calculate stats
  const stats: AdminStats = {
    totalVehicles: vehicles.length,
    soldVehicles: vehicles.filter(v => v.status === 'sold').length,
    availableVehicles: vehicles.filter(v => v.status !== 'sold').length,
    totalEnquiries: 0,
    pendingEnquiries: 0,
    totalTestDrives: 0,
    featuredVehicles: vehicles.filter(v => v.isFeatured).length,
    totalViews: 0,
    recentLeads: 0
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user && password === 'password123') {
          setCurrentUser(user);
          
          const log: ActivityLog = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            action: 'login',
            targetType: 'user',
            targetId: user.id,
            targetName: user.name,
            timestamp: new Date().toISOString()
          };
          setActivityLogs(prev => [log, ...prev]);
          
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Vehicle CRUD
  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Date.now().toString(),
      status: vehicleData.status || 'available',
      images: vehicleData.images?.length ? vehicleData.images : ['/images/placeholder.jpg']
    };
    setVehicles(prev => [newVehicle, ...prev]);
    
    if (currentUser) {
      const log: ActivityLog = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'create',
        targetType: 'vehicle',
        targetId: newVehicle.id,
        targetName: `${newVehicle.year} ${newVehicle.make} ${newVehicle.model}`,
        timestamp: new Date().toISOString()
      };
      setActivityLogs(prev => [log, ...prev]);
    }
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(v => 
      v.id === id ? { ...v, ...updates } : v
    ));
    
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle && currentUser) {
      const log: ActivityLog = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'update',
        targetType: 'vehicle',
        targetId: id,
        targetName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        timestamp: new Date().toISOString()
      };
      setActivityLogs(prev => [log, ...prev]);
    }
  };

  const deleteVehicle = (id: string) => {
    const vehicle = vehicles.find(v => v.id === id);
    setVehicles(prev => prev.filter(v => v.id !== id));
    
    if (vehicle && currentUser) {
      const log: ActivityLog = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'delete',
        targetType: 'vehicle',
        targetId: id,
        targetName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        timestamp: new Date().toISOString()
      };
      setActivityLogs(prev => [log, ...prev]);
    }
  };

  const markAsSold = (id: string) => {
    setVehicles(prev => prev.map(v => 
      v.id === id ? { ...v, status: 'sold' } : v
    ));
  };

  const getVehicleById = (id: string) => vehicles.find(v => v.id === id);

  return (
    <AdminContext.Provider value={{
      vehicles,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      getVehicleById,
      markAsSold,
      users,
      currentUser,
      isLoading,
      login,
      logout,
      stats,
      activityLogs
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};