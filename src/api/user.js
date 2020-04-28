import request from '@/utils/request'
// 用户登录
export function login(data) {
  return request.post('/user/login', data)
}

// 用户注销 登录
export function logout() {
  return request.get('/user/logout')
}

// 获取管理员信息
export function getAdminInfo() {
  return request.get('/user/admin/info')
}
