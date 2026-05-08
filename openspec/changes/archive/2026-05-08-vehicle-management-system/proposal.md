## Why

企業車輛資源缺乏統一管理介面，導致車輛調度、員工指派與資產追蹤效率低落。本系統提供 Web 管理平台，讓管理者與員工可依角色存取所需功能，即時掌握車輛狀態。

## What Changes

- 新增角色型登入機制（管理者 / 一般使用者）
- 新增首頁儀表板，顯示關鍵 KPI 卡片與車輛狀態圖表
- 新增車輛管理模組，支援 CRUD 操作（所有登入使用者可檢視，管理者可編輯）
- 新增員工管理模組，僅管理者可存取（完整 CRUD）
- 使用 MSW (Mock Service Worker) 模擬後端 API，前端完全解耦

## Capabilities

### New Capabilities

- `user-auth`: 帳號密碼登入、角色判斷（admin / user）、受保護路由與登出
- `dashboard`: 顯示車輛總數、在用數、維修中等 KPI 卡片，以及車輛狀態分布圖表
- `vehicle-management`: 車輛列表（搜尋/排序）、新增/編輯/刪除車輛，含車牌、型號、狀態等欄位
- `employee-management`: 員工列表（搜尋）、新增/編輯/刪除員工（僅 admin 可進入此頁）

### Modified Capabilities

<!-- 無現有 spec 需修改 -->

## Impact

- **前端**: 全新 React 專案（Vite + shadcn/ui + React Router + Recharts）
- **Mock API**: MSW handlers 模擬 `/api/auth`, `/api/vehicles`, `/api/employees` 端點
- **依賴套件**: react-router-dom, @tanstack/react-query, recharts, msw, shadcn/ui components
- **無後端**: 所有資料由 MSW in-memory store 管理，重整後重置
