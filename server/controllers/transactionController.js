import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  const userId = req.user.id;
  const teamId = req.user.teamId;

  const transactions = await Transaction.find({
    $or: [{ userId }, { teamId }]
  });

  res.json(transactions);
};

export const createTransaction = async (req, res) => {
  const { title, amount, type, date, category, recurring } = req.body;

  const transaction = await Transaction.create({
    title,
    amount,
    type,
    date,
    category,
    recurring,
    userId: req.user.id,
    teamId: req.user.teamId || null
  });

  res.status(201).json(transaction);
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.json({ message: 'Transaction deleted' });
};
