import { http, HttpResponse } from 'msw'
import { vehicles as seedVehicles, type Vehicle } from '../data/vehicles'

let store: Vehicle[] = [...seedVehicles]

export const vehicleHandlers = [
  http.get('/api/vehicles', () => {
    return HttpResponse.json(store)
  }),

  http.post('/api/vehicles', async ({ request }) => {
    const body = await request.json() as Omit<Vehicle, 'id'>
    const newVehicle: Vehicle = { ...body, id: String(Date.now()) }
    store.push(newVehicle)
    return HttpResponse.json(newVehicle, { status: 201 })
  }),

  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const body = await request.json() as Partial<Vehicle>
    const idx = store.findIndex(v => v.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    store[idx] = { ...store[idx], ...body, id: store[idx].id }
    return HttpResponse.json(store[idx])
  }),

  http.delete('/api/vehicles/:id', ({ params }) => {
    const idx = store.findIndex(v => v.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    store.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]
