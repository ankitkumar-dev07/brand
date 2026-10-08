import mongoose from 'mongoose';

export default mongoose.model(
  'SupportMessage',
  new mongoose.Schema(
    {
      name: String,
      email: String,
      subject: String,
      message: String,
      status: {
        type: String,
        default: 'open',
      },
    },
    {
      timestamps: true,
    }
  )
);