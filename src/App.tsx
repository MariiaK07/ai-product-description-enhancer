import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('Friendly')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const tones = ['Friendly', 'Professional', 'Persuasive']

  async function enhanceDescription(description: string, tone: string) {
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, tone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      return data.result;
    } catch (error: any) {
      console.error('Enhancement error:', error.message);
      return `⚠️ Error: ${error.message}`;
    }
  }

  const handleClick = async () => {
    setLoading(true)
    const enhanced = await enhanceDescription(input, tone)
    setResult(enhanced)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>AI Description Enhancer</h1>
      <textarea
        rows={6}
        placeholder="Paste your product description..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ marginBottom: 10 }}>
        {tones.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Enhancing...' : 'Enhance'}
      </button>

      {result && (
        <>
          <h3>Enhanced:</h3>
          <div style={{ whiteSpace: 'pre-wrap', background: '#f0f0f0', padding: 10 }}>
            {result}
          </div>
        </>
      )}
    </div>
  )
}

export default App
