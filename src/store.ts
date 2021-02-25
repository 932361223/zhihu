import { createStore, Commit } from 'vuex'
// import { testData, testPosts, } from "./testData";
import axios from 'axios'
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
export interface GlobalDataProps {
  token: string;
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  console.log(payload);
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: number;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    // columns: testData,
    loading: false,
    columns: [],
    // posts: testPosts,
    posts: [],
    // user: { isLogin: false, nickName: 'Zenon', column: '1' }
    user: { isLogin: false }
  },
  mutations: {
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    // login(state) {
    //   state.user = { ...state.user, isLogin: true }
    // },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      // state.columns.data[rawData.data._id] = rawData.data
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      // state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      // state.posts.loadedColumns.push(columnId)
      state.posts = rawData.data.list
    },
    // loading...
    setLoading(state, status) {
      state.loading = status
    },
    //设置状态码
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
  },
  actions: {
    // async fetchColumns(context) {
    async fetchColumns({ commit }) {
      // axios.get('/columns').then(resp => {
      //   context.commit('fetchColumns', resp.data)
      // }) 版本1
      // const { data } = await axios.get('/columns')
      // context.commit('fetchColumns', data) 版本2
      getAndCommit('/columns', 'fetchColumns', commit) //版本3
    },
    fetchColumn({ commit }, cid) {
      // axios.get(`/columns/${cid}`).then(resp => {
      //   commit('fetchColumn', resp.data)
      // }) //版本1
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit) //版本2
      // if (!state.columns.data[cid]) {
      //   return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      // }
    },
    fetchPosts({ commit }, cid) {
      // if (!state.posts.loadedColumns.includes(cid)) {
      //   return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      // }
      // axios.get(`/columns/${cid}/posts`).then(resp => {
      //   commit('fetchPosts', resp.data)
      // }) 版本1
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit) //版本3
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    // 合并dispatch
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    // getColumnById(state, currentId){
    //   return testPosts.find(c => c.id === currentId)
    // }
    getColumnById: (state) => (id: string) => state.columns.find(c => c._id === +id),
    getPostsByCid: (state) => (cid: string) => state.posts.filter(post => post.column === cid)
  }
})
export default store