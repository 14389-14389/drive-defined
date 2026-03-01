// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Vehicle {
  _id: string;
  stockNumber: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color?: string;
  description: string;
  features: string[];
  images: string[];
  isFeatured: boolean;
  status: 'available' | 'sold' | 'reserved';
  location?: string;
  previousOwners?: number;
  createdAt: string;
  updatedAt: string;
}

// Fetch all vehicles
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    console.log('Fetching vehicles from:', `${API_BASE_URL}/vehicles`);
    const response = await fetch(`${API_BASE_URL}/vehicles`);
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

// Fetch featured vehicles
export const fetchFeaturedVehicles = async (): Promise<Vehicle[]> => {
  try {
    console.log('Fetching featured vehicles from:', `${API_BASE_URL}/vehicles/featured`);
    const response = await fetch(`${API_BASE_URL}/vehicles/featured`);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured vehicles: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured vehicles:', error);
    return [];
  }
};

// Fetch single vehicle by ID
export const fetchVehicleById = async (id: string): Promise<Vehicle | null> => {
  try {
    console.log('Fetching vehicle by ID:', `${API_BASE_URL}/vehicles/${id}`);
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicle: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return null;
  }
};

// Admin: Create new vehicle
export const createVehicle = async (vehicleData: Omit<Vehicle, '_id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle | null> => {
  try {
    console.log('Creating vehicle at:', `${API_BASE_URL}/vehicles`);
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', response.status, errorText);
      throw new Error(`Failed to create vehicle: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return null;
  }
};

// Admin: Update vehicle
export const updateVehicle = async (id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle | null> => {
  try {
    console.log('Updating vehicle at:', `${API_BASE_URL}/vehicles/${id}`);
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update vehicle: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return null;
  }
};

// Admin: Delete vehicle
export const deleteVehicle = async (id: string): Promise<boolean> => {
  try {
    console.log('Deleting vehicle at:', `${API_BASE_URL}/vehicles/${id}`);
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete vehicle: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return false;
  }
};
