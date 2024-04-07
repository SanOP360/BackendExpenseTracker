const Razorpay = require("razorpay");
const Order = require("../models/Order");
const User=require("../models/User");
require("dotenv").config();




var rzp = new Razorpay({
  key_id: process.env.Razorpay_key_id,
  key_secret: process.env.Razorpay_key_secret,
});
console.log(rzp.key_id);
console.log(process.env.Razorpay_key_secret);
console.log(rzp);

exports.Purchasepremium = async (req, res) => {
  const userId = req.user.id;
  try {
    var options = {
      amount: 50000,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    console.log(process.env.Razorpay_key_id);
    console.log(process.env.Razorpay_key_secret);

    const orderPromise = rzp.orders.create(options);
    const order = await Order.create({
      order_id: (await orderPromise).id,
      status: "PENDING",
      UserId: userId,
    });

    const [orderResult, razorpayKey] = await Promise.all([
      orderPromise,
      rzp.key_id,
    ]);
    return res.json({ order_id: orderResult.id, key: razorpayKey });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error123" });
  }
};

exports.successfulTransaction = async (req, res) => {
  try {
    const { payment_id, order_id, razorpay_signature } = req.body;
    const order = await Order.findOne({ where: { order_id: order_id } });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.update({ paymentid: payment_id, status: "SUCCESSFUL" });


    const user = await User.findByPk(order.UserId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user's premium status
    await user.update({ isPremiumUser: true });

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
