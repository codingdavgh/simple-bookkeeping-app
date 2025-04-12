import express from 'express';
import User from '../models/User.js'; // Correct ESModule import
import { authMiddleware } from '../middleware/auth.js'; // Correct ESModule import
const router = express.Router();

// GET /team/:teamId — Get all team members
router.get('/:teamId', authMiddleware, async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const members = await User.find({ teamId }).select('-password');
    res.json({ members });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team members' });
  }
});

// POST /team/invite — Add a user to the current user's team
router.post('/invite', authMiddleware, async (req, res) => {
  const { email } = req.body;

  try {
    const inviter = await User.findById(req.user.id);
    const userToInvite = await User.findOne({ email });

    if (!userToInvite) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToInvite.teamId = inviter.teamId;
    await userToInvite.save();

    res.json({ message: 'User added to your team' });
  } catch (err) {
    res.status(500).json({ message: 'Error inviting user to team' });
  }
});

export default router;
