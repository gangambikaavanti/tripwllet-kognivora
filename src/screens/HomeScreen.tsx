import type { NavigateFn, Trip } from '../types'

interface Props {
  navigate: NavigateFn
  trips: Trip[]
  onSelectTrip: (trip: Trip) => void
}

const categoryColors: Record<string, string> = {
  europe: 'from-indigo-500 to-violet-600',
  goa: 'from-cyan-500 to-blue-600',
}

export default function HomeScreen({ navigate, trips, onSelectTrip }: Props) {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          My Trips
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Where are you going next?</h1>
        <p className="text-gray-500 mt-1.5">Track budgets, split expenses, and travel smarter.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {trips.map((trip) => {
          const pct = Math.round((trip.spent / trip.budget) * 100)
          const remaining = trip.budget - trip.spent
          const status = pct > 80 ? 'danger' : pct > 60 ? 'warning' : 'healthy'
          const statusColors = {
            healthy: { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700', text: 'text-emerald-600' },
            warning: { bar: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700', text: 'text-amber-600' },
            danger: { bar: 'bg-red-500', badge: 'bg-red-50 text-red-700', text: 'text-red-600' },
          }[status]

          return (
            <div key={trip.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-24 bg-gradient-to-br ${categoryColors[trip.id] || 'from-indigo-500 to-violet-600'} relative p-4`}>
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none">
                    <circle cx="160" cy="40" r="60" stroke="white" strokeWidth="1" />
                    <circle cx="160" cy="40" r="40" stroke="white" strokeWidth="1" />
                  </svg>
                </div>
                <span className={`relative inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors.badge}`}>
                  Active
                </span>
                <div className="absolute bottom-3 right-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{trip.name}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{trip.startDate} – {trip.endDate}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Budget</p>
                    <p className="text-sm font-bold text-gray-900">₹{trip.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Remaining</p>
                    <p className={`text-sm font-bold ${statusColors.text}`}>₹{remaining.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-gray-400">₹{trip.spent.toLocaleString()} spent</span>
                    <span className={`text-xs font-semibold ${statusColors.text}`}>{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${statusColors.bar} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => onSelectTrip(trip)}
                  className="mt-4 w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  View Trip
                </button>
              </div>
            </div>
          )
        })}

        <button
          onClick={() => navigate('create-trip')}
          className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 p-8 hover:border-indigo-300 hover:bg-indigo-50 transition-all group min-h-[260px]"
        >
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-700 group-hover:text-indigo-700">New Trip</p>
            <p className="text-sm text-gray-400 mt-0.5">Plan your next adventure</p>
          </div>
        </button>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-lg">Ready to track smarter?</p>
          <p className="text-indigo-200 text-sm mt-0.5">Snap. Extract. Split. Track. Predict.</p>
        </div>
        <button
          onClick={() => navigate('create-trip')}
          className="px-5 py-2.5 bg-white text-indigo-700 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-colors shrink-0"
        >
          + Create New Trip
        </button>
      </div>
    </div>
  )
}
