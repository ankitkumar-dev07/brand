export function required(fields) {
  return (req, res, next) => {
    const missing = fields.filter(
      (f) =>
        !String(
          req.body?.[f] ?? ''
        ).trim()
    );

    if (missing.length) {
      return res
        .status(400)
        .json({
          message: `Missing required fields: ${missing.join(', ')}`,
        });
    }

    next();
  };
}