<template>
  <div>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
      <a class="navbar-brand"
         href="#">
        Zenon
      </a>
      <!-- <router-link class="navbar-brand"
                   to="/">者也专栏</router-link> -->
      <ul v-if="!user.isLogin"
          class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/login"
                       class="btn btn-outline-light my-2">登陆</router-link>
        </li>
        <li class="list-inline-item">
          <router-link to="/signup"
                       class="btn btn-outline-light my-2">注册</router-link>
        </li>
      </ul>
      <ul v-else
          class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.nickName}`">
            <dropdown-item>
              <router-link to="/create"
                           class="dropdown-item">新建文章</router-link>
            </dropdown-item>
            <dropdown-item>
              <router-link :to="`/column/${user.column}`"
                           class="dropdown-item">我的专栏</router-link>
            </dropdown-item>
            <dropdown-item disabled><a href="#"
                 class="dropdown-item">编辑资料</a></dropdown-item>
            <dropdown-item><a href="#"
                 class="dropdown-item">退出登陆</a></dropdown-item>
          </dropdown>
        </li>
      </ul>
    </nav>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { GlobalDataProps } from "../store";
import { useStore } from "vuex";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import { UserProps } from "@/store";
// export interface UserProps {
//   isLogin: boolean;
//   nickName?: string;
//   id?: number;
// }
export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      require: true,
    },
  },
  components: {
    Dropdown,
    DropdownItem,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    // const user = computed(() => store.state.user);
    return {
      // user,
    };
  },
});
</script>
