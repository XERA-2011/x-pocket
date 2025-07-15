'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [models, setModels] = useState<Array<{ name: string }>>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('等待调用...');
  const [displayedResult, setDisplayedResult] = useState('等待调用...');
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    if (!apiKey) {
      return;
    }
    fetchModels(apiKey);
  }, [apiKey, fetchModels]);

  // 打字机效果：逐字显示 result
  useEffect(() => {
    if (typeof result !== 'string') {
      return;
    }
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    let i = 0;
    // 先清空再开始打字机效果，避免直接setState
    const timeoutId = setTimeout(() => {
      setDisplayedResult('');
      typingIntervalRef.current = setInterval(() => {
        setDisplayedResult((_) => {
          if (i >= result.length) {
            if (typingIntervalRef.current) {
              clearInterval(typingIntervalRef.current);
            }
            return result;
          }
          const next = result.slice(0, i + 1);
          i++;
          return next;
        });
      }, 18);
    }, 0);

    // 清理定时器和timeout
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      clearTimeout(timeoutId);
    };
  }, [result]);

  const handleGenerate = async () => {
    if (!apiKey || !prompt || !selectedModel) {
      setResult('请填写 API Key，选择模型并输入 Prompt');
      return;
    }
    setResult('请求中，请稍候……');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`,
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
      // 只显示AI返回的内容
      let aiText = '';
      if (json.candidates && Array.isArray(json.candidates) && json.candidates[0]?.content?.parts?.[0]?.text) {
        aiText = json.candidates[0].content.parts[0].text;
      } else if (json.candidates && Array.isArray(json.candidates) && json.candidates[0]?.content?.parts?.[0]) {
        aiText = json.candidates[0].content.parts[0];
      } else {
        aiText = JSON.stringify(json, null, 2);
      }
      setResult(aiText);
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
        placeholder="请输入 Google API Key"
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
        className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded shadow hover:shadow-md transition bg-white text-black font-semibold"
      >
        <span className="flex items-center">
          <FiSend className="h-5 w-5 mr-1" />
          发送请求
        </span>
      </button>

      <h2 className="mt-6 mb-2">Response:</h2>
      <pre className="p-4 rounded overflow-x-auto mb-4 whitespace-pre-wrap">{displayedResult}</pre>
    </div>
  );
}
