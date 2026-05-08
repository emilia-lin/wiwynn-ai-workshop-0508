import type { Vehicle } from '@/mocks/data/vehicles'

export type { Vehicle }

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('/api/vehicles')
  if (!res.ok) throw new Error('Failed to fetch vehicles')
  return res.json()
}

export async function createVehicle(data: Omit<Vehicle, 'id'>): Promise<Vehicle> {
  const res = await fetch('/api/vehicles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create vehicle')
  return res.json()
}

export async function updateVehicle(id: string, data: Partial<Omit<Vehicle, 'id'>>): Promise<Vehicle> {
  const res = await fetch(`/api/vehicles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update vehicle')
  return res.json()
}

export async function deleteVehicle(id: string): Promise<void> {
  const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete vehicle')
}
