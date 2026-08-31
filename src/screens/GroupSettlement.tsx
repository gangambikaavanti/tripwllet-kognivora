import { useState } from 'react'
import type { NavigateFn } from '../types'

interface Props {
  navigate: NavigateFn
}

const members = [
  { name: 'You', avatar: 'A', color: 'from-indigo-500 to-violet-600', balance: 2000, owes: false },
  { name: 'Asha', avatar: 'A', color: 'from-pink-500 to-rose-500', balance: -1000, owes: true },
  { name: 'Ravi', avatar: 'R', color: 'from-cyan-500 to-blue-500', balance: -1000, owes: true },
]

const settlements = [
  { from: 'Asha', to: 'You', amount: 1000, done: false },
  { from: 'Ravi', to: 'You', amount: 1000, done: false },
]

const groupExpenses = [
  { merchant: 'Hotel Roma', amount: 16920, split: 3, paidBy: 'Ravi' },
  { merchant: 'Group Dinner', amount: 5640, split: 3, paidBy: 'You' },
  { merchant: 'Museum Tickets', amount: 2700, split: 3, paidBy: 'Asha' },
]

export default function GroupSettlement({ navigate }: Props) {
  const [settled, setSettled] = useState<Record<string, boolean>>({})

  const markSettled = (key: string) => setSettled((s) => ({ ...s, [key]: true }))

  const totalGroup = groupExpenses.reduce((s, e) => s + e.amount, 0)

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Group Settlement
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Group expenses</h1>
        <p className="text-gray-500 mt-1.5">Europe Adventure &nbsp;·&nbsp; 3 members</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {members.map((m) => (
          <div key={m.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${m.color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
                {m.avatar}
              </div>
              <div>
                <p className="font-bold text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-400">{m.owes ? 'Owes money' : 'Is owed'}</p>
              </div>
            </div>
            <div className={`rounded-xl px-4 py-3 ${m.balance > 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <p className="text-xs font-medium mb-0.5" style={{ color: m.balance > 0 ? '#065F46' : '#991B1B' }}>
                {m.balance > 0 ? 'Owed to you' : 'Owes'}
              </p>
              <p className={`text-xl font-bold ${m.balance > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                ₹{Math.abs(m.balance).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Group Expenses</h3>
            <span className="text-sm font-bold text-gray-900">₹{totalGroup.toLocaleString()}</span>
          </div>
          <div className="space-y-3">
            {groupExpenses.map((e) => (
              <div key={e.merchant} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{e.merchant}</p>
                  <p className="text-xs text-gray-400">Paid by {e.paidBy} &nbsp;·&nbsp; Split {e.split} ways</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">₹{e.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">₹{Math.round(e.amount / e.split).toLocaleString()} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Suggested Settlement</h3>
          <div className="space-y-3">
            {settlements.map((s, i) => {
              const key = `${s.from}-${s.to}`
              const isDone = settled[key]
              return (
                <div key={i} className={`p-4 rounded-xl border transition-all ${isDone ? 'bg-emerald-50 border-emerald-200 opacity-70' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-sm font-bold ${isDone ? 'text-emerald-700' : 'text-gray-900'}`}>{s.from}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                    <span className={`text-sm font-bold ${isDone ? 'text-emerald-700' : 'text-gray-900'}`}>{s.to}</span>
                    <span className={`ml-auto text-sm font-bold ${isDone ? 'text-emerald-700' : 'text-indigo-600'}`}>
                      ₹{s.amount.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => markSettled(key)}
                    disabled={isDone}
                    className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isDone
                        ? 'bg-emerald-200 text-emerald-700 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isDone ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Settled
                      </span>
                    ) : 'Mark as Settled'}
                  </button>
                </div>
              )
            })}
          </div>

          <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-indigo-700">Your total balance</span>
              <span className="text-lg font-bold text-emerald-600">+₹2,000</span>
            </div>
            <p className="text-xs text-indigo-400 mt-0.5">You are owed ₹2,000 in total</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('trip-dashboard')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to dashboard
      </button>
    </div>
  )
}
