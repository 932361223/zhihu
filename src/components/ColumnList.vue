<template>
  <div class="row">
    <div v-for="colum in columnList"
         :key="colum.id"
         class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="colum.avatar&&colum.avatar.url"
               :alt="colum.title"
               class="rounded-circle border border-light my-3">
          <h5 class="card-title">{{colum.title}}</h5>
          <p class="card-text text-left">{{colum.description}}</p>
          <router-link :to="{name:'column',params:{id:colum._id}}"
                       class="btn btn-outline-primary">进入专栏</router-link>
          <!-- <router-link :to="`/column/${colum.id}`"
                       class="btn btn-outline-primary">进入专栏</router-link> -->
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { ColumnProps } from "@/store";
// export interface ColumnProps {
//   id: number;
//   title: string;
//   avatar?: string;
//   description: string;
// }
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          // column.avatar = require("@/assets/logo.png");

          column.avatar = {
            url: require("@/assets/logo.png"),
          };
        } else {
          column.avatar.url =
            column.avatar.url + "?x-oss-process=image/resize,m_pad,h_50,w_50";
        }
        return column;
      });
    });
    return {
      columnList,
    };
  },
});
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
