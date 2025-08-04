import React from 'react';
import ReactMarkdown from 'react-markdown';
import fs from 'fs/promises';
import path from 'path';

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

  return (
    <div className="mx-auto p-4 min-h-[75vh] max-w-4xl mt-[100px]">
      <article className="prose lg:prose-xl">
        <ReactMarkdown>
          {markdownContent}
        </ReactMarkdown>
      </article>
    </div>
  );
}

export default MarkdownPreviewPage;