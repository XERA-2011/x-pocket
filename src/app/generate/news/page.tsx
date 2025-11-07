import React from 'react';
import { type Components } from 'react-markdown';
import { readMarkdownFile } from '@/utils/markdown';
import { MarkdownPage } from '@/components/MarkdownPage';

async function NewsPage() {
  const markdownContent = await readMarkdownFile(
    'daily-news.md',
    '# 加载失败\n\n无法加载新闻内容，请稍后重试。'
  );

  // 自定义 h1 样式（居中显示）
  const customComponents: Components = {
    h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-6 text-center" {...props} />,
  };

  return (
    <MarkdownPage
      content={markdownContent}
      maxWidth="max-w-5xl"
      customComponents={customComponents}
    />
  );
}

export default NewsPage;