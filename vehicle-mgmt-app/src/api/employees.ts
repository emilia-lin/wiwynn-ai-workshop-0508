import type { Employee } from '@/mocks/data/employees'

export type { Employee }

export async function getEmployees(): Promise<Employee[]> {
  const res = await fetch('/api/employees')
  if (!res.ok) throw new Error('Failed to fetch employees')
  return res.json()
}

export async function createEmployee(data: Omit<Employee, 'id'>): Promise<Employee> {
  const res = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create employee')
  return res.json()
}

export async function updateEmployee(id: string, data: Partial<Omit<Employee, 'id'>>): Promise<Employee> {
  const res = await fetch(`/api/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update employee')
  return res.json()
}

export async function deleteEmployee(id: string): Promise<void> {
  const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete employee')
}
