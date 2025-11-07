import { useEffect } from 'react';

/**
 * 客户端动态设置页面 title 的 hook
 * @param title - 页面标题
 * @param suffix - 标题后缀，默认为 "X-POCKET"
 */
export function usePageTitle(title: string, suffix = 'X-POCKET') {
  useEffect(() => {
    document.title = suffix ? `${title} ｜ ${suffix}` : title;
  }, [title, suffix]);
}
