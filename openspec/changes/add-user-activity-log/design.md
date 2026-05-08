## Context

目前系統具備車輛管理與員工管理的 CRUD 操作，但缺乏操作歷程追蹤。
管理者無法得知「誰在何時對哪筆資料做了什麼」，不利稽核與問題排查。

本設計在不引入真實後端的前提下，透過 MSW in-memory store 攔截既有 API 呼叫，
自動記錄操作事件，並提供 admin-only 的查閱頁面。

## Goals / Non-Goals

**Goals:**
- 在既有 vehicles / employees MSW handler 寫入時，自動附寫一筆 activity log
- 提供 `GET /api/activity-logs` endpoint，支援分頁（page / pageSize）與關鍵字搜尋
- 新增 `/activity-log` admin-only 頁面，以表格呈現操作紀錄，支援關鍵字搜尋與時間排序（最新在上）
- 在 Sidebar 加入「使用者紀錄」導覽項目（admin 可見）

**Non-Goals:**
- 真實後端 / 持久化儲存（重新整理後 log 重置為 seed 資料）
- 登入 / 登出事件的記錄
- log 的刪除、匯出功能
- 行動裝置 RWD 優化

## Decisions

### D1：Activity log 寫入位置 — MSW handler 層，非 React Query mutation
在 MSW handler 攔截 POST / PUT / DELETE 請求時直接寫入 activity store，
而非在前端 React Query `onSuccess` callback 中額外呼叫 API。
**理由**：handler 層是最接近「模擬後端」的位置，前端程式碼無需感知 log 機制；
且 React 層寫入需要額外的 mutation hook，增加耦合。

### D2：Activity log store — 共用模組層級變數
在 `src/mocks/data/activityLogs.ts` 匯出一個可被多個 handler 引用的陣列，
vehicles / employees handler 直接 `push` 新事件。
**理由**：與既有 vehicles / employees seed data 模式一致，無需引入額外狀態管理。

### D3：Activity log 資料模型
```ts
interface ActivityLog {
  id: string            // nanoid or timestamp-based
  userId: string        // from mock auth (hard-coded 'admin' | 'user')
  userName: string      // 顯示名稱
  action: 'create' | 'update' | 'delete'
  resource: 'vehicle' | 'employee'
  resourceId: string
  resourceLabel: string // licensePlate 或 employee name（方便顯示）
  timestamp: string     // ISO 8601
}
```

### D4：`GET /api/activity-logs` 支援的查詢參數
- `q`：關鍵字（比對 userName, resourceLabel, action, resource）
- `page`（預設 1）、`pageSize`（預設 20）
- response shape：`{ data: ActivityLog[], total: number }`

### D5：UI 採用既有 shadcn/ui 元件，不安裝新元件
Table、Badge（action 顏色標示）、Input（搜尋欄）均已存在，
直接沿用，維持視覺一致性。

## Risks / Trade-offs

- **MSW store 重整後清空** → 符合 demo 情境；seed 資料提供合理初始狀態，說明文件標明此行為
- **handler 間共用 mutable 陣列** → 多 handler 寫入同一陣列，需確保 import 的是同一個模組實例（ES module singleton 保證此點）
- **無真實時間戳驗證** → `timestamp` 由 handler 以 `new Date().toISOString()` 生成，不可竄改但也不可信賴；符合 MVP 範疇
