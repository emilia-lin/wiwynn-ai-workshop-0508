export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: 'create' | 'update' | 'delete'
  resource: 'vehicle' | 'employee'
  resourceId: string
  resourceLabel: string
  timestamp: string
}

export const activityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: 'admin',
    userName: 'Admin User',
    action: 'create',
    resource: 'vehicle',
    resourceId: '1',
    resourceLabel: 'ABC-1234',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    userId: 'admin',
    userName: 'Admin User',
    action: 'update',
    resource: 'vehicle',
    resourceId: '2',
    resourceLabel: 'DEF-5678',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: '3',
    userId: 'admin',
    userName: 'Admin User',
    action: 'create',
    resource: 'employee',
    resourceId: '1',
    resourceLabel: 'Alice Chen',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
]

let currentUser = { userId: 'system', userName: '系統' }

export function setCurrentUser(userId: string, userName: string) {
  currentUser = { userId, userName }
}

export function getCurrentUser() {
  return currentUser
}

export function appendLog(entry: Omit<ActivityLog, 'id' | 'userId' | 'userName' | 'timestamp'>) {
  const { userId, userName } = getCurrentUser()
  activityLogs.push({
    ...entry,
    id: String(Date.now()),
    userId,
    userName,
    timestamp: new Date().toISOString(),
  })
}
