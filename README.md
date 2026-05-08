# Build with AI — 課程範例專案

這是一個 AI 課程的範例專案，帶領學員練習如何與 AI Agent 協作開發。

課程講義：[deanlin.net/course/wiwynn](https://deanlin.net/course/wiwynn)

---

## 專案簡介

本 repository 包含兩個子專案：

### 1. Agent Skills 練習（根目錄）

用來練習 ESLint、Jest 測試、以及 git conventional commit 流程。
`src/skills/echo.js` 內含刻意設計的 ESLint 違規，作為課堂練習素材。

### 2. Vehicle Management App（`vehicle-mgmt-app/`）

一個企業內部車輛與員工管理的 SPA，功能涵蓋：

- **登入頁**：模擬 JWT 驗證，角色分為 `admin` / `user`
- **儀表板**：以 Recharts 顯示車輛狀態統計圖表
- **車輛管理**：車輛列表、搜尋、新增 / 編輯 / 刪除（所有登入用戶可操作）
- **員工管理**：員工列表、搜尋、新增 / 編輯 / 刪除（僅限 `admin`）

所有 API 由 **MSW（Mock Service Worker）** 在瀏覽器端攔截模擬，無需後端。

**Tech Stack：** React 19 · TypeScript 6 · Vite 8 · React Router v7 · TanStack React Query v5 · Tailwind CSS 4 · shadcn/ui · React Hook Form + Zod · MSW 2.x · Framer Motion · Recharts

---

## 啟動方式

### Agent Skills 練習（根目錄）

需要 Node.js 20+。

```bash
npm install        # 安裝相依套件
npm run lint       # 執行 ESLint 檢查
npm run lint:fix   # 自動修正 ESLint 問題
npm test           # 執行 Jest 測試
npm run test:watch # 監聽模式執行測試
```

> commit 前會自動觸發 Husky pre-commit hook，並行執行 lint + test，兩者都通過才能 commit。

### Vehicle Management App

```bash
cd vehicle-mgmt-app
npm install        # 安裝相依套件
npm run dev        # 啟動開發伺服器 → http://localhost:5173
npm run build      # TypeScript 型別檢查 + Vite 打包
npm run preview    # 預覽 production build
```

預設測試帳號：

| 帳號 | 密碼 | 角色 |
|------|------|------|
| admin | password | admin（可存取員工管理） |
| user | password | user |

---

## 關於 Agent Skills

專案內建的 Skills 放置於 `.agents/skills/` 目錄下。
每個 Skill 都是一份提示詞腳本，用來擴充 AI Agent 的特定能力。

| Skill | 說明 |
|-------|------|
| `git-smart-commit` | 將雜亂的 git 變更依功能邏輯自動拆分成多個有意義的 conventional commit |
| `git-pr-description` | 根據 branch 差異自動產生 Pull Request 的 Title 與 Description |
| `git-branch-name` | 根據變更內容，設計符合 kebab-case 命名規則的 branch 名稱 |
| `gen-test-cases` | 根據選取的程式碼或功能範圍，自動產生測試案例與對應測試程式 |
| `openspec-*` | OpenSpec 規格驅動開發流程（new-change、apply、verify、archive 等） |

在 Claude Code 中輸入 `/` 即可看到可用的 Skills 清單。

## 關於 OpenSpec

`openspec/` 目錄存放規格驅動開發的設定與規格文件：

- `openspec/config.yaml`：專案 context 與 per-artifact 規則
- `openspec/specs/`：各功能模組的主規格（vehicle-management、employee-management 等）
- `openspec/changes/`：進行中的變更追蹤；`archive/` 存放已完成的變更

## 自訂 Skills

每個 Skill 的核心是 `SKILL.md`，描述該 Skill 的運作流程與規則。你可以：

- 直接修改現有 Skill 的行為
- 新增自己的 Skill 目錄與 `SKILL.md`
- 將 Skill 邏輯移植到其他 AI Agent 平台（GitHub Copilot、Cursor、Gemini 等）
