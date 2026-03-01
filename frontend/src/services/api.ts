const API_BASE_URL = 'http://localhost:5000/api';

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
  color: string;
  description: string;
  features: string[];
  images: string[];
  isFeatured: boolean;
  status: 'available' | 'sold' | 'reserved';
  createdAt: string;
  updatedAt: string;
}

// Fetch all vehicles
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles`);
    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

// Fetch featured vehicles
export const fetchFeaturedVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured vehicles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching featured vehicles:', error);
    return [];
  }
};

// Fetch single vehicle by ID
export const fetchVehicleById = async (id: string): Promise<Vehicle | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vehicle');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return null;
  }
};

// Admin: Create new vehicle
export const createVehicle = async (vehicleData: Omit<Vehicle, '_id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    if (!response.ok) {
      throw new Error('Failed to create vehicle');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return null;
  }
};

// Admin: Update vehicle
export const updateVehicle = async (id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    if (!response.ok) {
      throw new Error('Failed to update vehicle');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return null;
  }
};

// Admin: Delete vehicle
export const deleteVehicle = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete vehicle');
    }
    return true;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return false;
  }
};
