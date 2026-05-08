import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Vehicle } from '@/api/vehicles'

type FormData = Omit<Vehicle, 'id'>

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void
  initial?: Vehicle | null
  loading?: boolean
}

const STATUS_OPTIONS: { value: Vehicle['status']; label: string }[] = [
  { value: 'available', label: '可用' },
  { value: 'in-use', label: '使用中' },
  { value: 'maintenance', label: '維修中' },
]

export function VehicleFormDialog({ open, onClose, onSubmit, initial, loading }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  useEffect(() => {
    if (open) {
      reset(initial ? {
        licensePlate: initial.licensePlate,
        brand: initial.brand,
        model: initial.model,
        year: initial.year,
        status: initial.status,
      } : { licensePlate: '', brand: '', model: '', year: new Date().getFullYear(), status: 'available' })
    }
  }, [open, initial, reset])

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? '編輯車輛' : '新增車輛'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>車牌號碼</Label>
              <Input {...register('licensePlate', { required: '必填' })} placeholder="ABC-1234" />
              {errors.licensePlate && <p className="text-xs text-red-500">{errors.licensePlate.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>品牌</Label>
              <Input {...register('brand', { required: '必填' })} placeholder="Toyota" />
              {errors.brand && <p className="text-xs text-red-500">{errors.brand.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>型號</Label>
              <Input {...register('model', { required: '必填' })} placeholder="Camry" />
              {errors.model && <p className="text-xs text-red-500">{errors.model.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>年份</Label>
              <Input
                type="number"
                {...register('year', { required: '必填', valueAsNumber: true, min: { value: 1990, message: '年份需 ≥ 1990' } })}
                placeholder="2023"
              />
              {errors.year && <p className="text-xs text-red-500">{errors.year.message}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>狀態</Label>
            <select
              {...register('status', { required: '必填' })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>取消</Button>
            <Button type="submit" disabled={loading}>{loading ? '儲存中...' : '儲存'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
