<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center"
         v-if="column">
      <div class="col-3 text-center">
        <!-- && column.avatar.fitUrl -->
        <img :src="column.avatar&&column.avatar.url"
             :alt="column.title"
             class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
// import { testData, testPosts } from "../testData";
import { addColumnAvatar } from "../helper";
import PostList from "../components/PostList.vue";
export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    // const currentId = +route.params.id; 已经是字符串不需要转换
    const currentId = route.params.id;
    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", currentId);
    });
    // const column = testData.find((c) => c.id === currentId);
    // const list = testPosts.filter((post) => post.columnId === currentId);
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId);
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100);
      }
      return selectColumn;
    });
    const list = computed(() => store.getters.getPostsByCid(currentId));
    return {
      route,
      column,
      list,
    };
  },
});
</script>
