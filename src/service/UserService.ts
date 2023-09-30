// 记录 用户状态 

interface userData {
  id: string;
  roomName: string;
  userName: string;
}

export default class UserService {

  private userMap: Map<string, userData>

  constructor() {
    this.userMap = new Map()
  }


  // 添加用户 
  addUser(data: userData): void {
    this.userMap.set(data.id, data)
  }

  // 删除用户
  removeUser(id: string): void {
    if (this.userMap.has(id)) {
      this.userMap.delete(id)
    }
  }

  // 查询用户 
  getUser(id: string): userData | null {

    // 处理 
    if (!this.userMap.has(id)) return null

    // if (this.userMap.has(id)) {
    //   return this.userMap.get(id)
    // }

    const data = this.userMap.get(id)
    if (data) {
      return data
    }

    return null
  }

  // 构建用户 

  userHandler(id: string, roomName: string, userName: string): userData {
    return {
      id,
      roomName,
      userName
    }
  }
}
