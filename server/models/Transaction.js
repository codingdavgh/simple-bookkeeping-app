import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String, // income | expense
  date: Date,
  category: String,
  recurring: {
    interval: String, // daily, weekly, monthly
    nextDate: Date
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

export default mongoose.model('Transaction', transactionSchema);
