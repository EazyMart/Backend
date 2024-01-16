const express = require("express");
const compression = require('express-compression')
const cors = require("cors");
require("dotenv").config({path: ".env"});
const dbConnection = require("./Config/database")
const logger = require("./logger");
const routesMounting = require("./routesMounting");
const globalErrorHandler = require("./ErrorHandler/globalErrorHandler")
const notFoundRoutesHandler = require("./ErrorHandler/notFoundRoutesHandler")

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
app.use(logger());

routesMounting(app);

app.all('*', notFoundRoutesHandler);

app.use(globalErrorHandler);

process.on("unhandledRejection", (error) => {
	console.error(`Unhandled Rejection Errors: ${error}`);
	server.close(() => {
		console.error(`Shutting down....`);
		process.exit(1);
	})
})