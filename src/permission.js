import {router} from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// NProgress Configuration
NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login', '/404', '/401', '/lock']
const lockPage = '/lock'

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  if (store.getters.access_token) { // determine if there has token
    /* has token*/
    if (store.getters.isLock && to.path !== lockPage) {
      next({
        path: lockPage
      })
      NProgress.done()
    } else if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles;
          store.commit('SET_ROLES', roles);
          next({ ...to,
            replace: true
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({
              path: '/login'
            })
            NProgress.done()
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done();
})
