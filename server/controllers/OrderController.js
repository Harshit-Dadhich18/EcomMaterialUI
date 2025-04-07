const express = require('express');
const router = express.Router();
const EcomUser = require('../models/user.js');
const EcomOrder = require('../models/Order');

// In your Express server code
router.get('/getdata/:id', async (req, res) => {
    const { id } = req.params; // Get userId from query string

    if (!id) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }
    try {
        // Find orders by userId in the database
        const orders = await EcomOrder.findOne({ userId: id });  // Filter orders by userId
        // If no orders are found
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        // Send order data (you can modify this to return specific order details)
        res.status(200).json({
            success: true,
            orders: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get('/getAllOrders', async (req, res) => {
    try {
        // Fetch all orders with populated userId and productId in orderDetails
        const orders = await EcomOrder.find()
            .populate('userId', 'username email') // Populating user details (name, email)
        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch order data' });
    }
});

router.post("/postdata", async (req, res) => {
    const { userId, orderDetails } = req.body;
    try {
        // Check if the user exists
        const user = await EcomUser.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Calculate total price (example, you might have more complex logic)
        const totalPrice = orderDetails.reduce((acc, item) => acc + item.price * item.orderQuantity, 0);

        let order = await EcomOrder.findOne({ userId });

        if (order) {
            // If an order summary exists, append the new order to the orderDetails subarray
            order.orderDetails.push(...orderDetails);  // Add new order details to existing array
            order.totalPrice += totalPrice;  // Optiona
            await order.save();
            res.status(200).json({
                success: true,
                message: "EcomOrder added to existing order summary",
                order,
            });
        }
        else {
            // Create new order in the database
            const newOrder = new EcomOrder({
                userId,
                orderDetails,
                totalPrice,
            });

            const savedOrder = await newOrder.save();
            // Optionally, update the user's order history or other information

            res.status(201).json({
                success: true,
                message: "EcomOrder placed successfully",
                orderId: savedOrder._id,
                orderDetails: savedOrder,
            });
        }
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


router.delete('/delete', async (req, res) => {
    const { orderId, userOrderID } = req.body;

    try {
        const order = await EcomOrder.findById(userOrderID);

        if (!order) {
            return res.status(404).json({ success: false, message: 'EcomOrder not found' });
        }

        // Remove the order details item from the order's orderDetails array
        order.orderDetails = order.orderDetails.filter(detail => detail._id.toString() !== orderId);

        // If the orderDetails array is empty, delete the whole order
        if (order.orderDetails.length === 0) {
            // Delete the entire order if there are no order details left
            await EcomOrder.deleteOne({ _id: order._id });
            return res.json({ success: true, message: 'Order deleted successfully', order: null });
        }

        // If orderDetails array is not empty, save the updated order
        await order.save();

        res.json({ success: true, message: 'EcomOrder details deleted successfully', order: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting order' });
    }
});



module.exports = router;