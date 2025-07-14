import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function dropIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/villa-booking');

    const db = mongoose.connection;
    await db.collection('bookings').dropIndex('stepValidation_1');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

dropIndex();
