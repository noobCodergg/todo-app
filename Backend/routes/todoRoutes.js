const express = require('express');
const { createTodo, getTodos } = require('../controllers/todoController');
const { deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/createtodo',authMiddleware, createTodo);
router.get('/gettodo/:id', authMiddleware,  getTodos);
router.delete('/deletetodo/:id',authMiddleware, deleteTodo)
module.exports = router;
