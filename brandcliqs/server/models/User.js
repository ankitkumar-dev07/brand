import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    subscriptionStatus: {
      type: String,
      default: 'inactive',
    },
    subscriptionStart: Date,
    subscriptionEnd: Date,
    resetToken: String,
    resetExpires: Date,
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'User',
  schema
);