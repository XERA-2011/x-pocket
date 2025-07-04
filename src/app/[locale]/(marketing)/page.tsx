'use client';
// 需要安装 react-icons: npm install react-icons
import Link from 'next/link';
import { FaLanguage, FaPlus, FaTachometerAlt, FaToolbox } from 'react-icons/fa';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center px-2 py-4 bg-white transition-colors duration-200">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {/* 头部 */}
        <header className="text-center p-4 rounded border border-gray-400 bg-white">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 text-black">
            <FaToolbox className="inline-block text-2xl" />
            {' '}
            口袋工具集
          </h1>
          <p className="subtitle text-gray-600 mt-2">轻量级实用工具集合</p>
        </header>
        {/* 卡片导航 */}
        <div className="nav-grid flex flex-wrap gap-4">
          <Link
            href="/speed-per-hour"
            className="nav-card flex-1 min-w-[45%] border-2 border-gray-400 rounded p-5 text-center cursor-pointer flex flex-col items-center justify-center transition hover:border-gray-600 bg-white hover:bg-gray-100 min-h-[130px] no-underline"
          >
            <div className="nav-icon text-3xl mb-2"><FaTachometerAlt /></div>
            <div className="nav-title font-semibold">运动时速检测</div>
            <div className="nav-desc text-gray-500">实时定位速度监测</div>
          </Link>
          <Link
            href="/translate"
            className="nav-card flex-1 min-w-[45%] border-2 border-gray-400 rounded p-5 text-center cursor-pointer flex flex-col items-center justify-center transition hover:border-gray-600 bg-white hover:bg-gray-100 min-h-[130px] no-underline"
          >
            <div className="nav-icon text-3xl mb-2"><FaLanguage /></div>
            <div className="nav-title font-semibold">即时翻译</div>
            <div className="nav-desc text-gray-500">多语言互译工具</div>
          </Link>
          {/* 预留卡片，隐藏 */}
          <div className="nav-card flex-1 min-w-[45%] border-2 border-gray-400 rounded p-5 text-center flex flex-col items-center justify-center min-h-[130px] invisible">
            <div className="nav-icon text-3xl mb-2"><FaPlus /></div>
            <div className="nav-title font-semibold">更多功能</div>
            <div className="nav-desc text-gray-500">即将上线</div>
          </div>
        </div>
      </div>
    </div>
  );
}
