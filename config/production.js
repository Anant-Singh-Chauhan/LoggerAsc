// config/production.js
// module.exports = {
//     dbUrl: 'mongodb+srv://enganantschauhan21:5XuS6sbIxNebQClM@clusteravalanche.rcsev.mongodb.net/LoggerDbAsc',
//     collection: 'logs',
//     port: 3000,
//     logLevel: 'info'
    
// };

module.exports = {
    dbUrl: process.env.DATABASE_URL,  // Database URL stored in an environment variable
    collection: 'logs',
    port: process.env.PORT || 8080,   // Use the PORT environment variable, fallback to 8080
    logLevel: 'info'                 // Reduced logging for production
};