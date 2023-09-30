import "./index.css";


// 获取 userInput 和 Room 

const useInput = document.getElementById('useInput') as HTMLInputElement

const useSelect = document.getElementById('useSelect') as HTMLSelectElement

const btn = document.getElementById('StartBtn') as HTMLButtonElement



btn.addEventListener('click', () => {

  // 取值 
  const userInputValue = useInput.value
  const useSelectValue = useSelect.value

  // 跳转 
  location.href = `/chatRoom/chatRoom.html?user_input=${userInputValue}&use_select=${useSelectValue}`
})

