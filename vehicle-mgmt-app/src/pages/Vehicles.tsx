import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { VehicleFormDialog } from '@/components/VehicleFormDialog'
import { useVehicles, useCreateVehicle, useUpdateVehicle, useDeleteVehicle } from '@/hooks/useVehicles'
import { MagicCard } from '@/components/magicui/magic-card'
import { BlurFade } from '@/components/magicui/blur-fade'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import type { Vehicle } from '@/api/vehicles'

const STATUS_CONFIG: Record<Vehicle['status'], { label: string; className: string }> = {
  available: { label: '可用', className: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  'in-use': { label: '使用中', className: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100' },
  maintenance: { label: '維修中', className: 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100' },
}

export default function Vehicles() {
  const { data: vehicles = [], isLoading } = useVehicles()
  const createMutation = useCreateVehicle()
  const updateMutation = useUpdateVehicle()
  const deleteMutation = useDeleteVehicle()

  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Vehicle | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null)

  const filtered = vehicles.filter(v =>
    v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
    v.model.toLowerCase().includes(search.toLowerCase())
  )

  function handleAdd() { setEditTarget(null); setDialogOpen(true) }
  function handleEdit(v: Vehicle) { setEditTarget(v); setDialogOpen(true) }

  async function handleFormSubmit(data: Omit<Vehicle, 'id'>) {
    if (editTarget) await updateMutation.mutateAsync({ id: editTarget.id, data })
    else await createMutation.mutateAsync(data)
    setDialogOpen(false)
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return
    await deleteMutation.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0s]" />
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.05}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              <AnimatedGradientText>車輛管理</AnimatedGradientText>
            </h2>
            <p className="text-sm text-slate-500 mt-1">共 {vehicles.length} 輛車輛</p>
          </div>
          <Button
            onClick={handleAdd}
            className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-md shadow-purple-200 transition-all hover:shadow-purple-300"
          >
            <Plus size={16} />
            新增車輛
          </Button>
        </div>
      </BlurFade>

      {/* Search */}
      <BlurFade delay={0.1}>
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="搜尋車牌或型號..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-white border-slate-200 focus:border-indigo-300"
          />
        </div>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.15}>
        <MagicCard gradientColor="#6366f110" className="overflow-hidden rounded-xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200">
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide pl-5">車牌號碼</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">品牌</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">型號</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">年份</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">狀態</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right pr-5">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Car size={32} className="opacity-30" />
                      <p className="text-sm">沒有符合的車輛資料</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((v) => (
                <TableRow
                  key={v.id}
                  className="group border-b border-slate-100 hover:bg-indigo-50/40 transition-colors"
                >
                  <TableCell className="pl-5 font-mono font-semibold text-slate-800 text-sm">{v.licensePlate}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{v.brand}</TableCell>
                  <TableCell className="text-slate-700 font-medium text-sm">{v.model}</TableCell>
                  <TableCell className="text-slate-500 text-sm">{v.year}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs font-medium px-2.5 ${STATUS_CONFIG[v.status].className}`}>
                      {STATUS_CONFIG[v.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-5">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(v)}
                        className="h-8 w-8 p-0 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteTarget(v)}
                        className="h-8 w-8 p-0 border-slate-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MagicCard>
      </BlurFade>

      <VehicleFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleFormSubmit}
        initial={editTarget}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      <Dialog open={!!deleteTarget} onOpenChange={v => !v && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-800">確認刪除</DialogTitle>
          </DialogHeader>
          <div className="py-2 px-1">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100 mb-4">
              <Trash2 size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-600">
                確定要刪除車輛 <span className="font-semibold text-slate-800">{deleteTarget?.licensePlate}</span>？此操作無法復原。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} className="border-slate-200">取消</Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600 border-0 text-white"
            >
              {deleteMutation.isPending ? '刪除中...' : '確認刪除'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
