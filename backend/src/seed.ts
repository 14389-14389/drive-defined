import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Vehicle } from './models/Vehicle.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

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
    description: 'Stunning Porsche Cayenne with low mileage, full service history, and premium specification.',
    features: ['Panoramic Roof', 'Air Suspension', 'Sport Chrono Package', 'BOSE Sound System'],
    images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537'],
    isFeatured: true,
    status: 'available'
  },
  {
    stockNumber: 'BM002',
    make: 'BMW',
    model: 'X7',
    year: 2023,
    price: 2150000,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Mineral White',
    description: 'Executive spec BMW X7 with full M Sport package and every available option.',
    features: ['Laserlights', 'Sky Lounge Roof', 'Bowers & Wilkins Sound', 'Rear Entertainment'],
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'],
    isFeatured: true,
    status: 'available'
  },
  {
    stockNumber: 'MB003',
    make: 'Mercedes-Benz',
    model: 'GLE 450',
    year: 2022,
    price: 1650000,
    mileage: 22000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Selenite Grey',
    description: 'Luxurious GLE with hybrid efficiency and AMG Line exterior.',
    features: ['AMG Line', 'MBUX Interior Assistant', 'Energizing Package', 'Burmester Sound'],
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2'],
    isFeatured: false,
    status: 'available'
  }
];

async function seed() {
  try {
    console.log('📦 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing vehicles
    console.log('🗑️  Clearing existing vehicles...');
    await Vehicle.deleteMany({});
    console.log('✅ Cleared existing vehicles');

    // Insert sample vehicles
    console.log('📝 Inserting sample vehicles...');
    const vehicles = await Vehicle.insertMany(sampleVehicles);
    console.log(`✅ Added ${vehicles.length} sample vehicles`);

    console.log('\n📋 Sample vehicles added:');
    vehicles.forEach(v => {
      console.log(`   - ${v.year} ${v.make} ${v.model} (${v.stockNumber}) - R ${v.price.toLocaleString()}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
