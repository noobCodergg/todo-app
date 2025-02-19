const db = require('../db');
module.exports = {
  createTodo: (todo) => db('todos').insert(todo),
  getUserTodos: (userId) => db('todos').where({ user_id: userId }),
  deleteTodo: (todoId) => db('todos').where({id: todoId}).del()
};