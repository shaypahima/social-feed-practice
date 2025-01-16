import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import feedRoutes from './routes/feedRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/error.js';
import 'dotenv/config'
import { fileHandler } from './util/fileHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Debugging middleware
// app.use((req, res, next) => {
//   console.log("Request Headers:", req.headers);
//   console.log("Request Body:", req.body);
//   console.log("Request File:", req.file);
//   next();
// });

// Static files
app.use("/images", express.static(path.join(__dirname, "images")));

// File upload middleware
app.use(fileHandler.single("image"));

// Routes
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit process if unable to connect to the database
  }
};

startServer();