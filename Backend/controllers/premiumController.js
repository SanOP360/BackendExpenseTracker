const User = require("../models/User");
const Expense = require("../models/Expense");

exports.showLeaderBoard = async (req, res) => {

  try {
    const expenses = await Expense.findAll();
    const users = await User.findAll();

    let outputArr = [];

    users.forEach((user) => {
      const id = user.id;
      let totalSpent = 0;

      expenses.forEach((expense) => {
        const expenseid = expense.UserId;

        if (id == expenseid) {
          totalSpent = totalSpent + parseInt(expense.price);
        }
      });

      outputArr.push({
        name: user.name,
        totalSpent: totalSpent,
      });
    });

    console.log("outputArr", outputArr);

    res.json({ success: true, outputArr });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

exports.checkPremium = async (req, res) => {

  try {
    const result = req.user && req.user.isPremiumUser;
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};
