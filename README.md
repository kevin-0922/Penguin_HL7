# HL7 O33 測試專案

本專案整合 Node.js/Express 後端與 React 前端，可用於產生與解析 HL7 訊息並透過 MLLP 傳輸。資料儲存採用 SQLite，並以 `vite-express` 讓前後端共用同一伺服器。

## 功能簡介
- 產生 OML^O33、QBP^Q11 等 HL7 訊息
- 解析 HL7 訊息並存入資料庫
- 以 MLLP 協定傳送與接收 HL7
- React 表單介面方便填寫訊息

## 環境需求
- Node.js 18 以上
- npm
- （選擇性）Docker 24 以上

## 安裝步驟
1. 下載程式碼：
   ```bash
   git clone <repo-url>
   cd Hl7_O33
   ```
2. 複製並設定環境檔：
   ```bash
   cp '.env temple' .env
   # 依需求編輯 .env
   ```
3. 安裝依賴：
   ```bash
   npm install
   ```

## 執行方式
### 以 Node 直接啟動
1. 建置前端靜態檔：
   ```bash
   npm run build
   ```
2. 啟動伺服器：
   ```bash
   npm start
   ```
   預設伺服器會在 `server_PORT` 指定的 port（環境檔預設為 3000）啟動。

### 使用 Docker
1. 建置映像：
   ```bash
   docker build -t hl7-o33 .
   ```
2. 以環境檔啟動容器：
   ```bash
   docker run --env-file .env -p 3000:3000 hl7-o33
   ```
   如需保留 SQLite 資料，可額外掛載資料夾：
   ```bash
   docker run --env-file .env -p 3000:3000 \
     -v $(pwd)/data:/app/app/database hl7-o33
   ```

啟動後即可於瀏覽器開啟 `http://localhost:3000` 進行操作。

## 其他
- 所有環境變數範例都寫在 `.env temple`，包含 MLLP 連線設定。
- 若需要修改前端程式，可在開發階段直接執行 `npm start`，`vite-express` 會自動啟用 Vite 伺服器。

