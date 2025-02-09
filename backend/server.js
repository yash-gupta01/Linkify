import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import urlRoutes from './api/routes/urlRoutes.js';
import analyticsRoutes from './api/routes/analyticsRoutes.js';
import config from './config/config.js';

// Load environment variables
dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const { urlEndpoint, analyticsEndpoint } = config[environment];

const app = express();

// Middleware setup
app.use(cors()); // Enable cross-origin resource sharing
app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Routes setup
app.use(urlEndpoint, urlRoutes);
app.use(analyticsEndpoint, analyticsRoutes);

// Health check route for testing
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Service is running' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
