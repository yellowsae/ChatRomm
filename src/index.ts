import devServer from "./server/dev";
import prodServer from "./server/prod";
import express from "express";

import { Server } from 'socket.io'
import http from 'http'
import UserService from "@/service/UserService";


import { name } from "@/utils";

const port = 3000;
const app = express();

// 建立 HTTP 服务 
// - 传入 app  ,  express 中的 app
const server = http.createServer(app)


// 传入 serve 建立 Socket 
const io = new Server(server)

const userService = new UserService()




// 建立连接 
io.on('connection', (socket) => {
  // connetion : 连接事件
  // socket 参数： websocket 实例 



  // 监听 chat 这个频道 
  socket.on('chat', (msg) => {
    // console.log('serve ', msg)
    // 接收到 msg 信息后， 把 msg 发送给前端 
    // 使用 io 
    io.emit('chat', msg)
  })



  // 监听 谁 加入聊天室 

  socket.on('join', ({ userName, className }) => {
    // 记录用户状态  id: 可以使用 socket.id 
    const userData = userService.userHandler(socket.id, className, userName)
    // 添加 
    userService.addUser(userData)

    // 再使用 io 传出 msg
    io.emit('join', `${userName} 加入了${className}聊天室`)
  })



  // 监听断开连接的事件 
  // 原本在 socket 有 这个事件 
  socket.on('disconnect', () => {
    // console.log('用户离开了聊天室')

    // 取出用户信息
    const userData = userService.getUser(socket.id)
    console.log(socket.id)

    const userName = userData?.userName
    console.log(userData, 'asd')
    if (userName) {
      io.emit('leave', `${userName}离开了聊天室`)
    }

    // 根据id 参数用户 
    userService.removeUser(socket.id)
  })

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
