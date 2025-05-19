require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`);

const customLogger = require('./logger');

const port = config.port || 3000;

const app = express();

// Enable CORS for cross-origin logging
app.use(cors({
  origin: '*',  
  methods: ['POST'], 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// API endpoint to receive logs from other projects
app.post('/log', (req, res) => {
  const { logLevel, message, project, platform, label, user, meta } = req.body;

  customLogger.log({
    level: logLevel || 'info',
    message: message || 'No message provided',
    project: project || 'unknown-project',
    platform: platform || 'unknown-platform',
    user: user || 'unknown-user',
    label: label || 'general',
    meta: meta || {}
  });

  res.status(200).send({ status: 'Log received' });
});
// Start server
app.listen(port, () => {
  console.log(`Logger service running on port ${port}`);
});
