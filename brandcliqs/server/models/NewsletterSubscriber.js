import mongoose from 'mongoose';

export default mongoose.model(
  'NewsletterSubscriber',
  new mongoose.Schema(
    {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  )
);