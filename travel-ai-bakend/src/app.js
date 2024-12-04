require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const decryptMiddleware = require('./middlewares/decryptMiddleware');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const cors = require('cors');
const logger = require('./utils/logger'); // Import the logger

// Create an instance of Express
const app = express();


// Apply CORS middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies

// Middleware for decrypting incoming requests
// app.use(decryptMiddleware);
app.use(bodyParser.json());

// Middleware for logging requests
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`); // Log request method and URL
  next();
});

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/trips', tripRoutes); // Trip management routes

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error('Global Error Handler:', err.stack); // Log the error stack
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
