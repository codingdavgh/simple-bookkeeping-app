import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

export default mongoose.model('User', userSchema);
