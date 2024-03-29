const User=require('../models/User');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken')


exports.signupUser= async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser=await User.findOne({where:{email}});

        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }
        const hashedPassword= await bcrypt.hash(password,10);
        await User.create({
            name,email,password:hashedPassword
        });
        res.status(201).json({message:"User Created Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Cant create the user"})
    }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    
    const token = jwt.sign(
      { userId: existingUser.id },
      "secrettoken" 
    );

    return res.status(200).json({ message: "User login successfully", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

