import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Employee } from '@/api/employees'

type FormData = Omit<Employee, 'id'>

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void
  initial?: Employee | null
  loading?: boolean
}

export function EmployeeFormDialog({ open, onClose, onSubmit, initial, loading }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  useEffect(() => {
    if (open) {
      reset(initial
        ? { name: initial.name, department: initial.department, role: initial.role, email: initial.email }
        : { name: '', department: '', role: '', email: '' })
    }
  }, [open, initial, reset])

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? '編輯員工' : '新增員工'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>姓名</Label>
              <Input {...register('name', { required: '必填' })} placeholder="王小明" />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>部門</Label>
              <Input {...register('department', { required: '必填' })} placeholder="業務部" />
              {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>職稱</Label>
              <Input {...register('role', { required: '必填' })} placeholder="業務專員" />
              {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                {...register('email', { required: '必填', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email 格式錯誤' } })}
                placeholder="user@company.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
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
