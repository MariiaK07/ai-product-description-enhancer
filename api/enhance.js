export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Missing product description' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
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
          { role: 'user', content: description },
        ],
      }),
    });

    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content;

    res.status(200).json({ result: reply || '' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
