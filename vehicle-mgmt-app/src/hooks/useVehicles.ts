import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getVehicles, createVehicle, updateVehicle, deleteVehicle, type Vehicle } from '@/api/vehicles'

const QUERY_KEY = ['vehicles']

export function useVehicles() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: getVehicles })
}

export function useCreateVehicle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useUpdateVehicle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Vehicle, 'id'>> }) => updateVehicle(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useDeleteVehicle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
