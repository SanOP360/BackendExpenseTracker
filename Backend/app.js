const express= require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const app= express();
const userRoutes=require('./routes/userRoutes');
const expenseRoutes=require('./routes/ExpenseRoutes.');
const PremiumRoutes=require('./routes/PremiumRouter')
const User=require('./models/User');
const Order=require('./models/Order');
const Expense=require('./models/Expense');
const PurchaseRoutes=require('./routes/PurchaseRoutes');
const passwordRoutes=require('./routes/Password');
require("dotenv").config();

app.use(bodyParser.json());

app.use(cors()); 

app.use('/users',userRoutes);
app.use('/Expense',expenseRoutes);
app.use('/purchase',PurchaseRoutes);
app.use('/premium',PremiumRoutes);
app.use('/password',passwordRoutes);
app.use('/premium',PremiumRoutes)


User.hasMany(Expense);
User.hasMany(Order);
Expense.belongsTo(User,{foreignKey:"UserId"});
Order.belongsTo(User)




const PORT=process.env.PORT || 5000;

sequelize.sync({alter:true})
    .then(()=>{
        console.log("database synced");

        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((error)=>console.error("Error syncing database:",error))

