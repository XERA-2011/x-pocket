import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

interface MarkdownPageProps {
  content: string;
  maxWidth?: 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl';
  customComponents?: Components;
}

/**
 * 通用的 Markdown 页面组件
 * 提供默认的样式和布局，支持自定义组件覆盖
 */
export function MarkdownPage({
  content,
  maxWidth = 'max-w-4xl',
  customComponents
}: MarkdownPageProps) {
  // 默认的 Markdown 组件样式
  const defaultComponents: Components = {
    h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    h2: ({ ...props }) => <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />,
    h3: ({ ...props }) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
    p: ({ ...props }) => <p className="text-base leading-7 mb-2" {...props} />,
    ul: ({ ...props }) => <ul className="text-white/80 mb-4 list-none p-0" {...props} />,
    li: ({ ...props }) => <li className="mb-1 pl-0" {...props} />,
    hr: ({ ...props }) => <hr className="my-6 border-gray-500" {...props} />,
    a: ({ ...props }) => (
      <a
        className="text-blue-400 hover:text-blue-300 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    strong: ({ ...props }) => <strong className="font-semibold text-white" {...props} />,
  };

  // 合并自定义组件和默认组件
  const components = { ...defaultComponents, ...customComponents };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className={`mx-auto ${maxWidth} bg-white/10 rounded-3xl p-6 md:p-8`}>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown components={components}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
