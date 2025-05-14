const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

 const rejister = async(req, res)=>{

try{
  const {name, email , password} =req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

  
 const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

  const hashedPassword = await bcrypt.hash(password,10);
  const newUser = new User({
    name,
    email,
    password:hashedPassword,
  });
   
  if(!newUser){
    throw new Error("error happening");
  }
  await newUser.save();
  
  const token  = await jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"});

  res.status(201).json({message:" user added succesully", user:{id:newUser._id, name:newUser.name,email:newUser.email} ,token});
  console.log(newUser)

}catch(err){
  console.error(err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
}
  
}

const login = async (req,res)=>{
  try{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
       return res.status(404).json({ message: "User not found" });
    }

    const passwordcompare = await bcrypt.compare(password,user.password);

    if(!passwordcompare){
      return res.status(401).json({ message: "Incorrect password" });
    }   

   const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

   res.status(201).json({message: "user loggin succesufully",user:{id:user._id, email:user.email, name:user.name},token});
    
  }catch(err){
     res.status(500).json({ message: "Internal Server Error" });
  }
  
}

module.exports = {rejister,login};


