import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios'
axios.defaults.baseURL = 'http://apis.imooc.com/api/' //拦截 直接写后面的请求即可
// 保留原有的api 在后面自动加上params
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'A6B3299F3F2AABD5' }
  return config
})
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  // setTimeout(() => {
  store.commit('setLoading', false)

  // }, 2000);
  return config
})

// const app = createApp(App)
// app.use(router)
// app.mount('#app')
createApp(App).use(router).use(store).mount('#app')