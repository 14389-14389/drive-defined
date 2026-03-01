import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

console.log('🔌 Attempting to connect to MongoDB Atlas...');
console.log('URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@'));

// Define schema
const vehicleSchema = new mongoose.Schema({
  stockNumber: String,
  make: String,
  model: String,
  year: Number,
  price: Number,
  mileage: Number,
  fuelType: String,
  transmission: String,
  bodyType: String,
  color: String,
  description: String,
  features: [String],
  images: [String],
  isFeatured: Boolean,
  status: String
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

const sampleVehicles = [
  {
    stockNumber: 'PC001',
    make: 'Porsche',
    model: 'Cayenne',
    year: 2023,
    price: 1895000,
    mileage: 8500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Jet Black',
    description: 'Stunning Porsche Cayenne with low mileage.',
    features: ['Panoramic Roof', 'Air Suspension'],
    images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537'],
    isFeatured: true,
    status: 'available'
  }
];

async function seed() {
  try {
    console.log('📦 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    await Vehicle.deleteMany({});
    console.log('✅ Cleared existing vehicles');

    const vehicles = await Vehicle.insertMany(sampleVehicles);
    console.log(`✅ Added ${vehicles.length} sample vehicles`);

    console.log('🎉 Database seeded successfully!');
    await mongoose.disconnect();
    console.log('✅ Disconnected');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seed();
