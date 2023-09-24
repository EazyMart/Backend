const stripe = require('stripe')(process.env.Stipe_Secret_Key);
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const APIError = require('../ErrorHandler/APIError');
const responseFormatter = require("../ResponseFormatter/responseFormatter");
const orderModel = require("../Models/orderModel");
const {getAllDocuments, updateDocument} = require("./Base/baseController");
const {checkProductFound, checkProductColors, checkProductQuantity, calculateTotalOrderPrice, checkCouponFound, updateProductInformation, deleteIncompletedOrder} = require("../Shared/orderCheckMethods");
const updatedFields = require("../Shared/updatedFields");

// @desc    Add UserId To Request Query when the logged user has client role
// @route   NO
// @access  NO
exports.addUserIdToRequestQueryAtClientRole = (request, response, next) => {
    if(request.user.role.name.toLowerCase() === 'client') {
        request.query.user = request.user.id;
    }
    next();
}

// @desc    Create order then return the order
// @route   NO
// @access  NO
const creatOrder = async (request, response, next) => {
    let flag = true
    while(flag) {
        let session;
        try {
            session = await mongoose.startSession();
            session.startTransaction();
            const dbProducts = await checkProductFound(request, session, next);
            checkProductColors(request, dbProducts, next);
            const findalProductQuantities = checkProductQuantity(request, dbProducts, next);
            request.body.totalOrderPrice = await calculateTotalOrderPrice(request, dbProducts, findalProductQuantities, session, next);
            request.body.discountPercentage = await checkCouponFound(request, session, next);
            request.body.shippingAddress = request.shippingAddress;
            request.body.orderItems = findalProductQuantities;
            const order = new orderModel(request.body);
            await order.save({session});
            await updateProductInformation(request, dbProducts, findalProductQuantities, session);
            await session.commitTransaction();
            session.endSession();
            flag = false;
            return order;
        }
        catch(error) {
            try {
                await session.abortTransaction();
            }
            catch (rollbackError) {
                next(new APIError(`Error rolling back transaction: ${rollbackError}`, 500));
            }
            finally {
                if(session) {
                    session.endSession();
                }
                if(!error.statusCode) {
                    flag = false
                    next(error);
                }
            }
        }
    }
}

// @desc    Get All Orders
// @route   GET /user/order
// @access  Private
const searchFields = ['user', 'mobilePhone', 'totalOrderPrice', 'copoun', 'shippingPrice', 'paymentMethodType', 'isPaid', 'orderStatus', 'available', 'deleted'];
exports.getAllOrders = getAllDocuments(orderModel, 'Orders', ...searchFields);

// @desc    Create Order
// @route   POST /order
// @access  Private
exports.addOrder = asyncHandler(async (request, response, next) => {
    const order = await creatOrder(request, response, next);
    if(order) {
        if(order.paymentMethodType === 'cash') {
            response.status(201).send(responseFormatter(true, "The order is created successfully", [order]));
        }
        else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: (order.totalOrderPrice - (order.totalOrderPrice * order.discountPercentage)) * 100,
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
                metadata: {
                    tempOrderId: order._id
                }
            });
            deleteIncompletedOrder(order._id);
            response.status(201).send(responseFormatter(true, "Th client secret key is generated successfully", [{clientSecret: paymentIntent.client_secret}]));
        }
    }
});

// @desc    Create Order by Admin
// @route   POST /order
// @access  Private
const feildsThatAllowToUpdate = ["isPaid", "paidAt", "orderStatus", "deliveredAt", "available", "deleted"];
exports.updateOrderByAdmin = updateDocument(orderModel, 'Order', ...feildsThatAllowToUpdate);

// @desc    Create Order by Admin
// @route   POST /order
// @access  Private
// const feildsThatAllowToUpdate = ['orderItems', 'shippingAddress', 'mobilePhone'];
exports.updateOrderByClient = asyncHandler(async (request, response, next) => {
    let order = await orderModel.findById(request.params.id);
    if(!order) {
        throw new APIError("This order does not exist", 404);
    }
    if(order.user !== request.user.id) {
        throw new APIError("This order does not belogns to the current user", 400);
    }
    if(order.orderStatus !== 'processing') {
        throw new APIError(`You cannot update the order due to it is ${order.orderStatus}`, 400)
    }
    const targetFields = updatedFields(request, ['orderItems', 'shippingAddress', 'mobilePhone']);
    if(Object.keys(targetFields).length > 0) {
        if(targetFields.shippingAddress) {
            request.body.shippingAddress = request.shippingAddress;
        }
        if(targetFields.orderItems) {
            request.body.totalOrderPrice = await calculateTotalOrderPrice(request, request.dbProducts, request.findalProductQuantities);
        }
        order = await orderModel.findOneAndUpdate({_id: request.params.id}, targetFields, {new: true})
        if(targetFields.orderItems) {
            await updateProductInformation(request.findalProductQuantities);
        }
        response.status(200).json(responseFormatter(true, 'Your order has been updated successfully', [order]));
    }
    else {
        response.status(200).json(responseFormatter(true, 'Nothing is updated'));
    }
})

