import { http, HttpResponse } from 'msw'
import { setCurrentUser } from '../data/activityLogs'

const USERS = [
  { username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { username: 'user1', password: 'user123', name: 'Alice', role: 'user' as const },
]

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { username: string; password: string }
    const found = USERS.find(u => u.username === body.username && u.password === body.password)
    if (!found) {
      return HttpResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 })
    }
    setCurrentUser(found.username, found.name)
    return HttpResponse.json({
      token: `mock-token-${found.username}-${Date.now()}`,
      name: found.name,
      role: found.role,
    })
  }),
]
