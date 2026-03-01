import { connectDB, disconnectDB } from './src/config/database.js';

console.log('🚀 Starting database connection test...');

async function run() {
  try {
    await connectDB();
    console.log('\n✨ Test completed successfully!');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Test failed!');
    console.error(error);
    process.exit(1);
  }
}

run();
