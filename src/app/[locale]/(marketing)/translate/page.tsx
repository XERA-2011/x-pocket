'use client';
import { useState } from 'react';
import { FaLanguage } from 'react-icons/fa';

export default function TranslatePage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('等待翻译...');

  // 示例翻译：字符反转
  const handleTranslate = () => {
    setResult(input ? input.split('').reverse().join('') : '请输入内容');
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-2 py-8">
      <div className="container max-w-md w-full flex flex-col gap-6">
        {/* 标题 */}
        <header className="text-center py-6 rounded mb-0">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <FaLanguage />
            {' '}
            翻译器
          </h2>
        </header>
        {/* 输入卡片 */}
        <div className="card rounded-xl shadow p-6 flex flex-col gap-3 bg-neutral-900">
          <h2 className="text-base font-semibold mb-1">输入文本</h2>
          <textarea
            className="w-full min-h-[80px] resize-y rounded-md border border-neutral-700 p-2 text-base mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="输入要翻译的文本..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="border border-neutral-700 rounded px-4 py-1 text-base font-medium hover:bg-neutral-800 transition"
              onClick={handleTranslate}
              type="button"
            >
              翻译
            </button>
          </div>
        </div>
        {/* 结果卡片 */}
        <div className="card rounded-xl shadow p-6 flex flex-col gap-3 bg-neutral-900">
          <h2 className="text-base font-semibold mb-1">翻译结果</h2>
          <div className="output min-h-[40px] rounded-md p-2 text-base bg-neutral-900 border border-neutral-700">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}
