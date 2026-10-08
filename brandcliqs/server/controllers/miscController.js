import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import SupportMessage from '../models/SupportMessage.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';

export async function subscribe(req, res) {
  const email = String(
    req.body.email || ''
  )
    .trim()
    .toLowerCase();

  if (!email) {
    return res
      .status(400)
      .json({
        message: 'Email is required',
      });
  }

  try {
    await NewsletterSubscriber.create({ email });
  } catch (e) {
    if (e.code !== 11000) {
      throw e;
    }
  }

  res.status(201).json({
    message: 'Subscribed',
  });
}

export async function support(req, res) {
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  if (
    !name ||
    !email ||
    !subject ||
    !message
  ) {
    return res
      .status(400)
      .json({
        message: 'All fields are required',
      });
  }

  await SupportMessage.create({
    name,
    email,
    subject,
    message,
  });

  res.status(201).json({
    message: 'Support request received',
  });
}

export async function upgrade(req, res) {
  const start = new Date();
  const end = new Date(start);

  end.setMonth(
    end.getMonth() + 1
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      plan: 'pro',
      subscriptionStatus: 'active',
      subscriptionStart: start,
      subscriptionEnd: end,
    },
    {
      new: true,
    }
  );

  await Subscription.create({
    user: user._id,
    plan: 'pro',
    status: 'active',
    startDate: start,
    endDate: end,
  });

  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      plan: user.plan,
      subscriptionStatus:
        user.subscriptionStatus,
    },
  });
}

export async function subscription(req, res) {
  const s = await Subscription.findOne({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.json({
    subscription: s,
  });
}

export async function cancel(req, res) {
  const user =
    await User.findByIdAndUpdate(
      req.user._id,
      {
        plan: 'free',
        subscriptionStatus: 'cancelled',
      },
      {
        new: true,
      }
    );

  await Subscription.findOneAndUpdate(
    {
      user: user._id,
      status: 'active',
    },
    {
      status: 'cancelled',
    }
  );

  res.json({ user });
}