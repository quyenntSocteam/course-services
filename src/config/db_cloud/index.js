require('dotenv').config()

module.exports = { 
    development: { 
        database: {
            dsn: process.env.DEVELOPMENT_DB_DSN,
        }
    }
}