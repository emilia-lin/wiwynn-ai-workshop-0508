import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Sidebar } from './Sidebar'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': '儀表板',
  '/vehicles': '車輛管理',
  '/employees': '員工管理',
}

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 px-6 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              {PAGE_TITLES[pathname] ?? '頁面'}
            </h2>
            <p className="text-xs text-slate-400 leading-tight">Fleet Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-[9px] font-bold text-white">
                {user?.name?.[0] ?? '?'}
              </div>
              <span className="text-xs font-medium text-slate-700">{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            >
              <LogOut size={15} />
              登出
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
