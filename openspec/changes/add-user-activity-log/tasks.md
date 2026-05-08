## 1. Mock Data & Store

- [x] 1.1 建立 `src/mocks/data/activityLogs.ts`：定義 `ActivityLog` 型別、in-memory store 陣列與 seed 資料
- [x] 1.2 建立 `src/mocks/handlers/activityLogs.ts`：實作 `GET /api/activity-logs`（支援 `q`、`page`、`pageSize`）

## 2. 既有 Handler 整合

- [x] 2.1 修改 `src/mocks/handlers/vehicles.ts`：在 POST / PUT / DELETE 成功後寫入 activity log
- [x] 2.2 修改 `src/mocks/handlers/employees.ts`：在 POST / PUT / DELETE 成功後寫入 activity log
- [x] 2.3 在 `src/mocks/browser.ts` 註冊新的 activityLogs handler

## 3. API & React Query Hook

- [x] 3.1 建立 `src/api/activityLogs.ts`：封裝 `GET /api/activity-logs` fetch 函式
- [x] 3.2 建立 `src/hooks/useActivityLogs.ts`：React Query `useQuery` hook（含 `q`、`page`、`pageSize` 參數）

## 4. 頁面元件

- [x] 4.1 建立 `src/pages/ActivityLog.tsx`：含搜尋欄、Table（Time / User / Action / Resource Type / Resource 欄位）、Badge（action 顏色標示）
- [x] 4.2 Action Badge 顏色：`create` → green、`update` → blue、`delete` → red

## 5. 路由與導覽

- [x] 5.1 在 `src/routes.tsx` 新增 `/activity-log` 路由（套用 `AdminRoute`）
- [x] 5.2 在 `src/components/layout/Sidebar.tsx` 新增「使用者紀錄」導覽項目（admin 可見）
