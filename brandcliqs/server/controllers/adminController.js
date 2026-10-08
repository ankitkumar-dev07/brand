import User from '../models/User.js';
import Tool from '../models/Tool.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import SupportMessage from '../models/SupportMessage.js';
import Subscription from '../models/Subscription.js';
import { slugify } from '../utils/slug.js';

export async function stats(req, res) {
  const [
    users,
    tools,
    subscribers,
    supportMessages,
    subscriptions,
  ] = await Promise.all([
    User.countDocuments(),
    Tool.countDocuments(),
    NewsletterSubscriber.countDocuments(),
    SupportMessage.countDocuments(),
    Subscription.countDocuments(),
  ]);

  res.json({
    users,
    tools,
    subscribers,
    supportMessages,
    subscriptions,
  });
}

export async function createTool(req, res) {
  const body = {
    ...req.body,
    slug: slugify(req.body.name),
    features:
      req.body.features || [
        'Core workflow',
        'Integrations',
        'Analytics',
      ],
    tags:
      req.body.tags || [
        String(req.body.category || 'SaaS').toLowerCase(),
      ],
    rating: req.body.rating || 4.5,
    website:
      req.body.website || 'https://example.com',
  };

  const tool = await Tool.create(body);

  res.status(201).json({ tool });
}

export async function updateTool(req, res) {
  const tool = await Tool.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!tool) {
    return res
      .status(404)
      .json({ message: 'Tool not found' });
  }

  res.json({ tool });
}

export async function deleteTool(req, res) {
  await Tool.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Tool deleted',
  });
}

export async function users(req, res) {
  res.json({
    users: await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(100),
  });
}

export async function subscribers(req, res) {
  res.json({
    subscribers: await NewsletterSubscriber.find().sort({
      createdAt: -1,
    }),
  });
}

export async function messages(req, res) {
  res.json({
    messages: await SupportMessage.find().sort({
      createdAt: -1,
    }),
  });
}

export async function subscriptions(req, res) {
  res.json({
    subscriptions: await Subscription.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email'),
  });
}