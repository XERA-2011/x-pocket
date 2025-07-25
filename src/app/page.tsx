import GlassNavigation from '../components/GlassNavigation';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-2 py-4 transition-colors duration-200">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {/* 液态玻璃卡片导航 */}
        <GlassNavigation />
      </div>
    </div>
  );
}
