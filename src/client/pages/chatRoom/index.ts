import "./index.css";

import { io } from "socket.io-client";





// http://localhost:3000/chatRoom/chatRoom.html?user_input=userName&use_select=ROOM3
// 获取URL的参数 

// location 当前的 URL
const url = new URL(location.href)

// 获取参数 
const userInput = url.searchParams.get('user_input')
const userSelect = url.searchParams.get('use_select')


if (!userInput || !userSelect) {
  location.href = `/main/main.html`
}

console.log(userInput, userSelect)


// 初始化 Socket.io
// 客户端的 Socket.io

const socket = io();



socket.on("join", (msg) => {
  console.log(msg);
});
