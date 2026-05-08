## Context

全新前端專案，無既有程式碼需遷移。使用 Vite + React 快速建立，shadcn/ui 提供一致的 UI 元件，MSW 在 browser 攔截 fetch 請求模擬後端，讓前端開發完全獨立於後端。

目標使用者：企業內部管理人員（管理者 + 一般員工），桌面瀏覽器為主。

## Goals / Non-Goals

**Goals:**
- 提供可運作的 SPA，涵蓋登入、儀表板、車輛管理、員工管理四個頁面
- 角色型存取控制（RBAC）：admin 可存取所有功能，user 無法進入員工管理頁
- MSW mock API 完整模擬 CRUD 端點，資料保存於 in-memory store
- 使用 shadcn/ui 元件（Button, Input, Table, Dialog, Card, Form）統一視覺風格
- Recharts 繪製儀表板圖表（BarChart 或 PieChart）

**Non-Goals:**
- 真實後端 / 資料庫整合
- 多語言（i18n）
- 行動裝置 RWD 優化
- 單元測試 / E2E 測試
- 部署 / CI/CD 流程

## Decisions

### D1：Vite + React（非 Next.js）
純前端 SPA 即可滿足需求，不需 SSR/SSG。Vite 開發體驗快，減少設定複雜度。

### D2：shadcn/ui（非獨立 component library）
shadcn/ui 直接複製元件原始碼進專案，無版本綁定問題，搭配 Tailwind CSS 客製化彈性高。使用 `npx shadcn@latest add` 按需安裝。

### D3：MSW 2.x browser mode
MSW 在 Service Worker 層攔截，不需修改任何應用程式程式碼，可完整模擬 HTTP 狀態碼、延遲、錯誤。資料儲存於模組層級變數（陣列），app 重新整理後重置為初始 seed 資料。

### D4：React Router v6（無 server routing）
`createBrowserRouter` + `<Outlet>` 實作巢狀路由。`ProtectedRoute` wrapper 讀取 auth context 決定是否重導至登入頁，`AdminRoute` 額外檢查 role === 'admin'。

### D5：React Query（@tanstack/react-query）
統一資料擷取、cache 管理與 mutation。所有 API 呼叫封裝於 `src/api/` 中，元件不直接呼叫 fetch。

### D6：Auth 使用 localStorage + Context
JWT 模擬：登入後將 `{ token, role, name }` 存入 localStorage，AuthContext 提供全域讀取。不實作 token refresh（MVP 簡化）。

## Risks / Trade-offs

- **MSW service worker 需要 HTTPS 或 localhost** → 開發環境限制，`vite dev` 在 localhost 正常運作，無影響
- **In-memory 資料重整後消失** → 符合 demo 情境，seed 資料提供合理初始狀態
- **shadcn/ui 需手動安裝各元件** → 初期安裝步驟較多，但後續維護簡單；tasks.md 中明列需安裝的元件
- **無後端驗證** → role 由 mock API 回傳，前端只信任登入 response，不做 token 驗證；符合 MVP 範疇

## 目錄結構（預計）

```
src/
├── api/            # fetch functions (auth, vehicles, employees)
├── components/
│   ├── ui/         # shadcn/ui 自動生成
│   └── layout/     # Sidebar, Header, ProtectedRoute
├── context/        # AuthContext
├── hooks/          # useAuth, custom react-query hooks
├── mocks/
│   ├── browser.ts  # MSW worker setup
│   ├── handlers/   # auth, vehicles, employees handlers
│   └── data/       # seed data
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Vehicles.tsx
│   └── Employees.tsx
└── routes.tsx      # router config
```
