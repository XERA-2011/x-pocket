"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTitle } from '@/hooks/use-page-title';

interface Asset {
  id: string;
  name: string;
  amount: number;
  color: string;
}

export default function AssetAllocationPage() {
  usePageTitle('资产配置占比');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetName, setAssetName] = useState('');
  const [assetAmount, setAssetAmount] = useState('');
  const [error, setError] = useState('');
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  const totalAmount = assets.reduce((sum, asset) => sum + asset.amount, 0);

  // 生成与现有颜色差异最大的颜色
  const generateDistinctColor = () => {
    if (assets.length === 0) {
      // 第一个颜色随机生成
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 75%, 55%)`;
    }

    // 提取现有颜色的色相值
    const existingHues = assets.map(asset => {
      const match = asset.color.match(/hsl\((\d+)/);
      return match ? parseInt(match[1]) : 0;
    }).sort((a, b) => a - b);

    let bestHue = 0;
    let maxMinDistance = 0;

    // 尝试多个候选色相，选择与所有现有颜色距离最大的
    for (let i = 0; i < 36; i++) {
      const candidateHue = i * 10; // 每10度一个候选

      // 计算该候选色相与所有现有色相的最小距离
      let minDistance = 360;
      for (const existingHue of existingHues) {
        // 计算色环上的最短距离
        const distance = Math.min(
          Math.abs(candidateHue - existingHue),
          360 - Math.abs(candidateHue - existingHue)
        );
        minDistance = Math.min(minDistance, distance);
      }

      // 选择最小距离最大的候选（即与所有现有颜色都尽可能远）
      if (minDistance > maxMinDistance) {
        maxMinDistance = minDistance;
        bestHue = candidateHue;
      }
    }

    // 在最佳色相附近添加一些随机性，避免颜色过于规律
    const finalHue = (bestHue + Math.floor(Math.random() * 20 - 10) + 360) % 360;
    const saturation = 70 + Math.floor(Math.random() * 15); // 70-85%
    const lightness = 50 + Math.floor(Math.random() * 15); // 50-65%

    return `hsl(${finalHue}, ${saturation}%, ${lightness}%)`;
  };

  const handleAddAsset = () => {
    setError('');

    if (!assetName.trim()) {
      setError('请输入资产名称');
      return;
    }

    const amount = parseFloat(assetAmount);
    if (!assetAmount || isNaN(amount) || amount <= 0) {
      setError('请输入有效的金额（大于0）');
      return;
    }

    const newAsset: Asset = {
      id: Date.now().toString(),
      name: assetName.trim(),
      amount: amount,
      color: generateDistinctColor(),
    };

    setAssets([...assets, newAsset]);
    setAssetName('');
    setAssetAmount('');
  };

  const handleRemoveAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const handleClear = () => {
    setAssets([]);
    setAssetName('');
    setAssetAmount('');
    setError('');
  };

  const getPercentage = (amount: number) => {
    if (totalAmount === 0) return 0;
    return (amount / totalAmount) * 100;
  };

  // 生成饼图的SVG路径
  const generatePieChart = () => {
    if (assets.length === 0) return null;

    const size = 300;
    const center = size / 2;
    const radius = size / 2 - 10;
    let currentAngle = -90; // 从顶部开始

    return assets.map((asset, index) => {
      const percentage = getPercentage(asset.amount);
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      currentAngle = endAngle;

      // 如果是完整的圆（100%），使用circle元素
      if (angle >= 359.99) {
        return (
          <g key={asset.id}>
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              fill={asset.color}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              onMouseEnter={() => setHoveredAsset(asset.id)}
              onMouseLeave={() => setHoveredAsset(null)}
            />
          </g>
        );
      }

      // 转换为弧度
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      // 计算路径点
      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const largeArc = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      return (
        <g key={asset.id}>
          <motion.path
            d={pathData}
            fill={asset.color}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            onMouseEnter={() => setHoveredAsset(asset.id)}
            onMouseLeave={() => setHoveredAsset(null)}
          />
        </g>
      );
    });
  };

  return (
    <div className="relative w-full min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Page Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            资产配置占比
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* 左侧：输入区域 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {/* 输入表单 */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  资产名称
                </label>
                <input
                  type="text"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="例如：股票、债券、现金..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAsset()}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  金额
                </label>
                <input
                  type="number"
                  value={assetAmount}
                  onChange={(e) => setAssetAmount(e.target.value)}
                  placeholder="请输入金额"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAsset()}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddAsset}
                className="flex-1 bg-white !text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors shadow-sm cursor-can-hover"
              >
                添加资产
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20 cursor-can-hover"
              >
                清空全部
              </button>
            </div>

            {/* 资产列表 */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                资产列表 {assets.length > 0 && `(${assets.length})`}
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {assets.map((asset) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: asset.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium truncate">
                            {asset.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            ¥{asset.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {getPercentage(asset.amount).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveAsset(asset.id)}
                        className="ml-4 text-red-400 hover:text-red-300 transition-colors cursor-can-hover"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {assets.length === 0 && (
                  <div className="text-center text-white/50 py-8">
                    暂无资产，请添加
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧：可视化区域 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {/* 总资产 */}
            {totalAmount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 rounded-lg p-4 mb-6 text-center"
              >
                <div className="text-white/70 text-sm mb-1">总资产</div>
                <div className="text-white text-3xl font-bold">
                  ¥{totalAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </motion.div>
            )}

            {/* 饼图 */}
            <div className="flex justify-center items-center relative">
              {assets.length > 0 ? (
                <>
                  <svg width="300" height="300" viewBox="0 0 300 300">
                    <AnimatePresence>
                      {generatePieChart()}
                    </AnimatePresence>
                  </svg>
                  {/* 中心悬停提示信息 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <AnimatePresence mode="wait">
                      {hoveredAsset ? (
                        <motion.div
                          key={hoveredAsset}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-2xl max-w-[200px]"
                        >
                          {(() => {
                            const asset = assets.find(a => a.id === hoveredAsset);
                            if (!asset) return null;
                            return (
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: asset.color }}
                                  />
                                  <div className="text-white font-semibold text-base truncate">{asset.name}</div>
                                </div>
                                <div className="text-white/70 text-xs mb-1">
                                  ¥{asset.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-white text-xl font-bold">
                                  {getPercentage(asset.amount).toFixed(2)}%
                                </div>
                              </div>
                            );
                          })()}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-white/40 text-sm"
                        >
                          悬停查看详情
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="text-center text-white/50 py-20">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <p>添加资产后将显示饼图</p>
                </div>
              )}
            </div>

            {/* 图例 */}
            {assets.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-2"
              >
                <h3 className="text-sm font-semibold text-white/70 mb-3">图例</h3>
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: asset.color }}
                      />
                      <span className="text-white">{asset.name}</span>
                    </div>
                    <span className="text-white/70">
                      {getPercentage(asset.amount).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
