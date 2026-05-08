import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { vehicleHandlers } from './handlers/vehicles'
import { employeeHandlers } from './handlers/employees'
import { activityLogHandlers } from './handlers/activityLogs'

export const worker = setupWorker(...authHandlers, ...vehicleHandlers, ...employeeHandlers, ...activityLogHandlers)
