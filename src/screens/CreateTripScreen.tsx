import { useState } from 'react'
import type { NavigateFn } from '../types'

interface Props {
  navigate: NavigateFn
  onCreated: () => void
}

const currencies = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)', 'AUD (A$)']

export default function CreateTripScreen({ navigate, onCreated }: Props) {
  const [form, setForm] = useState({
    name: 'Europe Adventure',
    destination: 'Europe',
    startDate: '2026-09-12',
    endDate: '2026-09-20',
    currency: 'INR (₹)',
    budget: '60000',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleCreate = () => {
    onCreated()
    navigate('trip-dashboard')
  }

  return (
    <div className="p-8 max-w-2xl">
      <button
        onClick={() => navigate('home')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to trips
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Trip
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Plan your trip</h1>
        <p className="text-gray-500 mt-1.5">Set up your budget and get real-time AI tracking.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Trip Name</label>
            <input
              type="text"
              value={form.name}
              onChange={set('name')}
              placeholder="e.g. Europe Adventure"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <input
                type="text"
                value={form.destination}
                onChange={set('destination')}
                placeholder="e.g. Paris, France"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={set('startDate')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
            <input
              type="date"
              value={form.endDate}
              onChange={set('endDate')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Home Currency</label>
            <select
              value={form.currency}
              onChange={set('currency')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white transition-all"
            >
              {currencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Budget</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">₹</span>
              <input
                type="number"
                value={form.budget}
                onChange={set('budget')}
                placeholder="60000"
                className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              />
            </div>
          </div>
        </div>

        {form.budget && (
          <div className="bg-indigo-50 rounded-xl p-4 flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-500 shrink-0" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm text-indigo-700">
              AI Guardian will track your spending and alert you if you are at risk of going over budget.
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleCreate}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            Create Trip
          </button>
          <button
            onClick={() => navigate('home')}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
