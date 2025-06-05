# HL7 專案

本專案結合 **Node.js/Express** 後端與 **React** 前端，提供 HL7 訊息產生、解析與 MLLP 傳輸功能，資料儲存採用 **SQLite**。透過 `vite-express` 讓前後端共用一個伺服器運行。

## 主要功能
- 產生 `OML^O33`、`QBP^Q11` 等 HL7 訊息
- 解析 HL7 並存入資料庫
- 以 **MLLP** 協定傳送與接收 HL7
- DICOM 訂單映射與重新傳送
- WEB表單介面方便填寫與產生 HL7 訊息

## 環境需求
- Node.js 20 以上
- npm
- Docker 24 以上
- SQLite 3.49.2以上

## 安裝與建置
1. 取得程式碼
   ```bash
   git clone <repo-url>
   cd Hl7_O33
   ```
2. 複製環境檔並依需求修改
   ```bash
   cp '.env temple' .env
   # 編輯 .env 調整 PORT、CORS 及 MLLP 等設定
   ```
3. 安裝依賴並建置前端
   ```bash
   npm install
   ```

## 執行方式
### 直接以 Node 啟動
```bash
npm start
```
伺服器預設監聽在 `.env` 內 `server_PORT` 指定的埠，預設為 `3000`。

### 使用 Docker
1. 建置映像
   ```bash
   docker build -t hl7-o33 .
   ```
2. 依環境檔啟動容器
   ```bash
   docker run --env-file .env -p 3000:3000 hl7-o33
   ```
   若需保留 SQLite 資料，可加入資料夾掛載：
   ```bash
   docker run --env-file .env -p 3000:3000 \
     -v $(pwd)/data:/app/app/database hl7-o33
   ```

### Windows 執行 Docker
在 Windows 上可使用 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。
安裝後開啟 **PowerShell** 或 **命令提示字元**，於專案根目錄執行與上節相同的 `docker build` 與 `docker run` 指令即可。

### macOS 執行 Docker
在 macOS 上可使用 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)。  
安裝完成後，開啟 **終端機（Terminal）**，於專案根目錄執行與上節相同的 `docker build` 與 `docker run` 指令即可。




## 其他說明
- 範例環境變數都列在 `.env temple`，包含 MLLP 連線設定
- 開發階段可直接執行 `npm start` 會自動啟動 Vite 伺服器
