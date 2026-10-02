import type { Severity } from '../types';

const config: Record<Severity, { label: string; cls: string }> = {
  critical: { label: 'CRITICAL', cls: 'bg-red-100 text-red-700 border-red-300' },
  high: { label: 'HIGH', cls: 'bg-orange-100 text-orange-700 border-orange-300' },
  medium: { label: 'MEDIUM', cls: 'bg-amber-100 text-amber-700 border-amber-300' },
  low: { label: 'LOW', cls: 'bg-green-100 text-green-700 border-green-300' },
};

export default function SeverityBadge({ severity }: { severity: Severity }) {
  const { label, cls } = config[severity];
  return (
    <span className={`status-badge border flex-shrink-0 ${cls}`}>
      {severity === 'critical' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
      {label}
    </span>
  );
}
