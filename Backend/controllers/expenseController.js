const Expense = require('../models/Expense');

exports.postExpenses = async (req, res) => {
  const { price, description, categories} = req.body;
  try {
    await Expense.create({
      price, description, categories
    });
    res.status(201).json({ message: "Expense Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cant create the Expense" });
  }
};

exports.getExpenses= async (req,res)=>{
    try{
        const expenses=await Expense.findAll();
        res.status(200).json(expenses)

    }
    catch(err){
        console.log(err);
        res.status(501).json({message:"Can't fetcu the Expense"});
    }
}

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