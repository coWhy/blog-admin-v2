import { login, logout, getAdminInfo } from '@/api/user'
import { getAccessToken, getRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    adminInfo: {}// 管理员信息
  }
}

const AccessTokenKey = 'accessToken'
const RefreshTokenKey = 'refreshToken'
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
   * 存入管理员信息 利用Vuex持久化插件
   */
  SET_ADMIN_INFO(state, adminInfo) {
    state.adminInfo = adminInfo
  },
  /**
   * 清除所有本地cookie
   */
  REMOVE_COKKIES(state) {
    Cookies.remove(AccessTokenKey)
    Cookies.remove(RefreshTokenKey)
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
        const { accessToken, refreshToken, isAdmin } = res.data
        if (isAdmin === 1) {
          // 存入访问token 刷新token 用户部分信息
          commit('SET_ACCESS_TOKEN', accessToken)
          commit('SET_REFRESH_TOKEN', refreshToken)
          resolve()
        } else {
          Message.warning('您不是管理员,不能访问该资源', 2000)
          reject(res.data)
        }
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
        // console.log(JSON.stringify(res.data))
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
  // 清除所有cookie 重置 状态
  resetCookies({ commit }) {
    return new Promise(resolve => {
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

