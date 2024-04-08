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
const ResetPasswod=require('./models/ResetPassword');
const passwordRoutes=require('./routes/Password');
require("dotenv").config();
const downloadRoutes=require('./routes/DownloadedRoutes')
const downloadFiles=require('./models/Download');
const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path');


app.use(bodyParser.json());

app.use(cors()); 
app.use(helmet());
app.use(compression());

const accesslogstream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan('combined',{stream:accesslogstream}));

app.use('/users',userRoutes);
app.use('/Expense',expenseRoutes);
app.use('/purchase',PurchaseRoutes);
app.use('/premium',PremiumRoutes);
app.use('/password',passwordRoutes);
app.use('/premium',PremiumRoutes)
app.use('/downloads',downloadRoutes);


User.hasMany(Expense);
User.hasMany(Order);
Expense.belongsTo(User,{foreignKey:"UserId"});
Order.belongsTo(User);

User.hasMany(ResetPasswod);
ResetPasswod.belongsTo(User);


User.hasMany(downloadFiles);
downloadFiles.belongsTo(User);



const PORT=process.env.PORT || 5000;

sequelize.sync({alter:true})
    .then(()=>{
        console.log("database synced");

        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((error)=>console.error("Error syncing database:",error))

