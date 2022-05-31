
require('dotenv').config()
const mongoose = require('mongoose');

const url = process.env.DEVELOPMENT_DB_DSN;

async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            migrate: 'safe'
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };


