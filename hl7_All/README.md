
 ```js
 module.exports = {
    HTTPServer: {
        "viewsRoot": "../views",
        "httpPort": 80,
        "timeout": 30000
    },
    BUILD_MODE: "PRODCUTION", // DEBUG, VERBOSE, PRODCUTION 
    LOG_PATH: "/data/log/debug.log",
    mssql: {
        "BANK": { 
            "user": "sa",
            "password": "ntunhsim", 
            "server": "localhost\\SQLEXPRESS",
            "database": "BANK"
        }
    }
};
 ```
 - 安裝完後請設定防火牆以及開啟MS-SQL認證
 - 確認MS-SQL連線是否正確
 -執行`BaseScript.sql`初始化資料庫




4.  執行
 - (1) 使用nod.js開啟
cd/app
node server.js


- (2) 使用pm2開啟(需先下載pm2)
- 啟動
cd/app
pm2 start server.js


- 刪除
cd/app
pm2 kill


