<template>
  <div class='container'>
    <global-header :user='currentUser'></global-header>
    <!-- <h1>{{error.message}}</h1> -->
    <Message type="error"
             :message="error.message"></Message>
    <loader v-if="isloading"
            text="拼命加载中" />
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";
// import Message from "@/components/Message.vue";
import createMessage from "@/components/createMessage";
import Loader from "./components/Loader.vue";
import { GlobalDataProps } from "./store";
export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loader,
    // Message,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isloading = computed(() => store.state.loading);
    // const token = computed(() => store.state.token);
    const error = computed(() => store.state.error);
    // onMounted(() => {  // 在router统一做处理
    //   // 没登陆且有token就自动登录
    //   if (!currentUser.value.isLogin && token.value) {
    //     console.log(666);
    //     axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
    //     store.dispatch("fetchCurrentUser");
    //   }
    // });
    watch(
      //getter 相当于监听这个值
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    return {
      currentUser,
      isloading,
      error,
    };
  },
});
</script>

