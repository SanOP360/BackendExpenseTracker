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
<<<<<<< HEAD
const passwordRoutes=require('./routes/Password');
=======
>>>>>>> c6c62ff8c610c38146ff25f3229045d5f5ec20c3
require("dotenv").config();

app.use(bodyParser.json());

app.use(cors());

app.use('/users',userRoutes);
app.use('/Expense',expenseRoutes);
app.use('/purchase',PurchaseRoutes);
<<<<<<< HEAD
app.use('/premium',PremiumRoutes);
app.use('/password',passwordRoutes);
=======
app.use('/premium',PremiumRoutes)
>>>>>>> c6c62ff8c610c38146ff25f3229045d5f5ec20c3


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

