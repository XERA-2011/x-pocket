"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePageTitle } from '@/hooks/use-page-title';
import GlowCardList from '@/components/ui/GlowCardList';

interface PolymarketEvent {
  id: string;
  title: string;
  slug: string;
}

interface PolymarketItem {
  id: string;
  question: string;
  slug: string;
  image: string;
  description: string;
  outcomes: string;
  active: boolean;
  closed: boolean;
  endDate: string;
  volume24hr?: number;
  lastTradePrice?: number;
  events?: PolymarketEvent[];
}

export default function PolymarketPage() {
  usePageTitle('Polymarket 预测市场');

  const [markets, setMarkets] = useState<PolymarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError(null);

      // 通过 API 路由代理请求
      const response = await fetch(`/api/polymarket?limit=${limit}&closed=false`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch markets');
      }

      const data = await response.json();
      setMarkets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching markets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative w-full min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Polymarket 预测市场
          </h1>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <label htmlFor="limit" className="text-white/70">
              显示数量:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <button
            onClick={fetchMarkets}
            disabled={loading}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg border border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '加载中...' : '刷新'}
          </button>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-red-400">错误: {error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-pulse"
              >
                <div className="h-48 bg-white/10 rounded-lg mb-4"></div>
                <div className="h-6 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Markets Grid */}
        {!loading && !error && markets.length > 0 && (
          <GlowCardList
            items={markets.map((market) => ({
              id: market.id,
              title: market.question,
              href: `https://polymarket.com/event/${market.slug}`,
              tags: [
                market.active ? '活跃' : '未激活',
                formatDate(market.endDate),
                market.lastTradePrice !== undefined && market.lastTradePrice > 0
                  ? `${(market.lastTradePrice * 100).toFixed(1)}%`
                  : ''
              ].filter(Boolean)
            }))}
            columns={3}
            gap="md"
          />
        )}

        {/* Empty State */}
        {!loading && !error && markets.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white/50 text-lg">暂无市场数据</p>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">关于 Polymarket</h2>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>Polymarket 是一个去中心化的预测市场平台</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>用户可以对各种事件的结果进行预测和交易</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>实时更新市场数据，每5分钟刷新一次</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>点击&ldquo;查看详情&rdquo;可访问 Polymarket 官网了解更多</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
