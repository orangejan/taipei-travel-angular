# Taipei Travel App

本專案使用 Angular 開發，串接台北旅遊公開 API，提供使用者瀏覽景點資訊、分類篩選、分頁瀏覽與收藏管理功能。

專案重點在於建立完整的前端應用架構，包含資料串接、狀態管理、使用者互動邏輯與基本測試驗證。

---

## 🔧 技術使用

* Angular 19
* TypeScript
* RxJS
* Reactive Forms
* SCSS（RWD）
* Angular Router
* Jasmine / Karma（單元測試）

---

## 📌 功能說明

### 1️⃣ 景點列表頁

* 串接台北旅遊 Open API 顯示景點資料
* 分頁顯示（避免一次載入過多資料影響效能）
* 下拉選單分類篩選
* 支援單選 / 多選加入收藏
* 收藏資料透過 localStorage 持久化儲存

---

### 2️⃣ 我的最愛頁

* 顯示收藏景點清單
* 分頁顯示資料
* 支援多選批次刪除
* 支援資料編輯（Reactive Form）

* 表單驗證規則：
* * 景點名稱：必填
* * 電話：必填，且限制格式（不可輸入中文）

---

### 3️⃣ UI / UX

共用樣式管理（common.scss）
RWD 響應式設計（支援桌機 / 平板 / 手機）
無圖片時顯示 placeholder
長文字自動截斷，避免版面破版
分頁切換自動回到頁面頂部

---

## 🧪 單元測試（Testing）

本專案針對 FavoritesPageComponent 撰寫單元測試，重點驗證核心互動邏輯：

* 初始化資料載入
* 分頁邏輯（上一頁 / 下一頁）
* 勾選與批次刪除功能
* Reactive Form 表單驗證
* 編輯與儲存流程

測試中使用 Jasmine Spy 模擬 FavoriteService，避免依賴實際資料來源，確保測試專注於 component 邏輯。

本專案優先驗證 component business logic，未針對 DOM rendering 進行測試。

---

## 🚀 專案啟動

```bash
npm install
ng serve
```

---

## 🌐 線上 Demo

https://orangejan.github.io/taipei-travel-app/spots

---

## 📌 專案重點與學習

* 使用 Angular 建立模組化前端架構
* 將 API 邏輯封裝於 service，提升可維護性
* 使用 Reactive Forms 建立表單驗證流程
* 實作分頁與使用者互動邏輯
* 撰寫單元測試驗證核心功能

---

## 💡 未來優化方向

* 加入關鍵字搜尋功能
* 增加景點詳細頁（Router 延伸應用）
* 收藏資料改為後端儲存（API）
* 優化 Loading Skeleton 與使用者體驗

