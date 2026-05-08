export interface LoginResponse {
  token: string
  name: string
  role: 'admin' | 'user'
}

export async function loginApi(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error((data as { message?: string }).message || '帳號或密碼錯誤')
  }
  return res.json()
}
