import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, type Employee } from '@/api/employees'

const QUERY_KEY = ['employees']

export function useEmployees() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: getEmployees })
}

export function useCreateEmployee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useUpdateEmployee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Employee, 'id'>> }) => updateEmployee(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useDeleteEmployee() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
