import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
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
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnmDetail,
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    }
  ]
})
export default router