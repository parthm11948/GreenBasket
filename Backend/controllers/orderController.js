import Order from '../models/order.js';
import User from '../models/user.js'; 
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'captainphillip7794@gmail.com', 
        pass: 'gvgo sgzk sarm rgw p' 
    }
});

export const createOrder = async (req, res) => {
    try {
        const { 
            userId, 
            customerName, 
            productName, 
            totalAmount, 
            paymentMethod, 
            shippingAddress, 
            phoneNumber,
            productImage 
        } = req.body;

        if (!userId || !shippingAddress || !phoneNumber) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required info: Address, Phone, and User Session are mandatory." 
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User session expired." });
        }

        // Store product data inside the 'items' array
        const newOrder = new Order({
            userId,
            customerName,
            customerEmail: user.email,
            shippingAddress,
            phoneNumber,
            totalAmount,
            paymentMethod: paymentMethod || 'cod',
            status: 'Pending',
            items: [
                {
                    name: productName,
                    price: totalAmount,
                    quantity: 1,
                    img: productImage 
                }
            ]
        });

        const savedOrder = await newOrder.save();

        const mailOptions = {
            from: '"GreenBasket" <captainphillip7794@gmail.com>',
            to: user.email,
            subject: 'Order Confirmed! 🎉',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #28a745;">Order Successful!</h2>
                    <p>Hello ${customerName},</p>
                    <p>Your order for <b>${productName}</b> is confirmed.</p>
                    <p><b>Deliver to:</b> ${shippingAddress}</p>
                    <p><b>Order ID:</b> ${savedOrder._id}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            orderId: savedOrder._id
        });

    } catch (error) {
        console.error("Order Error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Merged into one single export to fix the 500 naming conflict error
export const getOrders = async (req, res) => {
    try {
        // Safe extraction of userId from query, params, or body
        const userId = req.query.userId || req.params.userId || (req.body && req.body.userId);
        
        // Filter by userId if provided, otherwise fetch all
        const filterQuery = userId ? { userId: userId } : {};

        const orders = await Order.find(filterQuery).sort({ createdAt: -1 });
        
        return res.status(200).json({ 
            success: true, 
            count: orders.length,
            orders 
        });
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Server Error: " + error.message 
        });
    }
};