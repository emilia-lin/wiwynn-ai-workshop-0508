import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Car, Users } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: '儀表板', icon: LayoutDashboard },
  { to: '/vehicles', label: '車輛管理', icon: Car },
]

const adminItems = [
  { to: '/employees', label: '員工管理', icon: Users },
]

export function Sidebar() {
  const { user } = useAuth()
  const items = user?.role === 'admin' ? [...navItems, ...adminItems] : navItems

  return (
    <aside className="w-60 h-screen bg-slate-950 text-white flex flex-col flex-shrink-0 border-r border-slate-800">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
            <Car size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">車輛管理系統</p>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Fleet Management</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 space-y-0.5">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">主選單</p>
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className={cn(
                  'flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-500 group-hover:text-slate-300',
                )}>
                  <Icon size={15} />
                </span>
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User info */}
      <div className="px-5 py-4 border-t border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.[0] ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-300 truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500">
              {user?.role === 'admin' ? '系統管理員' : '一般使用者'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
