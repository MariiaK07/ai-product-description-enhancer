export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Only POST requests allowed' });
  }

  const { description, tone } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ error: 'Missing product description' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const prompt = `Please rewrite this product description in a ${tone || 'Friendly'} tone:\n\n${description}`;

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a product description enhancer.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await completion.json();

    if (!completion.ok) {
      return res
        .status(completion.status)
        .json({ error: data.error?.message || 'OpenAI error' });
    }

    const reply = data.choices?.[0]?.message?.content || '';

    return res
      .status(200)
      .json({ result: reply });
  } catch (err) {
    console.error('API Error:', err);
    return res
      .status(500)
      .json({ error: 'Server error' });
  }
}
