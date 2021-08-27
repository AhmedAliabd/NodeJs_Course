const mongoose = require('mongoose');

const connectDB = async() =>{
    const conn = await mongoose.connect(process.env.MONGOOSEDB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue);
}

module.exports = connectDB;
