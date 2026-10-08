import mongoose from 'mongoose';

export default mongoose.model(
  'Subscription',
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      plan: {
        type: String,
        enum: ['free', 'pro'],
      },
      status: String,
      startDate: Date,
      endDate: Date,
      provider: {
        type: String,
        default: 'mock',
      },
    },
    {
      timestamps: true,
    }
  )
);