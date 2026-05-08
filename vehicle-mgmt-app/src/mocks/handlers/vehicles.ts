import { http, HttpResponse } from 'msw'
import { vehicles as seedVehicles, type Vehicle } from '../data/vehicles'
import { appendLog } from '../data/activityLogs'

let store: Vehicle[] = [...seedVehicles]

export const vehicleHandlers = [
  http.get('/api/vehicles', () => {
    return HttpResponse.json(store)
  }),

  http.post('/api/vehicles', async ({ request }) => {
    const body = await request.json() as Omit<Vehicle, 'id'>
    const newVehicle: Vehicle = { ...body, id: String(Date.now()) }
    store.push(newVehicle)
    appendLog({ action: 'create', resource: 'vehicle', resourceId: newVehicle.id, resourceLabel: newVehicle.licensePlate })
    return HttpResponse.json(newVehicle, { status: 201 })
  }),

  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const body = await request.json() as Partial<Vehicle>
    const idx = store.findIndex(v => v.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    store[idx] = { ...store[idx], ...body, id: store[idx].id }
    appendLog({ action: 'update', resource: 'vehicle', resourceId: store[idx].id, resourceLabel: store[idx].licensePlate })
    return HttpResponse.json(store[idx])
  }),

  http.delete('/api/vehicles/:id', ({ params }) => {
    const idx = store.findIndex(v => v.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    const [removed] = store.splice(idx, 1)
    appendLog({ action: 'delete', resource: 'vehicle', resourceId: removed.id, resourceLabel: removed.licensePlate })
    return new HttpResponse(null, { status: 204 })
  }),
]
