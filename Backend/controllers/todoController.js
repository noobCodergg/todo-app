const todoModel = require('../models/todoModel');
module.exports = {
  createTodo: async (req, res) => {
    const { task,userId } = req.body;
    console.log(task,userId)
    await todoModel.createTodo({ user_id: userId, task });
    res.status(201).json({ message: 'Todo added' });
  },
  getTodos: async (req, res) => {
    const userId=(req.params.id)
    const todos = await todoModel.getUserTodos(userId);
    res.status(200).json(todos);
  },

  deleteTodo: async (req, res) => {
    const id=req.params.id
    console.log(id)
    const todos = await todoModel.deleteTodo(id);
    res.status(200).json(todos);
  }
};