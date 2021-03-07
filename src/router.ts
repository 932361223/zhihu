import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import axios from 'axios'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue';
import ColumnmDetail from './views/ColumnmDetail.vue'
import Create from './views/CreatePost.vue'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnmDetail,
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: { requiredLogin: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if (to.name !== 'login' && !store.state.user.isLogin) {
  //规则有必须登录
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   next({ name: 'login' })
  //   // next('/login')
  //   //规则如果登录就跳转主页
  // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
  //   next('/')
  // } else {
  //   next()
  // }
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    // 未登录
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        // 可能网络不好失败，或者token没用
        console.error(e)
        // localStorage.removeItem('token') //直接清除 store里面还有token，行不通
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    //已经登录
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router