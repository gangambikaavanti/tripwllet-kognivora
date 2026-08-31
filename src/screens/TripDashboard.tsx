import type { NavigateFn, Trip, Expense } from '../types'

interface Props {
  navigate: NavigateFn
  trip: Trip
  expenses: Expense[]
}

const categories = [
  { name: 'Accommodation', amount: 8500, color: 'bg-violet-500', total: 60000 },
  { name: 'Food', amount: 7200, color: 'bg-orange-400', total: 60000 },
  { name: 'Transport', amount: 5100, color: 'bg-blue-500', total: 60000 },
  { name: 'Activities', amount: 3372, color: 'bg-cyan-500', total: 60000 },
  { name: 'Shopping', amount: 2000, color: 'bg-pink-400', total: 60000 },
]

const catIcons: Record<string, React.ReactNode> = {
  Food: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  Accommodation: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Transport: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  Activities: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Shopping: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
}

function DonutChart({ pct }: { pct: number }) {
  const r = 72
  const circ = 2 * Math.PI * r
  const filled = (pct / 100) * circ
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r={r} fill="none" stroke="#F3F4F6" strokeWidth="14" />
      <circle
        cx="90"
        cy="90"
        r={r}
        fill="none"
        stroke={pct > 80 ? '#EF4444' : pct > 60 ? '#F59E0B' : '#4F46E5'}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        strokeDashoffset={circ * 0.25}
        transform="rotate(-90 90 90)"
      />
      <text x="90" y="84" textAnchor="middle" className="font-bold" fill="#111827" fontSize="26" fontWeight="700" fontFamily="Inter, sans-serif">
        {pct}%
      </text>
      <text x="90" y="104" textAnchor="middle" fill="#6B7280" fontSize="12" fontFamily="Inter, sans-serif">
        Budget Used
      </text>
    </svg>
  )
}

export default function TripDashboard({ navigate, trip, expenses }: Props) {
  const remaining = trip.budget - trip.spent
  const pct = Math.round((trip.spent / trip.budget) * 100)
  const daysTotal = 8
  const daysGone = 3
  const daysLeft = daysTotal - daysGone
  const dailyAvg = Math.round(trip.spent / daysGone)
  const projectedFinal = Math.round(dailyAvg * daysTotal)
  const projectedOver = projectedFinal - trip.budget
  const safeDaily = Math.round(remaining / daysLeft)

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            Trip Dashboard
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{trip.name}</h1>
          <p className="text-gray-500 mt-1">{trip.startDate} – {trip.endDate} &nbsp;·&nbsp; {trip.currency} ₹</p>
        </div>
        <button
          onClick={() => navigate('add-expense')}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Budget', value: `₹${trip.budget.toLocaleString()}`, sub: 'Trip budget', color: 'text-gray-900' },
          { label: 'Total Spent', value: `₹${trip.spent.toLocaleString()}`, sub: `${daysGone} of ${daysTotal} days`, color: 'text-gray-900' },
          { label: 'Remaining', value: `₹${remaining.toLocaleString()}`, sub: `${daysLeft} days left`, color: remaining < 10000 ? 'text-red-600' : 'text-emerald-600' },
          { label: 'Daily Average', value: `₹${dailyAvg.toLocaleString()}`, sub: 'per day spent', color: 'text-gray-900' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center">
          <DonutChart pct={pct} />
          <div className="mt-3 text-center">
            <p className="font-bold text-gray-900">₹{remaining.toLocaleString()} remaining</p>
            <p className="text-xs text-gray-400 mt-0.5">of ₹{trip.budget.toLocaleString()} budget</p>
          </div>
        </div>

        <div className="col-span-2 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                </svg>
              </div>
              <p className="font-bold text-gray-900">AI Budget Guardian</p>
            </div>
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full tracking-wide">WATCH</span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            You are spending about ₹{dailyAvg.toLocaleString()}/day, while your remaining budget supports roughly ₹{safeDaily.toLocaleString()}/day. At this rate, you may exceed your budget.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Projected Final', value: `₹${projectedFinal.toLocaleString()}`, bad: true },
              { label: 'Over Budget', value: `+₹${projectedOver.toLocaleString()}`, bad: true },
              { label: 'Safe Daily', value: `₹${safeDaily.toLocaleString()}/day`, bad: false },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400">{s.label}</p>
                <p className={`text-sm font-bold mt-0.5 ${s.bad ? 'text-red-600' : 'text-emerald-600'}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('ai-guardian')}
              className="flex-1 py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition-colors"
            >
              View AI Insights
            </button>
            <button
              onClick={() => navigate('what-if')}
              className="flex-1 py-2.5 bg-white text-amber-700 border border-amber-200 rounded-xl font-semibold text-sm hover:bg-amber-50 transition-colors"
            >
              Try What-If
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Spending by Category</h3>
          <div className="space-y-4">
            {categories.map((cat) => {
              const pctCat = Math.round((cat.amount / trip.spent) * 100)
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{catIcons[cat.name]}</span>
                      <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">₹{cat.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${cat.color} transition-all`} style={{ width: `${pctCat}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recent Expenses</h3>
            <button onClick={() => navigate('expense-history')} className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-9 h-9 bg-white rounded-xl border border-gray-200 flex items-center justify-center shrink-0 text-gray-500">
                  {catIcons[exp.category] || catIcons['Activities']}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{exp.merchant}</p>
                  <p className="text-xs text-gray-400">{exp.date} &nbsp;·&nbsp; {exp.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    {exp.currency === 'EUR' ? '€' : '₹'}{exp.amount}
                  </p>
                  <p className="text-xs text-gray-400">₹{exp.convertedAmount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('add-expense')}
            className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            + Add New Expense
          </button>
        </div>
      </div>
    </div>
  )
}
