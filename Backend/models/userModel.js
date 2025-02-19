const db = require('../db');
module.exports = {
  createUser: (user) => db('users').insert(user),
  findByEmail: (email) => db('users').where({ email }).first()
};