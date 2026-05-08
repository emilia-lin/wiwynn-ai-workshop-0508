import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { vehicleHandlers } from './handlers/vehicles'
import { employeeHandlers } from './handlers/employees'

export const worker = setupWorker(...authHandlers, ...vehicleHandlers, ...employeeHandlers)
