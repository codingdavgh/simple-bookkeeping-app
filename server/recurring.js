import cron from 'node-cron';
import Transaction from './models/Transaction.js';

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  const now = new Date();

  const dueTransactions = await Transaction.find({
    'recurring.nextDate': { $lte: now }
  });

  for (let tx of dueTransactions) {
    const newDate = getNextDate(tx.recurring.interval, tx.recurring.nextDate);

    // Create a copy with new date
    await Transaction.create({
      title: tx.title,
      amount: tx.amount,
      type: tx.type,
      date: tx.recurring.nextDate,
      category: tx.category,
      userId: tx.userId,
      teamId: tx.teamId,
      recurring: tx.recurring
    });

    // Update the nextDate on the original recurring transaction
    tx.recurring.nextDate = newDate;
    await tx.save();
  }

  console.log('✅ Recurring transactions processed');
});

// Helper function
function getNextDate(interval, fromDate) {
  const next = new Date(fromDate);
  if (interval === 'daily') next.setDate(next.getDate() + 1);
  if (interval === 'weekly') next.setDate(next.getDate() + 7);
  if (interval === 'monthly') next.setMonth(next.getMonth() + 1);
  return next;
}
