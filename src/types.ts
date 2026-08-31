export type Screen =
  | 'home'
  | 'create-trip'
  | 'trip-dashboard'
  | 'add-expense'
  | 'receipt-scanner'
  | 'ocr-confirm'
  | 'expense-history'
  | 'ai-guardian'
  | 'what-if'
  | 'group-settlement'

export interface Trip {
  id: string
  name: string
  destination: string
  startDate: string
  endDate: string
  currency: string
  budget: number
  spent: number
}

export interface Expense {
  id: string
  tripId: string
  merchant: string
  amount: number
  currency: string
  convertedAmount: number
  category: string
  date: string
  paidBy: string
  notes?: string
}

export type NavigateFn = (screen: Screen) => void
