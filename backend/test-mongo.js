import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
dotenv.config({ path: resolve(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

console.log('🔍 Testing MongoDB Atlas connection...');
console.log('URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@'));

try {
  await mongoose.connect(MONGODB_URI);
  console.log('✅✅✅ SUCCESS! Connected to MongoDB Atlas!');
  console.log('Database:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
  
  await mongoose.disconnect();
  console.log('✅ Disconnected');
  process.exit(0);
} catch (error) {
  console.error('❌❌❌ Connection failed!');
  console.error('Error name:', error.name);
  console.error('Error message:', error.message);
  process.exit(1);
}
