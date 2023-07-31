const fs = require('fs');
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config({path: "config.env"});
const cors = require("cors");
const APIError = require("./Helper/APIError");
const globalError = require("./Middlewares/errorMiddleware")
const dbConnection = require("./Config/database")
const categoryRoute = require("./Routes/categoryRoute");
const subCategoryRoute = require("./Routes/subCategoryRoute");
const brandRoute = require("./Routes/brandRoute");
const productRoute = require("./Routes/productRoute");

//Start The App
const app = express();

const port = process.env.Port || 8000;
let server = app.listen();

//Connection on Atlas Mongodb
dbConnection().then(() => {
    server = app.listen(port, async () => {
        console.log(`App is running at: http://localhost:${port}/`);
    })    
})

//Middlewares
app.use(cors()) //allow cors for external clients
app.use(express.json()); //parse body into json
if(process.env.NODE_ENV === "development") //log all requests into external file 
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
app.use('/category', categoryRoute);
app.use('/subcategory', subCategoryRoute);
app.use('/brand', brandRoute);
app.use('/product', productRoute);


//Notfound Middleware
app.all('*', (request, response, next) => {
    next(new APIError(`This route is not found: ${request.originalUrl}`, 400))
});

// Error MiddleWare
app.use(globalError);


//Handling rejection or errors outside express
process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection Errors: ${error}`);
    server.close(() => {
    console.error(`Shutting down....`);
        process.exit(1);
    })
})