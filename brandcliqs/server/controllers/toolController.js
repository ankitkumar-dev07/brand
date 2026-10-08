import Tool from '../models/Tool.js';

export async function listTools(req, res) {
  const {
    search,
    category,
    industry,
    audience,
    pricingType,
    isPro,
    featured,
    ids,
  } = req.query;

  const q = {};

  if (search) {
    q.$or = [
      {
        name: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        description: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        tags: {
          $regex: search,
          $options: 'i',
        },
      },
    ];
  }

  if (category) {
    q.category = category;
  }

  if (industry) {
    q.industry = industry;
  }

  if (audience) {
    q.audience = {
      $in: [
        audience,
        'Both',
        'Businesses · Individuals',
      ],
    };
  }

  if (pricingType) {
    q.pricingType = pricingType;
  }

  if (
    isPro !== undefined &&
    isPro !== ''
  ) {
    q.isPro = isPro === 'true';
  }

  if (featured) {
    q.featured = featured === 'true';
  }

  if (ids) {
    q._id = {
      $in: ids.split(','),
    };
  }

  const page = Math.max(
    1,
    Number(req.query.page || 1)
  );

  const limit = Math.min(
    60,
    Math.max(
      1,
      Number(req.query.limit || 24)
    )
  );

  const [
    tools,
    total,
  ] = await Promise.all([
    Tool.find(q)
      .sort({
        featured: -1,
        name: 1,
      })
      .skip((page - 1) * limit)
      .limit(limit),

    Tool.countDocuments(q),
  ]);

  res.json({
    tools,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}

export async function getTool(req, res) {
  const tool = await Tool.findOne({
    slug: req.params.slug,
  });

  if (!tool) {
    return res
      .status(404)
      .json({
        message: 'Tool not found',
      });
  }

  res.json({ tool });
}