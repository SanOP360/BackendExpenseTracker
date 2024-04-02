const sib = require("sib-api-v3-sdk");
const User = require("../models/User");
require("dotenv").config();

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(process.env.ExpenseKey); 
    console.log(email);

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ success: false, msg: "Email not found" });
    }

    const client = sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.ExpenseKey;

    const transEmailApi = new sib.TransactionalEmailsApi();

    const sender = { email: "sanjayl2001alm@gmail.com" };
    const receiver = [{ email: email }];

    const response = await transEmailApi.sendTransacEmail({
      sender,
      to: receiver,
      subject: "Password Reset",
      htmlContent: "<p>Click the link to reset your password</p>",
    });

    console.log(response);
    return res.json({ success: true, msg: "Password reset email sent" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};
