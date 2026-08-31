import { useState } from 'react'
import type { NavigateFn } from '../types'

interface Props {
  navigate: NavigateFn
}

const categories = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other']
const currencies = ['INR (₹)', 'EUR (€)', 'USD ($)', 'GBP (£)', 'JPY (¥)']
const payers = ['You', 'Asha', 'Ravi']

const catIcons: Record<string, string> = {
  Food: '🍽️',
  Transport: '🚗',
  Accommodation: '🏨',
  Activities: '⭐',
  Shopping: '🛍️',
  Other: '📦',
}

const EUR_TO_INR = 94

export default function AddExpense({ navigate }: Props) {
  const [amount, setAmount] = useState('1200')
  const [currency, setCurrency] = useState('INR (₹)')
  const [category, setCategory] = useState('Food')
  const [merchant, setMerchant] = useState('')
  const [date, setDate] = useState('2026-09-15')
  const [paidBy, setPaidBy] = useState('You')
  const [notes, setNotes] = useState('')

  const isEur = currency.includes('EUR')
  const numAmount = parseFloat(amount) || 0
  const converted = isEur ? Math.round(numAmount * EUR_TO_INR) : null

  return (
    <div className="p-8 max-w-xl">
      <button
        onClick={() => navigate('trip-dashboard')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to dashboard
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2V4a2 2 0 0 0-2-2z" />
          </svg>
          Add Expense
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add an expense</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Amount</label>
          <div className="flex items-stretch gap-3">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 shrink-0"
            >
              {currencies.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-300 font-light">
                {currency.includes('EUR') ? '€' : '₹'}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-4 text-3xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
          </div>
          {converted !== null && (
            <div className="mt-2 flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 rounded-xl px-3 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span>€{numAmount} → ₹{converted.toLocaleString()}</span>
              <span className="text-indigo-400 text-xs">· current exchange rate</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  category === c
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{catIcons[c]}</span>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Merchant / Description</label>
          <input
            type="text"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            placeholder="e.g. Restaurant Milano"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Paid By</label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            >
              {payers.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes (optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any extra details..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={() => navigate('trip-dashboard')}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            Save Expense
          </button>
          <button
            onClick={() => navigate('receipt-scanner')}
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Scan Receipt
          </button>
        </div>
      </div>
    </div>
  )
}
