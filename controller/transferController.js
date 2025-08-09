const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Informe remetente, destinatário e valor' });
  }
  try {
    const result = transferService.transfer({ from, to, amount });
    if (result.error) {
      return res.status(400).json(result);
    }
    res.status(201).json(result.transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  res.json(transferService.getTransfers());
};
