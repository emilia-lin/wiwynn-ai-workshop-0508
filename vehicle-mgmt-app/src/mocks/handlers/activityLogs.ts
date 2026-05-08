import { http, HttpResponse } from 'msw'
import { activityLogs } from '../data/activityLogs'

export const activityLogHandlers = [
  http.get('/api/activity-logs', ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')?.toLowerCase() ?? ''
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))
    const pageSize = Math.max(1, Number(url.searchParams.get('pageSize') ?? 20))

    const sorted = [...activityLogs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

    const filtered = q
      ? sorted.filter(
          log =>
            log.userName.toLowerCase().includes(q) ||
            log.resourceLabel.toLowerCase().includes(q) ||
            log.action.includes(q) ||
            log.resource.includes(q),
        )
      : sorted

    const total = filtered.length
    const data = filtered.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({ data, total })
  }),
]
