import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import {
  signToken,
  setAuthCookie,
} from '../utils/jwt.js';

export async function register(req, res) {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        message:
          'Name, email and password are required',
      });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({
        message:
          'Password must be at least 8 characters',
      });
  }

  if (await User.findOne({ email })) {
    return res
      .status(409)
      .json({
        message:
          'Email is already registered',
      });
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
  });

  setAuthCookie(
    res,
    signToken(user._id)
  );

  res.status(201).json({
    user: safe(user),
  });
}

export async function login(req, res) {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (
    !user ||
    !(await bcrypt.compare(
      req.body.password,
      user.password
    ))
  ) {
    return res
      .status(401)
      .json({
        message: 'Invalid email or password',
      });
  }

  setAuthCookie(
    res,
    signToken(user._id)
  );

  res.json({
    user: safe(user),
  });
}

export function logout(req, res) {
  res.clearCookie('token');

  res.json({
    message: 'Logged out',
  });
}

export async function me(req, res) {
  res.json({
    user: safe(req.user),
  });
}

export async function forgotPassword(req, res) {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    const token = crypto
      .randomBytes(24)
      .toString('hex');

    user.resetToken = token;
    user.resetExpires =
      Date.now() + 15 * 60 * 1000;

    await user.save();
  }

  res.json({
    message:
      'If the email exists, reset instructions were generated.',
  });
}

export async function resetPassword(req, res) {
  const user = await User.findOne({
    resetToken: req.body.token,
    resetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({
        message:
          'Invalid or expired reset token',
      });
  }

  user.password = await bcrypt.hash(
    req.body.password,
    12
  );

  user.resetToken = undefined;
  user.resetExpires = undefined;

  await user.save();

  res.json({
    message: 'Password updated',
  });
}

function safe(u) {
  return {
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    plan: u.plan,
    subscriptionStatus:
      u.subscriptionStatus,
    subscriptionStart:
      u.subscriptionStart,
    subscriptionEnd:
      u.subscriptionEnd,
  };
}