import mongoose from 'mongoose';

export default mongoose.model(
  'RecentlyViewed',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tool: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
  })
);