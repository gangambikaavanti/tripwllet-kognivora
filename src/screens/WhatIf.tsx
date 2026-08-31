import { useState } from 'react'
import type { NavigateFn } from '../types'

interface Props {
  navigate: NavigateFn
}

const categories = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other']

const EUR_TO_INR = 94

export default function WhatIf({ navigate }: Props) {
  const [amount, setAmount] = useState('80')
  const [category, setCategory] = useState('Activities')
  const [description, setDescription] = useState('Sunset boat tour')
  const [simulated, setSimulated] = useState(false)

  const numAmount = parseFloat(amount) || 0
  const convertedAmount = Math.round(numAmount * EUR_TO_INR)
  const beforeProjected = 64872
  const afterProjected = beforeProjected + convertedAmount
  const canAfford = afterProjected <= 60000
  const extraOver = afterProjected - beforeProjected

  return (
    <div className="p-8 max-w-2xl">
      <button
        onClick={() => navigate('ai-guardian')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to AI Guardian
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          </svg>
          What-If Planner
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Can I afford this?</h1>
        <p className="text-gray-500 mt-1.5">Test a future expense before you spend.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <h3 className="font-semibold text-gray-800 mb-4">Expense to simulate</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount (EUR)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setSimulated(false) }}
                className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              />
            </div>
            {numAmount > 0 && (
              <p className="text-xs text-indigo-500 mt-1.5">≈ ₹{convertedAmount.toLocaleString()} at current exchange rate</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setSimulated(false) }}
                  className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                    category === c ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => { setDescription(e.target.value); setSimulated(false) }}
              placeholder="e.g. Sunset boat tour"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
        </div>

        <button
          onClick={() => setSimulated(true)}
          className="mt-5 w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          </svg>
          Simulate
        </button>
      </div>

      {simulated && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Simulation Result</h3>

            <div className="flex items-center justify-center mb-5">
              <div className="text-center px-6 py-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Expense amount</p>
                <p className="text-2xl font-bold text-gray-900">€{numAmount} <span className="text-gray-400 font-normal text-lg">≈</span> ₹{convertedAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Before</p>
                <p className="text-xs text-gray-500 mb-0.5">Projected final spend</p>
                <p className="text-xl font-bold text-gray-900">₹{beforeProjected.toLocaleString()}</p>
              </div>
              <div className={`p-4 rounded-xl ${canAfford ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <p className={`text-xs mb-1 ${canAfford ? 'text-emerald-500' : 'text-red-400'}`}>After</p>
                <p className={`text-xs mb-0.5 ${canAfford ? 'text-emerald-600' : 'text-red-500'}`}>Projected final spend</p>
                <p className={`text-xl font-bold ${canAfford ? 'text-emerald-700' : 'text-red-700'}`}>₹{afterProjected.toLocaleString()}</p>
              </div>
            </div>

            <div className={`rounded-xl p-4 flex items-start gap-3 mb-4 ${canAfford ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${canAfford ? 'bg-emerald-100' : 'bg-red-100'}`}>
                {canAfford ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`font-bold text-sm ${canAfford ? 'text-emerald-800' : 'text-red-800'}`}>
                  {canAfford ? 'Recommended' : 'Not recommended'}
                </p>
                <p className={`text-sm mt-0.5 ${canAfford ? 'text-emerald-700' : 'text-red-700'}`}>
                  {canAfford
                    ? `This expense fits within your budget. You will still be on track.`
                    : `This activity increases your projected overspend by ₹${extraOver.toLocaleString()}.`}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              </svg>
              <p className="text-sm text-amber-800">
                <span className="font-semibold">AI says: </span>
                To afford this activity, keep your daily spending below <span className="font-semibold">₹1,400</span> for the remaining trip.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('trip-dashboard')}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                canAfford ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Add Anyway
            </button>
            <button
              onClick={() => setSimulated(false)}
              className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
