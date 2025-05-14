const express = require("express");
const jwt  = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
   try{
    const token  = req.headers.authorization?.split(" ")[1];

    if(!token){
      throw new Error("please loggin");
    }
  
    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
    
    if(!decoded){
      throw new Error("please login");
    }
    
    const {id} = decoded;   
  
    const user = await User.findById(id);
    if(!user){
      throw new Error(" no user found");
    }
  
    req.user = user;
  
    next();
   }catch(err){
    console.log(err)
     res.status(404).json({message:"ivalid credential"});
   }
  
}




module.exports = userAuth;
