import request from '@/utils/request'
export default {
  // 用户登录
  login(data) {
    return request.post('/user/login', data)
  },
  // 用户注销 登录
  logout() {
    return request.get('/user/logout')
  },
  // 获取管理员信息
  getAdminInfo() {
    return request.get('/admin/info')
  },
  // 更换管理员头像
  changeAdminAvatar(data) {
    return request.post('/admin/avatar', data)
  },
  // 修改管理员个人信息(不包含头像)
  updateAdminInfo(data) {
    return request.post('/admin/info', data)
  }
}

