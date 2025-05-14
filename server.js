
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database/dBconnect");
const  dontenv = require("dotenv");
dontenv.config();
const userRouter = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoroutes");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use("/user",userRouter);
app.use("/todo", todoRoutes);




app.get("/",(req, res)=>{
  console.log("hahah");
res.send("hahahaha");

})

connectDB().then(()=>{
  console.log("database connection successful");
  app.listen(7777, ()=>{
    console.log("server listen on port 7777");
  });
}).catch((err)=>{
console.log(err);
})




