const mongoose = require("mongoose");

const dbConnection = async () => {
    const connection = await mongoose.connect(process.env.DatabaseURL);
    console.log(`Database is connected: ${connection.connection.host}`)
}

module.exports = dbConnection;
