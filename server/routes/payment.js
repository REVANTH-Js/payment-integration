// === File: server/routes/payment.js ===
const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_a3U6moP1LVql3W', // Replace with Razorpay Key ID
  key_secret: 'mNtew4f1WSVYAtUqrNacOLrN' // Replace with Razorpay Key Secret
});

router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;