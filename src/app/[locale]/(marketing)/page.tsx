'use client';
// 需要安装 react-icons: npm install react-icons
import Link from 'next/link';
import { FaCalculator, FaFolderOpen, FaLanguage, FaPlus, FaTachometerAlt } from 'react-icons/fa';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center px-2 py-4 transition-colors duration-200">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {/* 卡片导航 */}
        <div className="nav-grid flex flex-wrap gap-4">
          <Link
            href="/speed"
            className="nav-card flex-1 min-w-[45%] border-2 border-neutral-700 rounded p-5 text-center cursor-pointer flex flex-col items-center justify-center transition hover:border-neutral-500 bg-neutral-900 hover:bg-neutral-800 min-h-[130px] no-underline"
          >
            <div className="nav-icon text-3xl mb-2"><FaTachometerAlt /></div>
            <div className="nav-title font-semibold">运动时速检测</div>
          </Link>
          <Link
            href="/translate"
            className="nav-card flex-1 min-w-[45%] border-2 border-neutral-700 rounded p-5 text-center cursor-pointer flex flex-col items-center justify-center transition hover:border-neutral-500 bg-neutral-900 hover:bg-neutral-800 min-h-[130px] no-underline"
          >
            <div className="nav-icon text-3xl mb-2"><FaLanguage /></div>
            <div className="nav-title font-semibold">即时翻译</div>
          </Link>
          <Link
            href="/counter"
            className="nav-card flex-1 min-w-[45%] border-2 border-neutral-700 rounded p-5 text-center cursor-pointer flex flex-col items-center justify-center transition hover:border-neutral-500 bg-neutral-900 hover:bg-neutral-800 min-h-[130px] no-underline"
          >
            <div className="nav-icon text-3xl mb-2"><FaCalculator /></div>
            <div className="nav-title font-semibold">计数器</div>
          </Link>
          <Link
            href="/portfolio"
            className="nav-card flex-1 min-w-[45%] border-2 border-neutral-700 rounded p-5 text-center cursor-pointer flex flex-col items-center justify-center transition hover:border-neutral-500 bg-neutral-900 hover:bg-neutral-800 min-h-[130px] no-underline"
          >
            <div className="nav-icon text-3xl mb-2"><FaFolderOpen /></div>
            <div className="nav-title font-semibold">作品集</div>
          </Link>
          {/* 预留卡片，隐藏 */}
          <div className="nav-card flex-1 min-w-[45%] border-2 border-neutral-700 rounded p-5 text-center flex flex-col items-center justify-center min-h-[130px] invisible bg-neutral-900">
            <div className="nav-icon text-3xl mb-2"><FaPlus /></div>
            <div className="nav-title font-semibold">更多功能</div>
          </div>
        </div>
      </div>
    </div>
  );
}
