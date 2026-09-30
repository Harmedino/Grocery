import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

// Cached across requests so a warm serverless instance reuses one connection
let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!connectionPromise) {
    const rawUri = process.env.MONGODB_URI || "";
    const sanitized = rawUri.replace(/^['"]|['"]$/g, "");

    if (!sanitized) {
      throw new Error('MONGODB_URI is not set or empty');
    }

    const uri = sanitized.endsWith('/') ? `${sanitized}greencart` : `${sanitized}/greencart`;

    // Fail fast (instead of the 30s default) so a bad URI or blocked IP
    // shows up as an error response before the serverless function times out
    connectionPromise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000 })
      .catch((err) => {
        // Reset so the next request retries instead of reusing the failure
        connectionPromise = null;
        throw err;
      });
  }

  return connectionPromise;
};

export default connectDB;
