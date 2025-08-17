/**
 * 智能 href 处理工具
 * 根据部署环境自动处理 .html 后缀
 * - Vercel: 自动去除 .html 后缀
 * - GitHub Pages: 保留 .html 后缀
 * - 本地开发: 保留 .html 后缀
 */

// 检测是否为 Vercel 环境
const isVercel = () => {
  if (typeof window === 'undefined') return false;
  
  // 检测 Vercel 的特征域名
  const hostname = window.location.hostname;
  return hostname.includes('vercel.app') || 
         hostname.includes('vercel.com') ||
         // 如果你有自定义域名部署在 Vercel，可以在这里添加
         process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined;
};

// 检测是否为 GitHub Pages 环境
const isGitHubPages = () => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  return hostname.includes('github.io') ||
         hostname.includes('githubusercontent.com');
};

/**
 * 智能处理页面链接
 * @param href 原始链接路径
 * @returns 处理后的链接路径
 */
export const getSmartHref = (href: string): string => {
  // 如果不是页面链接，直接返回
  if (!href.startsWith('/pages/') || !href.includes('.html')) {
    return href;
  }

  // Vercel 环境：去除 .html 后缀
  if (isVercel()) {
    return href.replace('.html', '');
  }

  // GitHub Pages 或本地开发：保留 .html 后缀
  return href;
};

/**
 * 获取当前部署环境信息（用于调试）
 */
export const getDeploymentInfo = () => {
  if (typeof window === 'undefined') {
    return { environment: 'server', hostname: 'N/A' };
  }

  const hostname = window.location.hostname;
  let environment = 'unknown';

  if (isVercel()) {
    environment = 'vercel';
  } else if (isGitHubPages()) {
    environment = 'github-pages';
  } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    environment = 'local';
  }

  return { environment, hostname };
};