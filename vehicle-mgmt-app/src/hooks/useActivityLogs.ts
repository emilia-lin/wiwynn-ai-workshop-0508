import { useQuery } from '@tanstack/react-query'
import { getActivityLogs, type ActivityLogParams } from '@/api/activityLogs'

export function useActivityLogs(params: ActivityLogParams = {}) {
  return useQuery({
    queryKey: ['activity-logs', params],
    queryFn: () => getActivityLogs(params),
  })
}
