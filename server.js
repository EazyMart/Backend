const compression = require('express-compression')
const express = require("express");
require("dotenv").config({path: "config.env"});
const cors = require("cors");
const dbConnection = require("./Config/database")
const logger = require("./logger");
const globalErrorHandler = require("./ErrorHandler/globalErrorHandler")
const routesMounting = require("./routesMounting");
const notFoundRoutesHandler = require("./ErrorHandler/notFoundRoutesHandler")

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (search, replacement) {
        return this.split(search).join(replacement);
    };
};

const app = express();
const port = process.env.Port || 8000;
let server = app.listen();

dbConnection().then(() => {
    server = app.listen(port, async () => {
        console.log(`App is running at: http://localhost:${port}/`);
    })
})

app.use(cors())
app.options('*', cors());
app.use(compression());
app.use(express.json());

app.use(logger());

routesMounting(app, process.env.apiVersion);

app.all('*', notFoundRoutesHandler);

app.use(globalErrorHandler);

process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection Errors: ${error}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    })
})