// index.js

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React development server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Apply CORS middleware with options

// Middleware
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Use MongoDB URI from .env

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/api', (req, res) => {
    const randomData = {
      id: Math.floor(Math.random() * 1000),
      name: `Item-${Math.floor(Math.random() * 100)}`,
      value: Math.random() * 100,
      timestamp: new Date().toISOString()
    };
  
    res.json(randomData);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
