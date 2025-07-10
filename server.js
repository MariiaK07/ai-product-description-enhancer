import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.post('/api/enhance', async (req, res) => {
  const { input, tone } = req.body

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that improves product descriptions using a ${tone} tone.`,
        },
        {
          role: 'user',
          content: `Enhance this product description:\n\n${input}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    })

    const result = completion.choices[0].message.content
    res.json({ result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
