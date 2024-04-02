const Expense = require('../models/Expense');
const sequelize=require('../database')




exports.postExpenses = async (req, res) => {
  const { price, description, categories } = req.body;
  const t = await sequelize.transaction();

  try {
    const userId = req.user.id;
    await Expense.create(
      {
        price,
        description,
        categories,
        UserId: userId,
      },
      { transaction: t }
    );
    await t.commit(); 
    res.status(201).json({ message: "Expense Created Successfully" });
  } catch (err) {
    await t.rollback(); 
    console.log(err);
    res.status(500).json({ message: "Can't create the Expense" });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("MY user Id is ",userId)

    
    const expenses = await Expense.findAll({ where: { userId } });

    
    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Can't fetch the Expenses" });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params; 
    const expenseToDelete = await Expense.findByPk(id);

    if (!expenseToDelete) {
      return res.status(404).json({ message: "Expense not found" });
    }
    
    await expenseToDelete.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Can't delete the Expense" });
  }

}