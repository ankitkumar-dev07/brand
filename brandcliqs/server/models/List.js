import mongoose from 'mongoose';

export default mongoose.model(
  'List',
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: String,
      tools: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tool',
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);