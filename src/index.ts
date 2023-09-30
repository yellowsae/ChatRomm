import devServer from "./server/dev";
import prodServer from "./server/prod";
import express from "express";

import { Server } from 'socket.io'
import http from 'http'


import { name } from "@/utils";

const port = 3000;
const app = express();

// 建立 HTTP 服务 
// - 传入 app  ,  express 中的 app
const server = http.createServer(app)


// 传入 serve 建立 Socket 
const io = new Server(server)


// 建立连接 
io.on('connection', (socket) => {
  // connetion : 连接事件
  // socket 参数： websocket 实例 

  // 监听事件  emit  - join 
  socket.emit("join", "welcome");


})





// 執行npm run dev本地開發 or 執行npm run start部署後啟動線上伺服器
if (process.env.NODE_ENV === "development") {
  devServer(app);
} else {
  prodServer(app);
}

console.log("server side", name);

server.listen(port, () => {
  console.log(`The application is running on port ${port}.`);
});
