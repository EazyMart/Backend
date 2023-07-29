const mongoose = require("mongoose");

const dbConnection = async () => {
    await mongoose.connect(process.env.DatabaseURL).then((connection) => {
        console.log(`Database is connected: ${connection.connection.host}`)
    }).catch((error) => {
        console.error(`Database Error: ${error}`);
        process.exit(1);
    })    
}

module.exports = dbConnection;
