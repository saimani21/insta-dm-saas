import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    '❌ Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Global is used here to maintain a cached connection across hot reloads in dev
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      ssl: true,
      tlsAllowInvalidCertificates: true, // ⚠️ only for local dev if needed
      serverSelectionTimeoutMS: 10000,   // optional: increase connection timeout
    }).then((mongoose) => {
      console.log('✅ Connected to MongoDB Atlas');
      return mongoose;
    }).catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
