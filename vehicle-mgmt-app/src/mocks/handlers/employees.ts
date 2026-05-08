import { http, HttpResponse } from 'msw'
import { employees as seedEmployees, type Employee } from '../data/employees'
import { appendLog } from '../data/activityLogs'

let store: Employee[] = [...seedEmployees]

export const employeeHandlers = [
  http.get('/api/employees', () => {
    return HttpResponse.json(store)
  }),

  http.post('/api/employees', async ({ request }) => {
    const body = await request.json() as Omit<Employee, 'id'>
    const newEmployee: Employee = { ...body, id: String(Date.now()) }
    store.push(newEmployee)
    appendLog({ action: 'create', resource: 'employee', resourceId: newEmployee.id, resourceLabel: newEmployee.name })
    return HttpResponse.json(newEmployee, { status: 201 })
  }),

  http.put('/api/employees/:id', async ({ params, request }) => {
    const body = await request.json() as Partial<Employee>
    const idx = store.findIndex(e => e.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    store[idx] = { ...store[idx], ...body, id: store[idx].id }
    appendLog({ action: 'update', resource: 'employee', resourceId: store[idx].id, resourceLabel: store[idx].name })
    return HttpResponse.json(store[idx])
  }),

  http.delete('/api/employees/:id', ({ params }) => {
    const idx = store.findIndex(e => e.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    const [removed] = store.splice(idx, 1)
    appendLog({ action: 'delete', resource: 'employee', resourceId: removed.id, resourceLabel: removed.name })
    return new HttpResponse(null, { status: 204 })
  }),
]
