import User from '../models/User.js';
import Tool from '../models/Tool.js';
import RecentlyViewed from '../models/RecentlyViewed.js';

export async function favorites(req, res) {
  const u = await User.findById(
    req.user._id
  ).populate('favorites');

  res.json({
    favorites: u.favorites,
  });
}

export async function addFavorite(req, res) {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        favorites: req.params.toolId,
      },
    }
  );

  res.status(201).json({
    message: 'Favorite added',
  });
}

export async function removeFavorite(req, res) {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        favorites: req.params.toolId,
      },
    }
  );

  res.json({
    message: 'Favorite removed',
  });
}

export async function addRecentlyViewed(
  req,
  res
) {
  await RecentlyViewed.findOneAndUpdate(
    {
      user: req.user._id,
      tool: req.params.toolId,
    },
    {
      user: req.user._id,
      tool: req.params.toolId,
      viewedAt: new Date(),
    },
    {
      upsert: true,
      new: true,
    }
  );

  res.status(201).json({
    message: 'Recorded',
  });
}

export async function recentlyViewed(
  req,
  res
) {
  const items = await RecentlyViewed.find({
    user: req.user._id,
  })
    .sort({ viewedAt: -1 })
    .limit(12)
    .populate('tool');

  res.json({
    items,
  });
}