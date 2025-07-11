'use client';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [models, setModels] = useState<Array<{ name: string }>>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('等待调用...');

  // Fetch models function extracted to avoid direct state setting in useEffect
  const fetchModels = useCallback(async (key: string) => {
    setLoadingModels(true);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`,
      );
      const data = await res.json();
      if (Array.isArray(data.models)) {
        setModels(data.models);
        setSelectedModel(data.models[0]?.name || '');
      }
    } catch (err) {
      console.error('加载模型出错', err);
    } finally {
      setLoadingModels(false);
    }
  }, []);

  // Load available models when apiKey changes
  useEffect(() => {
    const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!key) {
      return;
    }
    fetchModels(key);
  }, [apiKey, fetchModels]);

  const handleGenerate = async () => {
    const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!key || !prompt || !selectedModel) {
      setResult('请填写 API Key，选择模型并输入 Prompt');
      return;
    }
    setResult('请求中，请稍候……');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: prompt }] },
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 256 },
          }),
        },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const json = await res.json();
      setResult(JSON.stringify(json, null, 2));
    } catch (err) {
      if (err instanceof Error) {
        setResult(`调用失败：\n${err.message}`);
      } else {
        setResult('调用失败：未知错误');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">Google Gemini 模型测试</h2>

      <label htmlFor="api-key-input" className="block mb-1">API Key：</label>
      <input
        id="api-key-input"
        type="text"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="输入 API Key 或设置 NEXT_PUBLIC_GOOGLE_API_KEY"
        className="w-full p-2 border rounded mb-4"
      />

      <div className="mb-4">
        <label htmlFor="model-select" className="block mb-1">选择模型：</label>
        {loadingModels
          ? (
              <p>正在加载模型列表…</p>
            )
          : (
              <select
                id="model-select"
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="w-full p-2 border rounded bg-black"
              >
                {models.map(m => (
                  <option key={m.name} value={m.name}>
                    {m.name.replace(/^models\//, '')}
                  </option>
                ))}
              </select>
            )}
      </div>

      <label htmlFor="prompt-textarea" className="block mb-1">Prompt：</label>
      <textarea
        id="prompt-textarea"
        rows={4}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="输入你要发送的提示"
        className="w-full p-2 border rounded mb-4"
      />

      <button
        type="button"
        onClick={handleGenerate}
        className="px-4 py-2 rounded shadow hover:shadow-md transition"
      >
        发送请求
      </button>

      <h2 className="mt-6 mb-2">Response:</h2>
      <pre className="p-4 rounded overflow-x-auto mb-4">{result}</pre>
    </div>
  );
}
