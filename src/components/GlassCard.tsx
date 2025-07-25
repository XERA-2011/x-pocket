import Link from 'next/link';

interface GlassCardProps {
  href?: string;
  title: string;
  isDisabled?: boolean;
}

export default function GlassCard({ href, title, isDisabled = false }: GlassCardProps) {
  const CardContent = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute -inset-[1px] rounded-[24px] p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-[10%] w-[80%] h-[40%] bg-white/5 blur-[30px] rounded-full -z-10"></div>
      <div className="nav-title font-semibold text-white/95 text-lg">{title}</div>
    </>
  );

  if (isDisabled) {
    return (
      <div className="nav-card flex-1 min-w-[45%] border-0 rounded-[24px] p-6 text-center flex flex-col items-center justify-center min-h-[130px] bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative overflow-hidden">
        <CardContent />
      </div>
    );
  }

  return (
    <Link
      href={href || "#"}
      className="nav-card flex-1 min-w-[45%] border-0 rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-500 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-2xl hover:backdrop-blur-3xl min-h-[130px] no-underline shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:scale-[1.02] relative overflow-hidden group"
    >
      <CardContent />
    </Link>
  );
}