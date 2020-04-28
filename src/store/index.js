import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import persistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  // vuex持久化 插件
  plugins: [
    persistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})

export default store
