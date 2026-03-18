import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

// Matches: POST /api/orders
// Used for creating a new order
router.post('/', createOrder);

// Matches: GET /api/orders
// FIXED: Removed '/all' so that it matches the frontend request: /api/orders
router.get('/', getOrders);

export default router;