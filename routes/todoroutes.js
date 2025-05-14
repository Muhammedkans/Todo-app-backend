
const express = require("express");
const { createTodo, readTodo, updateTodo, deletedTodo } = require("../controller/todocontroller");
const userAuth = require("../middleware/userAuth");


const todoRoutes = express.Router();

todoRoutes.use(userAuth);

todoRoutes.post("/",createTodo);
todoRoutes.get("/", readTodo);
todoRoutes.put("/:id",updateTodo);
todoRoutes.delete("/:id",deletedTodo);


module.exports = todoRoutes;