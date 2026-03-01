import mongoose, { Schema } from 'mongoose';

// Define the interface for the vehicle data (without extending Document)
export interface IVehicle {
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
}

// Create the schema
const VehicleSchema = new Schema<IVehicle>({
  stockNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  make: { 
    type: String, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  mileage: { 
    type: Number, 
    required: true 
  },
  fuelType: { 
    type: String, 
    required: true 
  },
  transmission: { 
    type: String, 
    required: true 
  },
  bodyType: { 
    type: String, 
    required: true 
  },
  color: { 
    type: String,
    required: false
  },
  description: { 
    type: String, 
    required: true 
  },
  features: [{ 
    type: String 
  }],
  images: [{ 
    type: String 
  }],
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String, 
    enum: ['available', 'sold', 'reserved'], 
    default: 'available' 
  },
  location: { 
    type: String, 
    default: 'Main Showroom' 
  },
  previousOwners: { 
    type: Number, 
    default: 1 
  }
}, {
  timestamps: true
});

// Create indexes
VehicleSchema.index({ make: 1, model: 1 });
VehicleSchema.index({ price: 1 });
VehicleSchema.index({ status: 1 });
VehicleSchema.index({ isFeatured: 1 });

// Create and export the model
export const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
