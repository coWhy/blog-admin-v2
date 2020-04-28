import { login, logout, getAdminInfo } from '@/api/user'
import { getAccessToken, getRefreshToken, getIsAdmin } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    isAdmin: getIsAdmin(), // 是否是管理员
    adminInfo: {}// 管理员信息
  }
}

const AccessTokenKey = 'accessToken'
const RefreshTokenKey = 'refreshToken'
const IsAdminKey = 'isAdmin'
const state = getDefaultState()

const mutations = {
  /**
   * 重置用户状态
   */
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  /**
   * 存放accessToken
   */
  SET_ACCESS_TOKEN: (state, accessToken) => {
    state.accessToken = accessToken
    Cookies.set(AccessTokenKey, accessToken)
  },
  /**
   * 存入refreshToken
   */
  SET_REFRESH_TOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken
    Cookies.set(RefreshTokenKey, refreshToken)
  },
  /**
   * 存入管理员标识
   * @param {*} state
   * @param {*} isAdmin 是否是管理员
   */
  SET_IS_ADMIN(state, isAdmin) {
    state.isAdmin = isAdmin
    Cookies.set(IsAdminKey, isAdmin)
  },
  SET_ADMIN_INFO(state, adminInfo) {
    state.adminInfo = adminInfo
  },
  /**
   * 清除所有本地cookie
   */
  REMOVE_COKKIES(state) {
    // state.accessToken = ''
    // state.refreshToken = ''
    // state.IsAdminKey = -1
    Cookies.remove(AccessTokenKey)
    Cookies.remove(RefreshTokenKey)
    Cookies.remove(IsAdminKey)
  }
}

const actions = {
  /**
   * 用户登录
   * @param {} param0
   * @param {*} loginForm
   */
  login({ commit }, loginForm) {
    const { username, password } = loginForm
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        const result = res.data
        // 存入访问token 刷新token 用户部分信息
        commit('SET_ACCESS_TOKEN', result.accessToken)
        commit('SET_REFRESH_TOKEN', result.refreshToken)
        commit('SET_IS_ADMIN', result.isAdmin)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取管理员信息
  getAdminInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getAdminInfo().then(res => {
        commit('SET_ADMIN_INFO', res.data)
        console.log(JSON.stringify(res.data))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户注销登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('REMOVE_COKKIES')
        resetRouter()
        commit('RESET_STATE')
        // 刷新一下
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetCookies({ commit }) {
    return new Promise(resolve => {
      // 清除所有cookie 重置 状态
      commit('REMOVE_COKKIES')
      commit('RESET_STATE')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

