const express= require('express');
const Sequelize=require('./database');
const cors=require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const app= express();
const userRoutes=require('./routes/userRoutes')

app.use(bodyParser.json());

app.use(cors());

app.use('/users',userRoutes);

const PORT=process.env.PORT || 3000;

sequelize.sync({alter:true})
    .then(()=>{
        console.log("database synced");

        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((error)=>console.error("Error syncing database:",error))

