## 1. Project Scaffold & Dependencies

- [x] 1.1 使用 `npm create vite@latest` 建立 React + TypeScript 專案，設定目錄為 `vehicle-mgmt-app`
- [x] 1.2 安裝核心依賴：`react-router-dom`, `@tanstack/react-query`, `recharts`, `msw`
- [x] 1.3 初始化 Tailwind CSS 與 shadcn/ui：執行 `npx shadcn@latest init`
- [x] 1.4 安裝所需 shadcn/ui 元件：`button`, `input`, `card`, `table`, `dialog`, `form`, `label`, `badge`, `dropdown-menu`
- [x] 1.5 建立 `src/` 目錄結構：`api/`, `components/layout/`, `components/ui/`, `context/`, `hooks/`, `mocks/handlers/`, `mocks/data/`, `pages/`

## 2. MSW Mock API Setup

- [x] 2.1 在 `src/mocks/data/` 建立 seed 資料檔：`vehicles.ts`（10 筆）和 `employees.ts`（8 筆）
- [x] 2.2 建立 `src/mocks/handlers/auth.ts`：實作 `POST /api/auth/login`（驗證帳密、回傳 role + token）
- [x] 2.3 建立 `src/mocks/handlers/vehicles.ts`：實作 `GET/POST/PUT/DELETE /api/vehicles`（in-memory CRUD）
- [x] 2.4 建立 `src/mocks/handlers/employees.ts`：實作 `GET/POST/PUT/DELETE /api/employees`（in-memory CRUD）
- [x] 2.5 建立 `src/mocks/browser.ts` 整合所有 handlers，執行 `npx msw init public/` 產生 service worker
- [x] 2.6 在 `src/main.tsx` 中條件啟動 MSW（`if (import.meta.env.DEV)`）

## 3. Auth Context & Routing

- [x] 3.1 建立 `src/context/AuthContext.tsx`：提供 `user`, `login()`, `logout()`，從 localStorage 初始化 state
- [x] 3.2 建立 `src/api/auth.ts`：封裝 `POST /api/auth/login` fetch 呼叫
- [x] 3.3 建立 `src/components/layout/ProtectedRoute.tsx`：未登入則 redirect 到 `/login`
- [x] 3.4 建立 `src/components/layout/AdminRoute.tsx`：role !== 'admin' 則 redirect 到 `/dashboard`
- [x] 3.5 建立 `src/routes.tsx`：使用 `createBrowserRouter` 設定路由結構（`/login`、`/dashboard`、`/vehicles`、`/employees`）

## 4. Layout

- [x] 4.1 建立 `src/components/layout/Sidebar.tsx`：顯示 Logo、nav links（admin 看到 Employees，user 看不到）
- [x] 4.2 建立 `src/components/layout/AppLayout.tsx`：左側 Sidebar + 右側 `<Outlet>`，顯示當前使用者名稱與登出按鈕

## 5. Login Page

- [x] 5.1 建立 `src/pages/Login.tsx`：帳號 + 密碼輸入欄位、送出按鈕
- [x] 5.2 整合 AuthContext `login()` 方法，成功後 navigate 到 `/dashboard`
- [x] 5.3 顯示 API 回傳 401 時的錯誤訊息「帳號或密碼錯誤」

## 6. Dashboard Page

- [x] 6.1 建立 `src/api/vehicles.ts`：封裝 `GET /api/vehicles` fetch 呼叫
- [x] 6.2 建立 `src/hooks/useVehicles.ts`：使用 React Query `useQuery` 取得車輛清單
- [x] 6.3 建立 `src/pages/Dashboard.tsx`：呼叫 `useVehicles`，計算 Total / Available / In Use / Maintenance 數量
- [x] 6.4 在 Dashboard 上方渲染 4 個 KPI `<Card>` 元件
- [x] 6.5 在 Dashboard 下方加入 Recharts `BarChart`，X 軸為狀態類別，Y 軸為數量

## 7. Vehicle Management Page

- [x] 7.1 建立 `src/api/vehicles.ts` 中的 `createVehicle`, `updateVehicle`, `deleteVehicle` 函式
- [x] 7.2 建立 `src/pages/Vehicles.tsx`：顯示可搜尋的車輛 Table（欄位：車牌、品牌、型號、年份、狀態、操作）
- [x] 7.3 建立 `VehicleFormDialog.tsx`：新增/編輯共用 Dialog，含表單驗證（必填欄位）
- [x] 7.4 整合新增功能：點擊「新增車輛」開啟空白 Dialog，送出後呼叫 `POST /api/vehicles` 並更新 Query cache
- [x] 7.5 整合編輯功能：點擊「編輯」開啟預填 Dialog，送出後呼叫 `PUT /api/vehicles/:id`
- [x] 7.6 整合刪除功能：點擊「刪除」顯示確認 Dialog，確認後呼叫 `DELETE /api/vehicles/:id`
- [x] 7.7 實作 Badge 元件顯示車輛狀態（available=green, in-use=blue, maintenance=yellow）

## 8. Employee Management Page

- [x] 8.1 建立 `src/api/employees.ts`：封裝 `GET/POST/PUT/DELETE /api/employees`
- [x] 8.2 建立 `src/hooks/useEmployees.ts`：使用 React Query 取得員工清單
- [x] 8.3 建立 `src/pages/Employees.tsx`：可搜尋的員工 Table（欄位：姓名、部門、職稱、Email、操作）
- [x] 8.4 建立 `EmployeeFormDialog.tsx`：新增/編輯共用 Dialog，含表單驗證
- [x] 8.5 整合新增、編輯、刪除功能（模式同 Vehicle Management）

## 9. Integration & Smoke Test

- [x] 9.1 啟動 `npm run dev`，確認 MSW service worker 在 console 顯示啟動訊息
- [ ] 9.2 以 admin/admin123 登入，確認可進入所有頁面
- [ ] 9.3 以 user1/user123 登入，確認無法進入 `/employees`（自動跳回 dashboard）
- [ ] 9.4 執行車輛新增 → 確認 Dashboard KPI 數字更新
- [ ] 9.5 確認刪除車輛後資料從 Table 消失
