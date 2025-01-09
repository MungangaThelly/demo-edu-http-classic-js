const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = require('app');  
require('dotenv').config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json()); // To parse incoming JSON requests
app.use(cors());          // To allow cross-origin requests (optional, based on your needs)

// Routes
app.use('/api/users', require('./routes/userRoutes'));  // Import and use user routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Export the app for use in server.js or for testing
module.exports = app;
