const express=require('express');
const router= express.Router();

const expenseController= require('../controllers/expenseController')

router.post("/add-expense",expenseController.postExpenses);
router.get("/add-expense",expenseController.getExpenses);
router.use("/delete-expense/:id",expenseController.deleteExpense)

module.exports=router;