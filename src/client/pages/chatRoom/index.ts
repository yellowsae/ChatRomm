import "./index.css";
import type { userData } from "@/service/UserService";
import { io } from "socket.io-client";

interface ChatData {
  msg: string,
  userData: userData
}

// 初始化 Socket.io
// 客户端的 Socket.io
const clientIo = io();

// location 当前的 URL
const url = new URL(location.href)

// 获取参数 
const userName = url.searchParams.get('user_input')
const className = url.searchParams.get('use_select')


if (!userName || !className) {
  location.href = `/main/main.html`
}


// 发起谁加入聊天室的 emit 
clientIo.emit('join', { userName, className })




const textInput = document.getElementById('textInput') as HTMLInputElement
const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement
const chatBox = document.getElementById('chatBox') as HTMLDivElement
const rootName = document.getElementById('roomName') as HTMLParagraphElement
const back = document.getElementById('back') as HTMLButtonElement


rootName.innerHTML = className || ' - '

// 定义 存储 ID 的变量 
let userID = ''

// 处理后端传过来的 msg
function msgHandler(data: ChatData) {

  // 创建 div 
  const divBox = document.createElement('div')
  divBox.classList.add('flex', 'mb-4', 'items-end')

  // 根据ID判断是否是自己消息 | 其他用户消息 
  if (userID === data.userData.id) {
    // 构建结构
    divBox.classList.add('justify-end')
    divBox.innerHTML = `
    <p class="text-xs text-gray-700 mr-4">00:00</p>
    <div>
      <p class="text-xs text-white mb-1 text-right">${data.userData.userName}</p>
      <p
        class="mx-w-[50%] break-all bg-white px-4 py-2 rounded-bl-full rounded-br-full rounded-tl-full"
      >
        ${data.msg}
      </p>
    </div>
  `
  } else {
    divBox.classList.add('justify-start')
    divBox.innerHTML = `
      <div>
        <p class="text-xs text-gray-700 mb-1">${data.userData.userName}</p>
        <p
          class="mx-w-[50%] break-all bg-gray-800 px-4 py-2 rounded-tr-full rounded-br-full rounded-tl-full text-white"
        >
          ${data.msg}
        </p>
      </div>
      <p class="text-xs text-gray-700 ml-4">00:00</p>
    `
  }



  // 添加到 chatBox
  chatBox.appendChild(divBox)
  // 清空 textValue 
  textInput.value = ''
  // 自动滚动到底部
  chatBox.scrollTop = chatBox.scrollHeight;
}

function joinHandler(msg: string) {

  // 创建 div 
  const divBox = document.createElement('div')
  divBox.classList.add('flex', 'justify-center', 'mb-4', 'items-center')

  // 构建结构
  divBox.innerHTML = `
  <p class="text-gray-700 text-sm">${msg}</p>
  `

  // 添加到 chatBox
  chatBox.appendChild(divBox)
  // 自动滚动到底部
  chatBox.scrollTop = chatBox.scrollHeight;
}


submitBtn.addEventListener('click', () => {
  // 获取数据 
  const textValue = textInput.value
  // 使用 socket.emit 发送消息 
  // 建立频道 
  // - 前端推送数据给后端， 
  // 后端接收, 然后再返回数据给前端 
  clientIo.emit('chat', textValue)  // chat 频道
})


// 接收 chat 频道，后端传过来的 msg

clientIo.on('chat', (data: ChatData) => {
  // console.log('cline chat', msg)
  // 执行函数，处理 msg 
  msgHandler(data)
})


// 加入聊天室 
clientIo.on('join', (msg) => {
  // 执行函数 处理 msg
  joinHandler(msg)
})

// 离开聊天室 
clientIo.on('leave', (msg) => {
  joinHandler(msg)
})

// 获取 传入的 socket.id 
clientIo.on('chatID', (id) => {
  userID = id
})


back.addEventListener('click', () => {
  location.href = `/main/main.html`
})
