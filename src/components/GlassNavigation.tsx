import GlassCard from './GlassCard';

export default function GlassNavigation() {
  return (
    <div className="nav-grid flex flex-wrap gap-6">
      <GlassCard href="/coze" title="COZE AI" />
      <GlassCard href="/essays" title="每日英语作文" />
      <GlassCard href="/google" title="Google AI" />
      <GlassCard title="更多功能" isDisabled={true} />
    </div>
  );
}