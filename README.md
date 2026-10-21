# Penguin HL7

React/Vite 前端與 Express 後端共用 HTTP 服務，資料儲存於 PostgreSQL 18。另提供 MLLP TCP 接收服務。

## 在新機器部署

安裝 Docker Engine 與 Docker Compose v2，然後執行：

```sh
git clone https://github.com/kevin-0922/Penguin_HL7.git
cd Penguin_HL7
cp .env.example .env
# 編輯 .env，至少將 SQL_PASSWORD 改成自己的密碼
docker compose up -d --build --wait
```

瀏覽 `http://伺服器IP:3000`；MLLP 接收埠為 `4321`。可透過 `.env` 的 `HTTP_PORT`、`MLLP_PORT` 修改對外埠。前端使用同來源 API，無須重新指定前端 API 網址。遠端連線需允許主機防火牆的這兩個埠。

```sh
docker compose ps
docker compose logs --tail=100 penguin pgsql
curl --fail http://localhost:3000/api/db-test
```

兩個服務應顯示 healthy，資料庫測試應回傳 `success: true`。PostgreSQL 使用 Docker named volume 保存資料，不公開 5432 埠。初次啟動由 POSTGRES_DB 建立資料庫，再由後端 Sequelize 建立六張表，不需手動執行 SQL。

## 外部服務設定

`Raccon_API_URL` 必須設為容器可連到的 Raccoon/DICOM 服務網址，DICOM 轉送才會成功。Linux 若服務在宿主機上，請使用宿主機可達的 IP；範例中的 `host.docker.internal` 主要適用 Docker Desktop。MLLP 發送目標在網站首頁設定後儲存到資料庫。

預設容許跨來源請求；若需要限制來源，設定 `SERVER_CORS_ORIGIN` 為網站完整來源，例如 `https://penguin.example.com`。HTTPS 與網域需另外設定反向代理。系統目前沒有登入保護，部署請使用受控網路。

## 更新、停止與資料保存

```sh
git pull
docker compose up -d --build --wait
docker compose down
```

`down` 保留資料，`down -v` 會刪除資料庫。`.env` 不進 Git。資料庫初始化後修改 `.env` 的帳號、密碼或資料庫名稱不會更改既有資料，需先在 PostgreSQL 內完成相應修改。

後端啟動會執行 `sequelize.sync({ alter: true })`；既有資料升級前先備份，正式版 schema 變更應採用審核過的 migration。舊環境的 bind mount 資料不會自動搬進新 named volume，請用 pg_dump/pg_restore 遷移。

## 本機開發

安裝 Node.js 22、`npm ci`，自行準備 PostgreSQL，並在 `.env` 設定 `SQL_HOST`、`SQL_PORT`、`SQL_DB`、`SQL_USERNAME`、`SQL_PASSWORD` 後執行 `npm start`。Docker 部署會自動設定容器內部連線與正式環境模式。

## 網頁請求紀錄

導覽列的「請求紀錄」或 `/logs` 可查看最近 1,000 筆 HTTP 與 MLLP 事件，每三秒更新，可搜尋來源 IP、路徑與狀態並篩選協定。紀錄存在記憶體，容器重啟即清空。HTTP 顯示方法、回應狀態、耗時；MLLP 顯示連線、ACK 已送出或處理錯誤（ACK 已送出不代表上游業務成功）。不記錄 request body、query string、headers 或 HL7 訊息內容。紀錄頁自身的 API 輪詢和容器內的資料庫健康探測不列入紀錄。

來源 IP 為直接連線來源，經反向代理時會顯示代理 IP，未採信可被偽造的 X-Forwarded-For。IP 無法直接辨識操作人員。目前此頁與其他 API 一樣沒有登入驗證，能開啟網站的人也能查看紀錄。

更新並重新建置後可使用：

```sh
git pull
docker compose up -d --build --wait
```

測試紀錄模組：`node --test checks/requestLog.test.js`。
