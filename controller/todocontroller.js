const mongoose = require("mongoose")
const Todo = require("../models/todomodel");
const express = require("express");
const createTodo = async(req, res) =>{
   try{
    const {title }  = req.body;

     if(!title||title.trim()=== ""){
      throw new Error(" title is required");
     }

     const newTodo =  new Todo({
      title:title.trim(),
      user:req.user._id,
     });

     if(!newTodo){
      throw new Error(" something went wrong for this new todo");
     }

     await newTodo.save();

     res.status(201).json({message: "succefully created a todo",newTodo})
   }
   catch(err){
      console.log(err.message);
    res.status(404).send(" invalid credentials")
   }

}


const readTodo = async (req, res) =>{
   
try{
const loggedInUser = req.user._id;

const todo = await Todo.find({user:loggedInUser});
console.log(todo)
if(!todo){
throw new Error(" not found any todos");
}
 
res.status(201).json({message:"succefully read ",todo});
console.log("success");
}catch(err){
 res.status(404).json({errMessage:"something went wrong",err})
}

}


const updateTodo = async (req, res)=>{

   try{
  const {id} = req.params;
  
   if(!mongoose.Types.ObjectId.isValid(id)){
      throw new Error(" invalid crendentials- id ")
   }

   const todo = await Todo.findOne({_id:id , user:req.user._id});

   if(!todo){
      throw new Error(" onvalid credential no todo");
   }



   
    const {title , completed} =req.body;

    if(title !== undefined && typeof title !== "string" ){
      throw new Error("title must be a string");
    }
   
    if (completed !== undefined && typeof completed !== "boolean") {
     throw new Error("Completed must be true or false");
   }
   todo.title = title ?? todo.title;
   todo.completed= completed  ?? todo.completed;
    
   await todo.save();

   res.status(201).json({message:"todo updated succefully" , todo})
   }catch(err){
   console.log(err);
   res.status(404).json({errorMessage:" check again not updated"});
   }

}

const deletedTodo = async (req,res)=>{
    
   try{
    
      const {id} = req.params;
   
      if(!mongoose.Types.ObjectId.isValid(id)){
         throw new Error(" error happening");
      }

      const todo  = await Todo.findByIdAndDelete({_id:id, user:req.user._id });

      if(!todo){
         throw new Error(" deleted id not found ")
      }

      res.status(201).json({message: "delete succesully"})

   }catch(err){
       console.error(err);
      res.status(404).json({errorMessage:"erro happeing"});

   }
}




module.exports = {
   createTodo,
   readTodo,
   updateTodo,
   deletedTodo,
};


