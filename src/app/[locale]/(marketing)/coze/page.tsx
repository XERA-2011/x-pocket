'use client';
import { useState } from 'react';

export default function CozeApiPage() {
  // 状态管理
  const [formData, setFormData] = useState({
    token: '',
    botId: '',
    message: '你好，请介绍一下自己',
  });
  // 已移除 response 状态
  const [aiReply, setAiReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pollingStatus, setPollingStatus] = useState('');

  // 已不再需要轮询配置，移除 POLL_CONFIG

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 流式处理AI回复
  const streamCozeReply = async () => {
    if (!formData.token || !formData.botId) {
      setError('Token和Bot ID不能为空');
      return;
    }

    setLoading(true);
    setError('');
    setAiReply('');
    setPollingStatus('');

    try {
      const apiUrl = 'https://api.coze.cn/v3/chat';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${formData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_id: formData.botId,
          user_id: 'nextjs_client_user',
          stream: true,
          auto_save_history: true,
          additional_messages: [
            {
              role: 'user',
              content: formData.message,
              content_type: 'text',
              type: 'question',
            },
          ],
        }),
        signal: AbortSignal.timeout(10000),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      // aiText 未使用，移除
      // 已移除 rawText 相关逻辑
      setPollingStatus('AI正在流式响应...');

      if (!reader) {
        setPollingStatus('AI响应失败');
        return;
      }
      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (!value) {
          continue;
        }
        const chunk = decoder.decode(value);
        const lines = chunk.split(/\r?\n/);
        for (const line of lines) {
          if (!line.startsWith('data:')) {
            continue;
          }
          const dataStr = line.replace('data:', '').trim();
          if (!dataStr || dataStr === '[DONE]') {
            continue;
          }
          try {
            const dataObj = JSON.parse(dataStr);
            if (dataObj.role === 'assistant' && dataObj.type === 'answer' && dataObj.content) {
              setAiReply(prev => prev + dataObj.content);
            }
          } catch {}
        }
      }
      setPollingStatus('AI响应已完成');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error('流式处理错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 按钮直接调用流式处理
  const callCozeApi = streamCozeReply;

  return (
    <div className="min-h-screen flex flex-col items-center px-2 py-4 transition-colors duration-200">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="border-2 border-neutral-700 rounded p-6 bg-neutral-900 shadow flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-center text-neutral-100 mb-2">COZE</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              callCozeApi();
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="token" className="font-semibold text-neutral-300">API Token</label>
              <input
                id="token"
                type="text"
                name="token"
                value={formData.token}
                onChange={handleInputChange}
                placeholder="请输入扣子API Token"
                className="w-full px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-neutral-100 focus:outline-none focus:border-white"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="botId" className="font-semibold text-neutral-300">Bot ID</label>
              <input
                id="botId"
                type="text"
                name="botId"
                value={formData.botId}
                onChange={handleInputChange}
                placeholder="请输入智能体Bot ID"
                className="w-full px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-neutral-100 focus:outline-none focus:border-white"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-semibold text-neutral-300">消息内容</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="请输入要发送的消息"
                className="w-full h-24 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-neutral-100 resize-vertical focus:outline-none focus:border-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded bg-white text-neutral-900 font-semibold transition hover:bg-neutral-200 border border-neutral-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? '调用中...' : '发送请求'}
            </button>
            {pollingStatus && (
              <div className="text-center text-sm text-neutral-400 mt-2">{pollingStatus}</div>
            )}
          </form>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2">
              ⚠️
              {' '}
              {error}
            </div>
          )}
          {aiReply && (
            <div className="bg-green-100 border border-green-400 text-green-900 px-4 py-3 rounded mb-2">
              <h2 className="font-bold text-green-800 mb-2">AI回复内容</h2>
              <div className="whitespace-pre-wrap leading-relaxed">{aiReply}</div>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-neutral-400 bg-neutral-900 border border-neutral-700 rounded p-4">
          <h3 className="font-bold text-neutral-300 mb-2">使用说明</h3>
          <ul className="list-disc pl-5 mb-0">
            <li>Token和Bot ID可在扣子平台获取</li>
            <li>免费版API每日限100次调用</li>
            <li>请勿在公共网络环境下泄露你的Token</li>
            <li>API响应可能需要几秒到几十秒不等，请耐心等待</li>
            <li>响应结果将以格式化文本和原始JSON两种形式展示</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
