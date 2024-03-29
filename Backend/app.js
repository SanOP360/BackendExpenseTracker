const express= require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const app= express();
const userRoutes=require('./routes/userRoutes');
const expenseRoutes=require('./routes/ExpenseRoutes.');
const User=require('./models/User');
const Expense=require('./models/Expense');
require("dotenv").config();

app.use(bodyParser.json());

app.use(cors());

app.use('/users',userRoutes);
app.use('/Expense',expenseRoutes);


User.hasMany(Expense);
Expense.belongsTo(User,{foreignKey:"UserId"});



const PORT=process.env.PORT || 3000;

sequelize.sync({alter:true})
    .then(()=>{
        console.log("database synced");

        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((error)=>console.error("Error syncing database:",error))

