const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config({path: "config.env"});
const fs = require('fs');
const cors = require("cors");
const database = require("./Config/database")
const categoryRoute = require("./Routes/categoryRoute");

//Start The App
const app = express();

const port = process.env.Port || 8000;
//Connection on Atlas Mongodb
database().then(() => {
    //Create a port and make the app listen to requests on this port
    app.listen(port, function() {
        console.log(`App is running at: http://localhost:${port}/`);
    })    
})


//Middlewares
app.use(cors()) //allow cors for external clients
app.use(express.json()); //parse body into json
if(process.env.NODE_ENV == "development") //log all requests into external file 
{
    app.use(
        morgan("tiny", {
            stream: fs.createWriteStream("./access.log", {
                flags: "a",
            }),
        })
    )
}

//Routes
app.use(categoryRoute)


//Notfound Middleware
app.use((request, response, next) => {
    response.status(404).json({Data: "Not Found"});
});

// Error MiddleWare
app.use((error, response) => {
    const status = error.status || 500
    response.status(500).json({message: "tarek"});
});