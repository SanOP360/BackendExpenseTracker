const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { verifyToken } = require("../middleware/auth");

router.post("/add-expense", verifyToken, expenseController.postExpenses);
router.get("/add-expenses", verifyToken, expenseController.getExpenses);
router.use("/delete-expense/:id", verifyToken, expenseController.deleteExpense);

module.exports = router;
  