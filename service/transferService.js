const { transfers } = require('../model/transferModel');
const { findUserByUsername } = require('./userService');

function transfer({ from, to, amount }) {
  const sender = findUserByUsername(from);
  const recipient = findUserByUsername(to);
  if (!sender || !recipient) {
    return { error: 'Usuário remetente ou destinatário não encontrado' };
  }
  if (sender.saldo < amount) {
    return { error: 'Saldo insuficiente' };
  }
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    return { error: 'Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos' };
  }
  sender.saldo -= amount;
  recipient.saldo += amount;
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return { transfer };
}

function getTransfers() {
  return transfers;
}

module.exports = {
  transfer,
  getTransfers,
};
