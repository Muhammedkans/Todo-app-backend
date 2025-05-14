const express = require("express");
const {rejister, login} = require("../controller/authcontroller");


const userRouter = express.Router();

userRouter.post("/register",rejister);
userRouter.post("/login",login);


module.exports = userRouter;