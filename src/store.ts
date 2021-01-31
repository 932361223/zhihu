import { createStore } from 'vuex'
import { testData, ColumnProps, testPosts, } from "./testData";
interface UserProps {
  isLogin: boolean;
  nickName?: string;
  id?: number;
  columnId?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, nickName: 'Zenon', columnId: 1 }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    // getColumnById(state, currentId){
    //   return testPosts.find(c => c.id === currentId)
    // }
    getColumnById: (state) => (id: number) => state.columns.find(c => c.id === id),
    getPostsByCid: (state) => (cid: number) => state.posts.filter(post => post.columnId === cid)
  }
})
export default store