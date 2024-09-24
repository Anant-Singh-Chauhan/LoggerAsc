require('dotenv').config(); // read env variables 

// take variable info from env
const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const dbUrl = config.dbUrl;
const port = config.port;

const customLogger = require('./logger');

const app = express();

// Use CORS middleware
app.use(cors({
  origin: '*',  // Allow all origins (for testing)
  methods: ['POST'], // only allowing 'Posting' logs
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Connect to MongoDB
connectDB(dbUrl);

// Endpoint for logging from other projects
app.post('/log', (req, res) => {
  const { level, message, label, isDefault, meta } = req.body;
  customLogger.log({
    level: level || 'info',
    message: message,
    label: label || 'defaultLabel', // Dynamically set label from the request
    // isDefault: isDefault || false,
    meta: {
      ...meta,
      isDefault: isDefault || false,  // Add to meta if not directly supported
      project: label || 'defaultLabel' // Project name as label
    },
  });
  res.status(200).send('Log received');
});

app.listen(port, () => {
  console.log(`Logger service running on port ${port}`);
});
