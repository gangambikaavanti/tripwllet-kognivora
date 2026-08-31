import type { Screen, NavigateFn } from '../types'

interface NavProps {
  currentScreen: Screen
  navigate: NavigateFn
}

const dashboardScreens: Screen[] = ['trip-dashboard']
const tripsScreens: Screen[] = ['home', 'create-trip']
const expensesScreens: Screen[] = [
  'expense-history',
  'add-expense',
  'receipt-scanner',
  'ocr-confirm',
]
const guardianScreens: Screen[] = ['ai-guardian', 'what-if']

function isActive(screens: Screen[], current: Screen) {
  return screens.includes(current)
}

export default function Nav({ currentScreen, navigate }: NavProps) {
  return (
    <nav
      className="
        w-16 md:w-60
        bg-white
        border-r border-teal-100
        flex flex-col
        shrink-0
        h-full
      "
    >

      {/* LOGO */}
      <div className="p-3 md:p-5 border-b border-gray-100">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">

            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M16 12a2 2 0 0 0-2-2h-3v4h3a2 2 0 0 0 2-2z" />
            </svg>

          </div>

          {/* Hide text on phone */}
          <div className="hidden md:block">

            <div className="font-bold text-[#164e63] text-sm leading-tight">
              TripWallet
            </div>

            <div className="text-xs text-gray-400 leading-tight">
              Smart Travel
            </div>

          </div>

        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 p-2 md:p-3 overflow-y-auto">

        <p className="hidden md:block text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-1">
          Menu
        </p>

        <div className="space-y-1">

          <NavItem
            label="Dashboard"
            active={isActive(dashboardScreens, currentScreen)}
            onClick={() => navigate('trip-dashboard')}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            }
          />

          <NavItem
            label="My Trips"
            active={isActive(tripsScreens, currentScreen)}
            onClick={() => navigate('home')}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            }
          />

          <NavItem
            label="Expenses"
            active={isActive(expensesScreens, currentScreen)}
            onClick={() => navigate('expense-history')}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2V4a2 2 0 0 0-2-2z" />
                <path d="M9 9h6M9 13h6M9 17h2" />
              </svg>
            }
          />

          <NavItem
            label="AI Guardian"
            active={isActive(guardianScreens, currentScreen)}
            onClick={() => navigate('ai-guardian')}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                <path d="M5.5 17.5l.75 2.25L8.5 20.5l-2.25.75L5.5 23.5l-.75-2.25L2.5 20.5l2.25-.75L5.5 17.5z" />
              </svg>
            }
          />

          <NavItem
            label="Group Settlement"
            active={currentScreen === 'group-settlement'}
            onClick={() => navigate('group-settlement')}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />

        </div>

        {/* CURRENT TRIP */}
        <div className="hidden md:block">

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-5">
            Current Trip
          </p>

          <div className="mx-1 p-3 bg-teal-50 rounded-xl border border-teal-100">

            <div className="flex items-center gap-2 mb-2">

              <div className="w-2 h-2 bg-emerald-500 rounded-full" />

              <span className="text-xs font-semibold text-teal-700">
                Europe Adventure
              </span>

            </div>

            <div className="text-xs text-teal-600">
              12 Sep – 20 Sep 2026
            </div>

            <div className="mt-2">

              <div className="flex justify-between text-xs mb-1">

                <span className="text-teal-600">
                  Budget used
                </span>

                <span className="text-teal-700 font-semibold">
                  44%
                </span>

              </div>

              <div className="w-full bg-teal-100 rounded-full h-1.5">

                <div
                  className="h-1.5 rounded-full bg-teal-500"
                  style={{ width: '44%' }}
                />

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* PROFILE */}
      <div className="p-2 md:p-3 border-t border-gray-100">

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-center md:justify-start gap-3 px-2 md:px-3 py-2.5 rounded-xl hover:bg-teal-50 transition-colors"
        >

          <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
            A
          </div>

          <div className="hidden md:block text-left min-w-0">

            <div className="text-sm font-semibold text-gray-900 truncate">
              Arjun Singh
            </div>

            <div className="text-xs text-gray-400 truncate">
              arjun@example.com
            </div>

          </div>

        </button>

      </div>

    </nav>
  )
}

function NavItem({
  label,
  active,
  onClick,
  icon,
}: {
  label: string
  active: boolean
  onClick: () => void
  icon: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        w-full
        flex items-center
        justify-center md:justify-start
        gap-3
        px-2 md:px-3
        py-3
        rounded-xl
        text-sm
        font-medium
        transition-all
        ${
          active
            ? 'bg-teal-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
        }
      `}
    >
      {icon}

      <span className="hidden md:inline">
        {label}
      </span>
    </button>
  )
}