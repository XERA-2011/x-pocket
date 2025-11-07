import React from 'react';
import { readMarkdownFile } from '@/utils/markdown';
import { MarkdownPage } from '@/components/MarkdownPage';
import { createMetadata } from '@/utils/metadata';

export const metadata = createMetadata('安全审计报告');

async function SecurityAuditPage() {
  const markdownContent = await readMarkdownFile(
    'security-audit-report.md',
    '# 加载失败\n\n无法加载安全审计报告内容，请稍后重试。'
  );

  return <MarkdownPage content={markdownContent} maxWidth="max-w-5xl" />;
}

export default SecurityAuditPage;
