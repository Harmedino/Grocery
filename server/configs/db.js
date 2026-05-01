import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });

    const rawUri = process.env.MONGODB_URI || "";
    const sanitized = rawUri.replace(/^['"]|['"]$/g, "");

    if (!sanitized) {
      throw new Error('MONGODB_URI is not set or empty');
    }

    const uri = sanitized.endsWith('/') ? `${sanitized}greencart` : `${sanitized}/greencart`;

    await mongoose.connect(uri);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
