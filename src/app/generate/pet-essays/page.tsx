import React from 'react';
import { readMarkdownFile } from '@/utils/markdown';
import { MarkdownPage } from '@/components/MarkdownPage';

async function MarkdownPreviewPage() {
  const markdownContent = await readMarkdownFile(
    'pet-essays.md',
    '# 加载失败\n\n无法加载作文内容，请稍后重试。'
  );

  return (
    <MarkdownPage
      content={markdownContent}
      maxWidth="max-w-4xl"
    />
  );
}

export default MarkdownPreviewPage;