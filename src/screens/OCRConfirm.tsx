import { useState } from 'react'
import type { NavigateFn } from '../types'

interface Props {
  navigate: NavigateFn
}

export default function OCRConfirm({ navigate }: Props) {
  const [fields, setFields] = useState({
    merchant: 'Restaurant Milano',
    amount: '42.00',
    currency: 'EUR',
    date: '2026-09-15',
    category: 'Food',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [field]: e.target.value }))

  const converted = Math.round(parseFloat(fields.amount || '0') * 94)

  return (
    <div className="p-8 max-w-4xl">
      <button
        onClick={() => navigate('receipt-scanner')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to scanner
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          OCR Result
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Review extracted expense</h1>
        <p className="text-gray-500 mt-1.5">All fields have been extracted by AI. Review and confirm before adding.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-50 h-10 flex items-center px-4 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Receipt Preview</span>
          </div>
          <div className="p-6 flex flex-col items-center justify-center min-h-[380px]">
            <div className="w-52 bg-white border border-gray-200 rounded-xl shadow-lg p-5 font-mono text-xs space-y-1.5">
              <div className="text-center font-bold text-sm text-gray-900 mb-3">RESTAURANT MILANO</div>
              <div className="text-center text-gray-400 text-xs mb-3">Via Roma 14, Roma</div>
              <div className="border-t border-dashed border-gray-200 pt-2 space-y-1">
                <div className="flex justify-between"><span>Pasta Carbonara</span><span>€18.00</span></div>
                <div className="flex justify-between"><span>Bruschetta</span><span>€8.50</span></div>
                <div className="flex justify-between"><span>Tiramisu</span><span>€9.50</span></div>
                <div className="flex justify-between"><span>Acqua Nat.</span><span>€3.00</span></div>
                <div className="flex justify-between"><span>Coperto x2</span><span>€3.00</span></div>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-2">
                <div className="flex justify-between font-bold text-sm"><span>TOTALE</span><span>€42.00</span></div>
              </div>
              <div className="text-center text-gray-400 mt-2">15/09/2026  19:43</div>
              <div className="text-center text-gray-400">Grazie!</div>
            </div>
          </div>
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-xs font-semibold text-emerald-700">OCR Confidence</span>
              </div>
              <span className="text-sm font-bold text-emerald-700">96%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-50 h-10 flex items-center justify-between px-4 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Extracted Fields</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              </svg>
              AI categorized as Food
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Merchant</label>
              <input
                type="text"
                value={fields.merchant}
                onChange={set('merchant')}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Amount</label>
                <input
                  type="text"
                  value={fields.amount}
                  onChange={set('amount')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Currency</label>
                <select
                  value={fields.currency}
                  onChange={set('currency')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                >
                  {['EUR', 'INR', 'USD', 'GBP'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Date</label>
                <input
                  type="date"
                  value={fields.date}
                  onChange={set('date')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Category</label>
                <select
                  value={fields.category}
                  onChange={set('category')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                >
                  {['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-500">Conversion preview</p>
                <p className="text-sm font-bold text-indigo-700 mt-0.5">
                  €{fields.amount} → ₹{converted.toLocaleString()}
                </p>
              </div>
              <span className="text-xs text-indigo-400">Home currency: INR</span>
            </div>
          </div>

          <div className="px-5 pb-5 flex gap-3">
            <button
              onClick={() => navigate('trip-dashboard')}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
            >
              Confirm &amp; Add Expense
            </button>
            <button
              className="px-5 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
