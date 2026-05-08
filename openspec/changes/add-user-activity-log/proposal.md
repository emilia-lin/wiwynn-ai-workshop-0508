## Why

管理者目前無法追蹤系統內的操作歷程，難以稽核「誰在何時對哪項資源做了什麼」。
新增使用者紀錄頁面，讓 admin 能集中查閱所有登入與 CRUD 操作事件。

## What Changes

- 新增 `/activity-log` 頁面（admin only，受 AdminRoute 保護）
- 新增 Sidebar 導覽項目「使用者紀錄」
- 新增 MSW mock API handler：`GET /api/activity-logs`（支援分頁與篩選）
- 每次呼叫既有的 vehicles / employees mock API 時，同步寫入 in-memory activity log store
- 活動紀錄**唯讀**，不提供新增 / 編輯 / 刪除功能

## Capabilities

### New Capabilities
- `activity-log`：管理者查看使用者操作紀錄的唯讀頁面，含列表、搜尋與時間排序

### Modified Capabilities
- （無 spec-level 行為變更）

## Impact

- **新增檔案**：`src/pages/ActivityLog.tsx`、`src/mocks/handlers/activityLogs.ts`、`src/mocks/data/activityLogs.ts`、`src/hooks/useActivityLogs.ts`、`src/api/activityLogs.ts`
- **修改檔案**：`src/routes.tsx`（新增路由）、`src/components/layout/Sidebar.tsx`（新增導覽項目）、`src/mocks/handlers/vehicles.ts` / `employees.ts`（寫入 activity store）
- **無新增 shadcn/ui 元件**（沿用現有 Table、Badge、Input）
- **無破壞性變更**
