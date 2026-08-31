import { useState } from 'react'
import type { NavigateFn, Expense } from '../types'

interface Props {
  navigate: NavigateFn
  expenses: Expense[]
}

const filters = ['All', 'Food', 'Transport', 'Stay', 'Activities', 'Shopping']

const catColors: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Accommodation: 'bg-violet-100 text-violet-700',
  Stay: 'bg-violet-100 text-violet-700',
  Activities: 'bg-cyan-100 text-cyan-700',
  Shopping: 'bg-pink-100 text-pink-700',
}

export default function ExpenseHistory({ navigate, expenses }: Props) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = expenses.filter((e) => {
    const matchFilter = filter === 'All' || e.category === filter || (filter === 'Stay' && e.category === 'Accommodation')
    const matchSearch = !search || e.merchant.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const total = expenses.reduce((s, e) => s + e.convertedAmount, 0)

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2V4a2 2 0 0 0-2-2z" />
            </svg>
            Expense History
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-500 mt-1">Europe Adventure &nbsp;·&nbsp; 12 Sep – 20 Sep 2026</p>
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

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Avg per Day</p>
          <p className="text-2xl font-bold text-gray-900">₹{Math.round(total / 3).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
          <div className="flex gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Date', 'Merchant', 'Category', 'Paid By', 'Original', 'Converted', ''].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((exp, i) => (
              <tr key={exp.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{exp.date}</td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-semibold text-gray-900">{exp.merchant}</p>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${catColors[exp.category] || 'bg-gray-100 text-gray-600'}`}>
                    {exp.category}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{exp.paidBy}</td>
                <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">
                  {exp.currency === 'EUR' ? '€' : '₹'}{exp.amount}
                </td>
                <td className="px-4 py-3.5 text-sm font-semibold text-indigo-600">
                  ₹{exp.convertedAmount.toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <p className="font-medium">No expenses found</p>
            <p className="text-sm mt-1">Try a different filter or search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
