
// controllers/passwordController.js

// controllers/passwordController.js

const ResetPassword = require("../models/ResetPassword");
const User = require("../models/User");
const { v4: UUIDV4 } = require("uuid");
const bcrypt = require("bcrypt");
const sib = require('sib-api-v3-sdk');
require("dotenv").config();

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const resetToken = UUIDV4();
    await ResetPassword.create({
      id: resetToken,
      isActive: true,
      UserId: user.id,
    });

    const client = sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    if (!apiKey) {
      client.authentications['api-key'] = new sib.ApiKeyAuth('api-key', process.env.ExpenseKey, 'header');
    } else {
      apiKey.apiKey = process.env.ExpenseKey;
    }
    const transEmailApi = new sib.TransactionalEmailsApi();

    const sender = { email: "your@example.com" };
    const receiver = [{ email }];
    
    const response = await transEmailApi.sendTransacEmail({
      sender,
      to: receiver,
      subject: 'Password Reset',
      htmlContent: `<p>Click the link to reset your password</p><a href="http://localhost:3000/reset/${resetToken}">Reset Password</a>`,
    });

    return res.json({ success: true, msg: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};




exports.getResetPassword = async (req, res) => {
  try {
    const { resetId } = req.params;
    const resetPassword = await ResetPassword.findByPk(resetId);
    if (!resetPassword || !resetPassword.isActive) {
      return res.status(404).json({ success: false, msg: "Invalid or expired reset link" });
    }
    return res.json({ success: true, msg: "Reset link is valid" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

exports.postResetPassword = async (req, res) => {
  try {
    const { resetId } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, msg: "Passwords do not match" });
    }

    const resetPassword = await ResetPassword.findByPk(resetId);
    if (!resetPassword || !resetPassword.isActive) {
      return res.status(404).json({ success: false, msg: "Invalid or expired reset link" });
    }

    const user = await User.findByPk(resetPassword.UserId);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    await resetPassword.update({ isActive: false });

    return res.json({ success: true, msg: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
