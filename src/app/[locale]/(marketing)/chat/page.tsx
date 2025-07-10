// app/[locale]/ai/page.tsx
'use client';

// import { useTranslations } from 'next-intl';
import { Suspense, useState } from 'react';

export default function AIPage() {
  // const t = useTranslations('AI');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch('/api/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const json = await res.json();
      if (res.ok) {
        setResponse(json.text);
      } else {
        setResponse(`Error: ${json.error}`);
      }
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="prompt_placeholder"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'generating' : 'generate'}
        </button>
      </form>

      <div className="mt-6 max-w-xl mx-auto">
        <Suspense fallback={<p className="italic">loading_response</p>}>
          {response && (
            <div className="p-4 bg-gray-100 border rounded whitespace-pre-wrap">
              <strong>response_label</strong>
              <p>{response}</p>
            </div>
          )}
        </Suspense>
      </div>
    </>
  );
}
