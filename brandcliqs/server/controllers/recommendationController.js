import { getRecommendations } from '../services/recommendationService.js';

export async function recommend(req, res) {
  const query = String(
    req.body.query || ''
  ).trim();

  if (!query) {
    return res
      .status(400)
      .json({
        message: 'Query is required',
      });
  }

  const {
    items,
    source,
  } = await getRecommendations(query);

  res.json({
    recommendations: items,
    source,
  });
}