import { useState } from 'react'
import { Search, ClipboardList } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { useActivityLogs } from '@/hooks/useActivityLogs'
import { BlurFade } from '@/components/magicui/blur-fade'
import { cn } from '@/lib/utils'

const ACTION_CONFIG = {
  create: { label: '新增', className: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  update: { label: '編輯', className: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100' },
  delete: { label: '刪除', className: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100' },
}

const RESOURCE_LABEL: Record<string, string> = {
  vehicle: '車輛',
  employee: '員工',
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  })
}

export default function ActivityLog() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useActivityLogs({ q: search || undefined, pageSize: 100 })
  const logs = data?.data ?? []

  return (
    <div className="p-6 space-y-6">
      <BlurFade delay={0}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
            <ClipboardList size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">使用者紀錄</h1>
            <p className="text-sm text-slate-500">查看所有操作歷程</p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.05}>
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="搜尋使用者、操作、資源..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </BlurFade>

      <BlurFade delay={0.1}>
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="w-44 text-slate-600 font-medium">時間</TableHead>
                <TableHead className="text-slate-600 font-medium">使用者</TableHead>
                <TableHead className="text-slate-600 font-medium">操作</TableHead>
                <TableHead className="text-slate-600 font-medium">資源類型</TableHead>
                <TableHead className="text-slate-600 font-medium">資源</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                    載入中...
                  </TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                    {search ? '找不到符合的紀錄' : '尚無操作紀錄'}
                  </TableCell>
                </TableRow>
              ) : (
                logs.map(log => {
                  const action = ACTION_CONFIG[log.action]
                  return (
                    <TableRow key={log.id} className="hover:bg-slate-50/60">
                      <TableCell className="text-sm text-slate-500 font-mono tabular-nums">
                        {formatTime(log.timestamp)}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-slate-800">
                        {log.userName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('text-xs', action.className)}>
                          {action.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {RESOURCE_LABEL[log.resource] ?? log.resource}
                      </TableCell>
                      <TableCell className="text-sm text-slate-800 font-medium">
                        {log.resourceLabel}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
          {!isLoading && logs.length > 0 && (
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-400">共 {data?.total ?? 0} 筆紀錄</p>
            </div>
          )}
        </div>
      </BlurFade>
    </div>
  )
}
