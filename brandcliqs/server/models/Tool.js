import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    logo: String,
    category: String,
    subcategory: String,
    industry: String,
    audience: String,
    website: String,
    pricingType: String,
    price: String,
    features: [String],
    tags: [String],
    rating: {
      type: Number,
      default: 4.5,
    },
    featured: Boolean,
    isPro: Boolean,
    freePlan: Boolean,
    integrations: [String],
    aiCapabilities: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'Tool',
  schema
);