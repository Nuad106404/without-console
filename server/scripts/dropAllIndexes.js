import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function dropAllIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/villa-booking');

    const db = mongoose.connection;
    
    // Drop all indexes except _id
    await db.collection('bookings').dropIndexes();

    // Create only the indexes we need
    await db.collection('bookings').createIndex({ 'customerInfo.email': 1 });
    await db.collection('bookings').createIndex({ status: 1 });

    // List remaining indexes
    const indexes = await db.collection('bookings').listIndexes().toArray();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

dropAllIndexes();
