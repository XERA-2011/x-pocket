import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import fs from 'fs/promises';
import path from 'path';

// 此组件是一个异步函数，它会在服务器上构建时使用 Node.js 的 fs 模块直接读取 public/data/daily-news.md 文件的内容。
async function NewsPage() {
  let markdownContent = '# 加载失败\n\n无法加载新闻内容，请稍后重试。';

  try {
    // 构建文件的绝对路径
    const filePath = path.join(process.cwd(), 'public', 'data', 'daily-news.md');
    // 异步读取文件内容
    markdownContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading daily-news.md:', error);
    // 如果文件读取失败，将使用上面设置的默认错误信息
  }

  const components: Components = {
    h1: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <h1 className="text-3xl font-bold mb-6 text-center" {...safeProps}>{children}</h1>;
    },
    h2: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <h2 className="text-xl font-semibold mt-6 mb-3" {...safeProps}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <h3 className="text-lg font-medium mt-4 mb-2" {...safeProps}>{children}</h3>;
    },
    p: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <p className="text-base leading-7 mb-2" {...safeProps}>{children}</p>;
    },
    ul: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <ul className="text-white/80 mb-4 list-none p-0" {...safeProps}>{children}</ul>;
    },
    li: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <li className="mb-1 pl-0" {...safeProps}>{children}</li>;
    },
    hr: ({ ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <hr className="my-6 border-gray-500" {...safeProps} />;
    },
    a: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return (
        <a
          className="text-blue-400 hover:text-blue-300 underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          {...safeProps}
        >
          {children}
        </a>
      );
    },
    strong: ({ children, ...props }) => {
      const { ref, key, node, ...safeProps } = props as any;
      return <strong className="font-semibold text-white" {...safeProps}>{children}</strong>;
    },
  };

  return (
    <div className="mx-auto p-6 min-h-[75vh] max-w-5xl mt-[100px] mx-[10px] bg-white/10 rounded-[24px]">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown components={components}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default NewsPage;