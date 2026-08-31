import type { NavigateFn } from '../types'

interface Props {
  navigate: NavigateFn
}

function ForecastChart() {
  const W = 480
  const H = 200
  const PAD = { t: 10, r: 10, b: 30, l: 50 }
  const w = W - PAD.l - PAD.r
  const h = H - PAD.t - PAD.b
  const maxY = 70000
  const days = 8

  const sx = (d: number) => PAD.l + ((d - 1) / (days - 1)) * w
  const sy = (v: number) => PAD.t + h - (v / maxY) * h

  const actual = [
    [1, 0], [2, 8724], [3, 17448], [4, 26172],
  ] as [number, number][]

  const projected = [
    [4, 26172], [5, 34800], [6, 43200], [7, 52000], [8, 64872],
  ] as [number, number][]

  const toPath = (pts: [number, number][]) =>
    pts.map(([d, v], i) => `${i === 0 ? 'M' : 'L'}${sx(d).toFixed(1)},${sy(v).toFixed(1)}`).join(' ')

  const toArea = (pts: [number, number][]) =>
    toPath(pts) + ` L${sx(pts[pts.length - 1][0]).toFixed(1)},${(PAD.t + h).toFixed(1)} L${sx(pts[0][0]).toFixed(1)},${(PAD.t + h).toFixed(1)} Z`

  const yLabels = [0, 20000, 40000, 60000, 70000]

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      {yLabels.map((v) => (
        <g key={v}>
          <line x1={PAD.l} y1={sy(v)} x2={PAD.l + w} y2={sy(v)} stroke="#F3F4F6" strokeWidth="1" />
          <text x={PAD.l - 6} y={sy(v)} textAnchor="end" fill="#9CA3AF" fontSize="10" dominantBaseline="middle">
            {v >= 1000 ? `₹${v / 1000}k` : '₹0'}
          </text>
        </g>
      ))}

      {Array.from({ length: days }, (_, i) => i + 1).map((d) => (
        <text key={d} x={sx(d)} y={H - 8} textAnchor="middle" fill="#9CA3AF" fontSize="10">
          Day {d}
        </text>
      ))}

      <path d={toArea(projected)} fill="#FEF3C7" opacity="0.5" />

      <line x1={PAD.l} y1={sy(60000)} x2={PAD.l + w} y2={sy(60000)} stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x={PAD.l + w + 4} y={sy(60000)} fill="#10B981" fontSize="9" dominantBaseline="middle">Budget</text>

      <path d={toPath(projected)} fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 4" />
      <path d={toPath(actual)} fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {actual.map(([d, v]) => (
        <circle key={d} cx={sx(d)} cy={sy(v)} r="4" fill="#4F46E5" />
      ))}

      <circle cx={sx(4)} cy={sy(26172)} r="5" fill="white" stroke="#4F46E5" strokeWidth="2" />
      <text x={sx(4)} y={sy(26172) - 10} textAnchor="middle" fill="#4F46E5" fontSize="9" fontWeight="600">₹26,172</text>
    </svg>
  )
}

export default function AIGuardian({ navigate }: Props) {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          </svg>
          AI Budget Guardian
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Your Budget Guardian</h1>
        <p className="text-gray-500 mt-1.5">Powered by real-time spending analysis and AI forecasting.</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-bold text-red-800 text-lg">You are at risk of overspending</p>
          <p className="text-red-600 text-sm mt-0.5">Based on your current spending rate, you will exceed your ₹60,000 budget.</p>
        </div>
        <span className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full tracking-wide shrink-0">AT RISK</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Current Spend', value: '₹26,172', sub: 'as of Day 4', color: 'text-gray-900' },
          { label: 'Projected Final', value: '₹64,872', sub: 'at current rate', color: 'text-red-600' },
          { label: 'Budget', value: '₹60,000', sub: 'total trip budget', color: 'text-gray-900' },
          { label: 'Projected Overage', value: '+₹4,872', sub: 'over budget', color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Spending Forecast</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="inline-block w-6 h-0.5 bg-indigo-600 rounded-full"></span>Actual</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-6 h-0.5 bg-amber-500 rounded-full" style={{ borderTop: '1px dashed' }}></span>Projected</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-6 h-0.5 bg-emerald-500 rounded-full" style={{ borderTop: '1px dashed' }}></span>Budget</span>
          </div>
        </div>
        <ForecastChart />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          {
            label: 'Safe Daily Spend',
            value: '₹1,780/day',
            sub: 'to stay within budget',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
              </svg>
            ),
            bg: 'bg-emerald-50',
            iconBg: 'bg-emerald-100',
            valColor: 'text-emerald-700',
          },
          {
            label: 'Current Daily Spend',
            value: '₹2,618/day',
            sub: 'average over 3 days',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
              </svg>
            ),
            bg: 'bg-amber-50',
            iconBg: 'bg-amber-100',
            valColor: 'text-amber-700',
          },
          {
            label: 'Days Remaining',
            value: '5 days',
            sub: 'until Sep 20',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            ),
            bg: 'bg-indigo-50',
            iconBg: 'bg-indigo-100',
            valColor: 'text-indigo-700',
          },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} rounded-2xl p-5`}>
            <div className={`w-10 h-10 ${c.iconBg} rounded-xl flex items-center justify-center mb-3`}>
              {c.icon}
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">{c.label}</p>
            <p className={`text-xl font-bold ${c.valColor}`}>{c.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">AI Recommendation</p>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
              Reduce daily food and shopping spending by approximately <span className="font-semibold text-amber-700">₹840/day</span> to stay within budget. Consider skipping non-essential activities for the next 2 days to build a safety buffer.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('what-if')}
          className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
        >
          Try What-If Planner
        </button>
        <button
          onClick={() => navigate('expense-history')}
          className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          View Spending Breakdown
        </button>
      </div>
    </div>
  )
}
