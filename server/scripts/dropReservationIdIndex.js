import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function dropIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/villa-booking');

    const db = mongoose.connection;
    await db.collection('bookings').dropIndex('reservationId_1');

    // List remaining indexes
    const indexes = await db.collection('bookings').listIndexes().toArray();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

dropIndex();
