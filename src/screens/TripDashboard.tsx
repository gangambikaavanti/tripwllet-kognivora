import type { NavigateFn, Trip, Expense } from '../types'
import { useState } from 'react'

interface Props {
  navigate: NavigateFn
  trip: Trip
  expenses: Expense[]
}

const categories = [
  { name: 'Accommodation', amount: 8500, color: 'bg-teal-500' },
  { name: 'Food', amount: 7200, color: 'bg-orange-400' },
  { name: 'Transport', amount: 5100, color: 'bg-sky-500' },
  { name: 'Activities', amount: 3372, color: 'bg-emerald-500' },
  { name: 'Shopping', amount: 2000, color: 'bg-rose-400' },
]

const catIcons: Record<string, React.ReactNode> = {
  Food: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  Accommodation: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Transport: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  Activities: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Shopping: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
}

function DonutChart({ pct }: { pct: number }) {
  const r = 72
  const circ = 2 * Math.PI * r
  const filled = (pct / 100) * circ

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle
        cx="90"
        cy="90"
        r={r}
        fill="none"
        stroke="#E5F4F2"
        strokeWidth="14"
      />

      <circle
        cx="90"
        cy="90"
        r={r}
        fill="none"
        stroke={pct > 80 ? '#F43F5E' : pct > 60 ? '#F59E0B' : '#0D9488'}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        strokeDashoffset={circ * 0.25}
        transform="rotate(-90 90 90)"
      />

      <text
        x="90"
        y="84"
        textAnchor="middle"
        fill="#123B3A"
        fontSize="27"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        {pct}%
      </text>

      <text
        x="90"
        y="105"
        textAnchor="middle"
        fill="#6B8583"
        fontSize="12"
        fontFamily="Inter, sans-serif"
      >
        Budget Used
      </text>
    </svg>
  )
}

export default function TripDashboard({
  navigate,
  trip,
  expenses,
}: Props) {

  /* =========================
     TRIP MEMORIES
  ========================= */

  const [memories, setMemories] = useState<string[]>([
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85',
  ])

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setMemories((previous) => [
            ...previous,
            reader.result as string,
          ])
        }
      }

      reader.readAsDataURL(file)
    })

    event.target.value = ''
  }

  /* =========================
     BUDGET CALCULATIONS
  ========================= */

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
    <div className="min-h-full bg-[#F4FBFA] p-5 md:p-8 max-w-7xl">

      {/* =========================
          HERO
      ========================= */}

      <div
        className="relative overflow-hidden rounded-[28px] mb-7 min-h-[260px] flex items-end"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(3,45,46,0.88), rgba(3,45,46,0.05)), url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=90')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <div className="absolute top-5 left-5">
          <span className="bg-white/90 backdrop-blur-sm text-teal-700 px-3 py-1.5 rounded-full text-xs font-bold">
            ✈️ YOUR JOURNEY
          </span>
        </div>

        <div className="relative p-7 md:p-9 text-white w-full">

          <div className="flex items-end justify-between gap-5">

            <div>

              <p className="text-teal-100 text-sm font-medium mb-1">
                {trip.destination || 'Your destination'} · {trip.startDate} – {trip.endDate}
              </p>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {trip.name}
              </h1>

              <p className="text-white/80 mt-2 text-sm">
                Make memories. Track spending. Enjoy the journey.
              </p>

            </div>

            <button
              onClick={() => navigate('add-expense')}
              className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white text-teal-800 rounded-xl font-bold text-sm hover:bg-teal-50 transition shadow-lg"
            >
              <span className="text-lg">+</span>
              Add Expense
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE ADD EXPENSE */}

      <button
        onClick={() => navigate('add-expense')}
        className="sm:hidden w-full mb-5 py-3 bg-teal-600 text-white rounded-xl font-bold"
      >
        + Add Expense
      </button>

      {/* =========================
          QUICK STATS
      ========================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {[
          {
            label: 'Trip Budget',
            value: `₹${trip.budget.toLocaleString()}`,
            sub: 'Your travel fund',
            icon: '💰',
          },
          {
            label: 'Spent',
            value: `₹${trip.spent.toLocaleString()}`,
            sub: `${daysGone} of ${daysTotal} days`,
            icon: '🧾',
          },
          {
            label: 'Remaining',
            value: `₹${remaining.toLocaleString()}`,
            sub: `${daysLeft} days left`,
            icon: '🌴',
            green: true,
          },
          {
            label: 'Daily Average',
            value: `₹${dailyAvg.toLocaleString()}`,
            sub: 'Average per day',
            icon: '📍',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-teal-100 shadow-sm p-5 hover:-translate-y-1 hover:shadow-md transition-all"
          >

            <div className="flex items-center justify-between mb-3">

              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {s.label}
              </p>

              <span className="text-xl">
                {s.icon}
              </span>

            </div>

            <p
              className={`text-2xl font-bold ${
                s.green
                  ? 'text-teal-600'
                  : 'text-slate-900'
              }`}
            >
              {s.value}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {s.sub}
            </p>

          </div>
        ))}
      </div>

      {/* =========================
          BUDGET + AI GUARDIAN
      ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

        {/* BUDGET */}

        <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 flex flex-col items-center justify-center">

          <div className="w-full flex justify-between items-center mb-2">

            <h3 className="font-bold text-slate-900">
              Travel Budget
            </h3>

            <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">
              {pct}% used
            </span>

          </div>

          <DonutChart pct={pct} />

          <div className="text-center -mt-1">

            <p className="font-bold text-slate-900 text-lg">
              ₹{remaining.toLocaleString()} left
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Keep some money for spontaneous adventures 🌊
            </p>

          </div>

        </div>

        {/* AI GUARDIAN */}

        <div className="lg:col-span-2 rounded-2xl border border-orange-200 shadow-sm p-6 bg-gradient-to-br from-[#FFF9EC] to-[#FFF3D6]">

          <div className="flex items-start justify-between mb-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl">
                🤖
              </div>

              <div>

                <p className="font-bold text-slate-900">
                  AI Travel Guardian
                </p>

                <p className="text-xs text-slate-500">
                  Your smart travel companion
                </p>

              </div>

            </div>

            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              WATCH
            </span>

          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-5">
            You're spending about{' '}
            <strong>₹{dailyAvg.toLocaleString()}/day</strong>.
            You can safely spend around{' '}
            <strong>₹{safeDaily.toLocaleString()}/day</strong>{' '}
            for the rest of your adventure.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-5">

            {[
              {
                label: 'Projected',
                value: `₹${projectedFinal.toLocaleString()}`,
              },
              {
                label: 'Over Budget',
                value: `+₹${projectedOver.toLocaleString()}`,
              },
              {
                label: 'Safe Daily',
                value: `₹${safeDaily.toLocaleString()}`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/80 rounded-xl p-3 border border-orange-100"
              >

                <p className="text-[11px] text-slate-400 font-medium">
                  {s.label}
                </p>

                <p
                  className={`text-sm font-bold mt-1 ${
                    s.label === 'Safe Daily'
                      ? 'text-teal-600'
                      : 'text-rose-600'
                  }`}
                >
                  {s.value}
                </p>

              </div>
            ))}

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate('ai-guardian')}
              className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition"
            >
              ✨ View AI Insights
            </button>

            <button
              onClick={() => navigate('what-if')}
              className="flex-1 py-3 bg-white text-orange-700 border border-orange-200 rounded-xl font-bold text-sm hover:bg-orange-50 transition"
            >
              Try What-If
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          TRIP MEMORIES
      ========================= */}

      <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 mb-6">

        <div className="flex items-center justify-between mb-5">

          <div>

            <div className="flex items-center gap-2">

              <h3 className="font-bold text-slate-900 text-lg">
                Trip Memories
              </h3>

              <span className="text-xl">
                📸
              </span>

            </div>

            <p className="text-xs text-slate-400 mt-1">
              Your journey, captured in moments.
            </p>

          </div>

          <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition shadow-sm">

            <span className="text-lg">
              +
            </span>

            Add Photos

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />

          </label>

        </div>

        {/* PHOTO GALLERY */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {memories.map((photo, index) => (

            <div
              key={index}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100"
            >

              <img
                src={photo}
                alt={`Trip memory ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* PHOTO OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">

                <div className="absolute bottom-3 left-3 right-3">

                  <p className="text-white text-xs font-bold">
                    {index < 2
                      ? '🌴 Travel Memory'
                      : index === 2
                        ? '📍 Exploring'
                        : '🌊 Adventure'}
                  </p>

                  <p className="text-white/70 text-[10px] mt-0.5">
                    {trip.destination || 'Your journey'}
                  </p>

                </div>

              </div>

            </div>

          ))}

          {/* UPLOAD TILE */}

          <label className="aspect-[4/3] rounded-2xl border-2 border-dashed border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-100 hover:border-teal-400 transition group">

            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-teal-600 text-2xl shadow-sm group-hover:scale-110 transition">
              +
            </div>

            <p className="text-sm font-bold text-teal-700 mt-3">
              Add memory
            </p>

            <p className="text-xs text-teal-500 mt-1">
              Capture the moment
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />

          </label>

        </div>

        {/* MEMORY FOOTER */}

        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">

          <p className="text-xs text-slate-400">
            📍 {trip.destination || 'Your destination'} · {memories.length} memories
          </p>

          <p className="text-xs text-teal-600 font-semibold">
            Make memories, not just expenses ❤️
          </p>

        </div>

      </div>

      {/* =========================
          TRAVEL TIP
      ========================= */}

      <div
        className="rounded-2xl overflow-hidden mb-6 relative min-h-[125px] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(3,64,65,0.9), rgba(3,64,65,0.35)), url('https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1400&q=85')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <div className="p-6 text-white">

          <p className="text-teal-200 text-xs font-bold uppercase tracking-widest">
            TRAVEL TIP
          </p>

          <h3 className="text-xl font-bold mt-1">
            Leave room in the budget for memories.
          </h3>

          <p className="text-white/75 text-sm mt-1">
            The best part of a trip is often the unplanned adventure.
          </p>

        </div>

        <div className="absolute right-8 text-6xl opacity-80 hidden md:block">
          🌴
        </div>

      </div>

      {/* =========================
          LOWER CONTENT
      ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* CATEGORIES */}

        <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h3 className="font-bold text-slate-900 text-lg">
                Where your money goes
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Spending across your adventure
              </p>

            </div>

            <span className="text-2xl">
              🧳
            </span>

          </div>

          <div className="space-y-5">

            {categories.map((cat) => {

              const pctCat = Math.round(
                (cat.amount / trip.spent) * 100
              )

              return (
                <div key={cat.name}>

                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-2.5">

                      <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                        {catIcons[cat.name]}
                      </span>

                      <span className="text-sm font-semibold text-slate-700">
                        {cat.name}
                      </span>

                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      ₹{cat.amount.toLocaleString()}
                    </span>

                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2">

                    <div
                      className={`h-2 rounded-full ${cat.color} transition-all`}
                      style={{ width: `${pctCat}%` }}
                    />

                  </div>

                </div>
              )
            })}

          </div>

        </div>

        {/* RECENT EXPENSES */}

        <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h3 className="font-bold text-slate-900 text-lg">
                Recent expenses
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Your latest travel spending
              </p>

            </div>

            <button
              onClick={() => navigate('expense-history')}
              className="text-sm text-teal-600 font-bold hover:text-teal-700"
            >
              View all →
            </button>

          </div>

          <div className="space-y-3">

            {expenses.map((exp) => (

              <div
                key={exp.id}
                className="flex items-center gap-3 p-3.5 bg-[#F6FBFA] rounded-xl border border-teal-50 hover:bg-teal-50 transition"
              >

                <div className="w-10 h-10 bg-white rounded-xl border border-teal-100 flex items-center justify-center shrink-0 text-teal-600">
                  {catIcons[exp.category] || catIcons['Activities']}
                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-bold text-slate-900 truncate">
                    {exp.merchant}
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    {exp.date} · {exp.category}
                  </p>

                </div>

                <div className="text-right shrink-0">

                  <p className="text-sm font-bold text-slate-900">
                    {exp.currency === 'EUR'
                      ? '€'
                      : '₹'}
                    {exp.amount}
                  </p>

                  <p className="text-xs text-slate-400">
                    ₹{exp.convertedAmount.toLocaleString()}
                  </p>

                </div>

              </div>

            ))}

          </div>

          <button
            onClick={() => navigate('add-expense')}
            className="mt-5 w-full py-3 border-2 border-dashed border-teal-200 text-teal-600 rounded-xl text-sm font-bold hover:border-teal-400 hover:bg-teal-50 transition"
          >
            + Add New Expense
          </button>

        </div>

      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <div className="text-center py-8">

        <p className="text-slate-400 text-sm">
          🌊 Spend wisely. Explore freely. Make memories.
        </p>

      </div>

    </div>
  )
}