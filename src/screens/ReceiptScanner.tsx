import { useState } from 'react'
import type { NavigateFn } from '../types'

interface Props {
  navigate: NavigateFn
}

type ScanState = 'idle' | 'processing'

export default function ReceiptScanner({ navigate }: Props) {
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [progress, setProgress] = useState(0)

  const startScan = () => {
    setScanState('processing')
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => navigate('ocr-confirm'), 600)
      }
      setProgress(Math.min(Math.round(p), 100))
    }, 200)
  }

  return (
    <div className="p-8 max-w-xl">
      <button
        onClick={() => navigate('add-expense')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
          </svg>
          Receipt Scanner
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Scan your receipt</h1>
        <p className="text-gray-500 mt-1.5">AI will extract merchant, amount, currency and date automatically.</p>
      </div>

      {scanState === 'idle' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <label className="block cursor-pointer">
            <div className="flex flex-col items-center justify-center gap-5 p-14 border-2 border-dashed border-gray-200 m-4 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-800 text-lg">Upload a receipt or take a photo</p>
                <p className="text-gray-400 text-sm mt-1">PNG, JPG, PDF up to 10MB</p>
              </div>
              <input type="file" className="hidden" accept="image/*,application/pdf" onChange={startScan} />
            </div>
          </label>

          <div className="p-4 grid grid-cols-2 gap-3">
            <button
              onClick={startScan}
              className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              Upload Receipt
            </button>
            <button
              onClick={startScan}
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
              Use Camera
            </button>
          </div>

          <div className="px-4 pb-4">
            <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-800">AI-Powered OCR</p>
                <p className="text-xs text-gray-500 mt-0.5">TripWallet uses AI to extract merchant, amount, currency, and date. All fields are editable after extraction.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center gap-6">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#E0E7FF" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke="#4F46E5" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * 213.6} 213.6`}
                className="transition-all duration-200"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-indigo-700 font-bold text-sm">
              {progress}%
            </span>
          </div>

          <div className="text-center">
            <p className="font-bold text-gray-900 text-lg">Analyzing receipt...</p>
            <p className="text-gray-500 text-sm mt-1">Extracting merchant, amount, currency and date</p>
          </div>

          <div className="w-full space-y-2">
            {[
              { label: 'Detecting text regions', done: progress > 25 },
              { label: 'Extracting merchant name', done: progress > 50 },
              { label: 'Reading amounts & currency', done: progress > 75 },
              { label: 'AI categorization', done: progress >= 100 },
            ].map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${step.done ? 'bg-emerald-500' : 'bg-gray-100'}`}>
                  {step.done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${step.done ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
