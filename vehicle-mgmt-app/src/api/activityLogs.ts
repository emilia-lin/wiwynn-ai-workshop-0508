import type { ActivityLog } from '@/mocks/data/activityLogs'

export type { ActivityLog }

export interface ActivityLogParams {
  q?: string
  page?: number
  pageSize?: number
}

export interface ActivityLogResponse {
  data: ActivityLog[]
  total: number
}

export async function getActivityLogs(params: ActivityLogParams = {}): Promise<ActivityLogResponse> {
  const url = new URL('/api/activity-logs', window.location.origin)
  if (params.q) url.searchParams.set('q', params.q)
  if (params.page) url.searchParams.set('page', String(params.page))
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch activity logs')
  return res.json()
}
