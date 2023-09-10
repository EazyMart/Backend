const express = require('express');
const categoryRoute = require("./Routes/categoryRoute");
const subCategoryRoute = require("./Routes/subCategoryRoute");
const brandRoute = require("./Routes/brandRoute");
const productRoute = require("./Routes/productRoute");
const roleRoute = require("./Routes/roleRoute");
const reviewRoute = require("./Routes/reviewRoute");
const couponRoute = require("./Routes/couponRoute");
const userRoute = require("./Routes/userRoute");
const authRoute = require("./Routes/authRoute");
const orderRoute = require("./Routes/orderRoute");
const webhookRoute = require("./Routes/webhookRoute");

const mountRoutes = (app) => {
    app.use(`${process.env.apiVersion}/webhook`, express.raw({type: 'application/json'}), webhookRoute);
    app.use(express.json());
    app.use(`${process.env.apiVersion}/auth`, authRoute);
    app.use(`${process.env.apiVersion}/user`, userRoute);
    app.use(`${process.env.apiVersion}/category`, categoryRoute);
    app.use(`${process.env.apiVersion}/subcategory`, subCategoryRoute);
    app.use(`${process.env.apiVersion}/brand`, brandRoute);
    app.use(`${process.env.apiVersion}/product`, productRoute);
    app.use(`${process.env.apiVersion}/role`, roleRoute);
    app.use(`${process.env.apiVersion}/review`, reviewRoute);
    app.use(`${process.env.apiVersion}/coupon`, couponRoute);
    app.use(`${process.env.apiVersion}/order`, orderRoute);
}

module.exports = mountRoutes;