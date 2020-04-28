import router from './router'
import store from './store'
import { MessageBox } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getAccessToken, getIsAdmin } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasAccessToken = getAccessToken()

  if (hasAccessToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
    //  不是管理员 引导到登录页
    if (getIsAdmin() !== '1') {
      MessageBox.confirm(
        '您不是管理员不能访问该资源',
        '确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        /**
         * 清除cookies 并且跳转到首页
         */
        // alert(getIsAdmin())
        store.dispatch('user/resetCookies')
          .then(() => {
            location.reload()
          })
      })
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单，直接去
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
