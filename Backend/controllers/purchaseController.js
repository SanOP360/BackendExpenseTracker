const Razorpay=require('razorpay');
const Order=require('../models/Order');
require("dotenv").config();

var rzp = new Razorpay({
  // key_id: process.env.Razorpay_key_id,
  // key_secret: process.env.Razorpay_key_secret,

  key_id:"rzp_test_bAAtb0LuNLvbLp",
  key_secret:"VnJZaLwIU60AS7zKLXP5Y9Cw"

});

console.log(rzp.key_id);
console.log(process.env.Razorpay_key_secret);
console.log(rzp);

exports.Purchasepremium = async (req, res) => {
  const userId=req.user.id;
  try {
    var options = {
      amount: 50000,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    console.log(process.env.Razorpay_key_id);
    console.log(process.env.Razorpay_key_secret);
    

    const order = await rzp.orders.create(options);
    console.log("My order is", order.id);
    
    await Order.create({
      order_id:order.id,
      status:"PENDING",
      UserId: userId,
    });

    return res.json({ order_id: order.id, key: rzp.key_id });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error123" });
  }
};


exports.successfulTransaction = async (req, res) => {
  try {
    const { payment_id, order_id,razorpay_signature } = req.body;
    const order = await Order.findOne({ where: { order_id: order_id } });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.update({ paymentid: payment_id, status: "SUCCESSFUL" });

    return res
      .status(202)
      .json({ success: true, message: "Transaction Successful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.failedTransaction = async (req, res) => {
  try {
    const { payment_id } = req.body;
    const order = await Order.findOne({ where: { paymentid: payment_id } });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.update({ status: "FAILED" });

    return res
      .status(202)
      .json({ success: true, message: "Transaction Failed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error 2" });
  }
};

