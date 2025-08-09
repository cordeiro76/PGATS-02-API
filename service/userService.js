const { users } = require('../model/userModel');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function registerUser({ username, password, favorecidos = [] }) {
  if (findUserByUsername(username)) {
    return { error: 'Usuário já existe' };
  }
  const user = { username, password, favorecidos, saldo: 10000 };
  users.push(user);
  return { user };
}

function authenticateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return { error: 'Credenciais inválidas' };
  }
  return { user };
}

function getAllUsers() {
  return users;
}

module.exports = {
  findUserByUsername,
  registerUser,
  authenticateUser,
  getAllUsers,
};
