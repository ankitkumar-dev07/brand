import List from '../models/List.js';

export async function lists(req, res) {
  res.json({
    lists: await List.find({
      user: req.user._id,
    })
      .sort({ updatedAt: -1 })
      .populate(
        'tools',
        'name slug category description'
      ),
  });
}

export async function getList(req, res) {
  const list = await List.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate('tools');

  if (!list) {
    return res
      .status(404)
      .json({
        message: 'List not found',
      });
  }

  res.json({ list });
}

export async function createList(req, res) {
  const list = await List.create({
    user: req.user._id,
    name: req.body.name,
    description: req.body.description,
  });

  res.status(201).json({ list });
}

export async function updateList(req, res) {
  const list = await List.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    {
      name: req.body.name,
      description: req.body.description,
    },
    {
      new: true,
    }
  );

  res.json({ list });
}

export async function deleteList(req, res) {
  await List.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  });

  res.json({
    message: 'List deleted',
  });
}

export async function addToList(req, res) {
  const list = await List.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    {
      $addToSet: {
        tools: req.params.toolId,
      },
    },
    {
      new: true,
    }
  ).populate('tools');

  if (!list) {
    return res
      .status(404)
      .json({
        message: 'List not found',
      });
  }

  res.json({ list });
}

export async function removeFromList(req, res) {
  const list = await List.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    {
      $pull: {
        tools: req.params.toolId,
      },
    },
    {
      new: true,
    }
  ).populate('tools');

  res.json({ list });
}