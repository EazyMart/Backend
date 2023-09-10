const stripe = require('stripe')(process.env.Stipe_Secret_Key);
const asyncHandler = require('express-async-handler');
const APIError = require('../ErrorHandler/APIError');
const responseFormatter = require("../ResponseFormatter/responseFormatter");
const orderModel = require("../Models/orderModel");


// @desc    Confirm order payment by stripe webhook
// @route   POST /webhook/confirm
// @access  Private
exports.confirmPayment = asyncHandler(async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    let order;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.endpointSecret);
    } 
    catch (err) {
        throw new APIError(err.message, 400);
    }
    switch (event.type) {
        case 'payment_intent.succeeded':
            const orderId = +event.data.object.metadata.tempOrderId;
            order = await orderModel.findByIdAndUpdate(orderId, {$set: {paymentMethodType: 'online', isPaid: true, paidAt: Date.now()}}, {new: true})
            break;
        default:
            throw new APIError(`Unhandled event type ${event.type}`, 500);
    }
    response.status(200).send(responseFormatter(true, "The order is confirmed successfully", [order]));
});