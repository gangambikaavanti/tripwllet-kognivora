import { useState } from 'react'
import type { Screen, Trip, Expense } from './types'
import Nav from './components/Nav'
import HomeScreen from './screens/HomeScreen'
import CreateTripScreen from './screens/CreateTripScreen'
import TripDashboard from './screens/TripDashboard'
import AddExpense from './screens/AddExpense'
import ReceiptScanner from './screens/ReceiptScanner'
import OCRConfirm from './screens/OCRConfirm'
import ExpenseHistory from './screens/ExpenseHistory'
import AIGuardian from './screens/AIGuardian'
import WhatIf from './screens/WhatIf'
import GroupSettlement from './screens/GroupSettlement'

const sampleTrips: Trip[] = [
  {
    id: 'europe',
    name: 'Europe Adventure',
    destination: 'Europe',
    startDate: '12 Sep',
    endDate: '20 Sep 2026',
    currency: 'INR',
    budget: 60000,
    spent: 26172,
  },
  {
    id: 'goa',
    name: 'Goa Getaway',
    destination: 'Goa, India',
    startDate: '2 Oct',
    endDate: '6 Oct 2026',
    currency: 'INR',
    budget: 25000,
    spent: 8420,
  },
]

const sampleExpenses: Expense[] = [
  {
    id: '1',
    tripId: 'europe',
    merchant: 'Restaurant Milano',
    amount: 42,
    currency: 'EUR',
    convertedAmount: 3948,
    category: 'Food',
    date: '15 Sep',
    paidBy: 'You',
  },
  {
    id: '2',
    tripId: 'europe',
    merchant: 'Hotel Roma',
    amount: 180,
    currency: 'EUR',
    convertedAmount: 16920,
    category: 'Accommodation',
    date: '14 Sep',
    paidBy: 'Ravi',
  },
  {
    id: '3',
    tripId: 'europe',
    merchant: 'Metro Pass',
    amount: 18,
    currency: 'EUR',
    convertedAmount: 1692,
    category: 'Transport',
    date: '15 Sep',
    paidBy: 'Asha',
  },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [currentTrip, setCurrentTrip] = useState<Trip>(sampleTrips[0])

  const navigate = (s: Screen) => {
    setScreen(s)
    window.scrollTo(0, 0)
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <HomeScreen
            navigate={navigate}
            trips={sampleTrips}
            onSelectTrip={(trip) => { setCurrentTrip(trip); navigate('trip-dashboard') }}
          />
        )
      case 'create-trip':
        return <CreateTripScreen navigate={navigate} onCreated={() => {}} />
      case 'trip-dashboard':
        return <TripDashboard navigate={navigate} trip={currentTrip} expenses={sampleExpenses} />
      case 'add-expense':
        return <AddExpense navigate={navigate} />
      case 'receipt-scanner':
        return <ReceiptScanner navigate={navigate} />
      case 'ocr-confirm':
        return <OCRConfirm navigate={navigate} />
      case 'expense-history':
        return <ExpenseHistory navigate={navigate} expenses={sampleExpenses} />
      case 'ai-guardian':
        return <AIGuardian navigate={navigate} />
      case 'what-if':
        return <WhatIf navigate={navigate} />
      case 'group-settlement':
        return <GroupSettlement navigate={navigate} />
      default:
        return null
    }
  }

  return (
    <div className="flex h-full bg-gray-50 font-sans">
      <Nav currentScreen={screen} navigate={navigate} />
      <main className="flex-1 overflow-y-auto">
        {renderScreen()}
      </main>
    </div>
  )
}
