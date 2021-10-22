import asyncHandler from 'express-async-handler';
import Order from '../database/orderSchema.js';

export const addOrderItems = asyncHandler(async (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
   } = req.body;
   if (orderItems && orderItems.length == 0) {
      res.status(400);
      throw new Error('No order items');
      return;
   } else {
      const newOrder = new Order({
         user: req.user._id,
         orderItems,
         shippingAddress,
         paymentMethod,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice,
      });
      const createdOrder = await newOrder.save();
      res.status(201).json(createdOrder);
   }
});

export const fetchOrder = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
   );
   if (!order) {
      res.status(400);
      throw new Error('No order items');
   } else {
      res.status(201).json(order);
   }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id);
   if (!order) {
      res.status(400);
      throw new Error('No order items');
   } else {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
         id: req.body.id,
         status: req.body.status,
         updateTime: req.body.update_time,
         emailAddress: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.status(201).json(updatedOrder);
   }
});

export const fetchAllOrders = asyncHandler(async (req, res) => {
   const order = await Order.find({ user: req.user._id });
   if (!order) {
      res.status(400);
      throw new Error('No order items');
   } else {
      res.status(201).json(order);
   }
});
