module.exports = {
    dbUrl: process.env.DATABASE_URL,  // Database URL stored in an environment variable
    collection: 'logs',
    port: process.env.PORT || 8080,   // Use the PORT environment variable, fallback to 8080
    logLevel: 'info'                 // Reduced logging for production
};