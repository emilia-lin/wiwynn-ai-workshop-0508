import { http, HttpResponse } from 'msw'
import { employees as seedEmployees, type Employee } from '../data/employees'

let store: Employee[] = [...seedEmployees]

export const employeeHandlers = [
  http.get('/api/employees', () => {
    return HttpResponse.json(store)
  }),

  http.post('/api/employees', async ({ request }) => {
    const body = await request.json() as Omit<Employee, 'id'>
    const newEmployee: Employee = { ...body, id: String(Date.now()) }
    store.push(newEmployee)
    return HttpResponse.json(newEmployee, { status: 201 })
  }),

  http.put('/api/employees/:id', async ({ params, request }) => {
    const body = await request.json() as Partial<Employee>
    const idx = store.findIndex(e => e.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    store[idx] = { ...store[idx], ...body, id: store[idx].id }
    return HttpResponse.json(store[idx])
  }),

  http.delete('/api/employees/:id', ({ params }) => {
    const idx = store.findIndex(e => e.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    store.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]
