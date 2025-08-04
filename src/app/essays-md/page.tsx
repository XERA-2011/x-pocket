import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import fs from 'fs/promises';
import path from 'path';

// 此组件是一个异步函数，它会在服务器上构建时使用 Node.js 的 fs 模块直接读取 public/data/pet-essays.md 文件的内容。
async function MarkdownPreviewPage() {
  let markdownContent = '# 加载失败\n\n无法加载作文内容，请稍后重试。';

  try {
    // 构建文件的绝对路径
    const filePath = path.join(process.cwd(), 'public', 'data', 'pet-essays.md');
    // 异步读取文件内容
    markdownContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading pet-essays.md:', error);
    // 如果文件读取失败，将使用上面设置的默认错误信息
  }

  const components: Components = {
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-6 mb-1" {...props} />,
    p: ({ node, ...props }) => <p className="text-base leading-7 mb-2" {...props} />,
    ul: ({ node, ...props }) => <ul className="text-white/60 mb-4 list-none p-0" {...props} />,
    hr: ({ node, ...props }) => <hr className="my-8 border-gray-600" {...props} />,
  };

  return (
    <div className="mx-auto p-4 min-h-[75vh] max-w-4xl mt-[100px]">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown components={components}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default MarkdownPreviewPage;