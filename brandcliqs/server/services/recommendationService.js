import Tool from '../models/Tool.js';

export async function getRecommendations(query) {
  const text = String(query || '').trim();

  if (!text) {
    return [];
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const { default: OpenAI } = await import('openai');

      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const catalog = await Tool.find()
        .select('name category description tags')
        .limit(250)
        .lean();

      const prompt = `Need: ${text}\nCatalog: ${JSON.stringify(
        catalog
      )}\nReturn JSON only: {"names":["tool name"]}, up to 6 exact catalog names.`;

      const out =
        await client.chat.completions.create({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          response_format: {
            type: 'json_object',
          },
          messages: [
            {
              role: 'system',
              content:
                'Recommend only products from the supplied catalog.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        });

      const names =
        JSON.parse(
          out.choices[0].message.content
        ).names || [];

      const ai = await Tool.find({
        name: {
          $in: names,
        },
      });

      if (ai.length) {
        return {
          items: ai,
          source: 'ai',
        };
      }
    } catch (e) {
      console.warn(
        'AI fallback:',
        e.message
      );
    }
  }

  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2);

  let items = await Tool.find({
    $or: [
      {
        name: {
          $regex: words.join('|'),
          $options: 'i',
        },
      },
      {
        description: {
          $regex: words.join('|'),
          $options: 'i',
        },
      },
      {
        tags: {
          $in: words,
        },
      },
    ],
  }).limit(8);

  if (!items.length) {
    const c =
      text.toLowerCase().includes('crm') ||
      text.toLowerCase().includes('sales')
        ? 'Marketing'
        : text
              .toLowerCase()
              .includes('finance')
          ? 'Finance'
          : text
                .toLowerCase()
                .includes('design')
            ? 'Design'
            : text
                  .toLowerCase()
                  .includes('developer')
              ? 'Development'
              : 'AI';

    items = await Tool.find({
      category: c,
    }).limit(8);
  }

  return {
    items,
    source: 'rule-based',
  };
}