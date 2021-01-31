<template>
  <div class="dropdown"
       ref="dropdownRef">
    <a href="#"
       class="btn btn-outline-light my-2 dropdown-toggle"
       @click.prevent="toggleOpen">
      {{title}}
    </a>
    <ul class="dropdown-menu"
        :style="{display: 'block'}"
        v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useClickOutside from "@/hook/useClickOutside";
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const isClickOutside = useClickOutside(dropdownRef);
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false;
      }
    });
    // const handler = (e: MouseEvent) => {
    //   if (
    //     //排除里面的元素 点击外面就关闭下拉
    //     !dropdownRef.value?.contains(e.target as HTMLElement) &&
    //     isOpen.value == true
    //   ) {
    //     isOpen.value = false;
    //   }
    // };
    // onMounted(() => {
    //   document.addEventListener("click", handler);
    // });
    // onUnmounted(() => {
    //   document.removeEventListener("click", handler);
    // });
    return {
      isOpen,
      toggleOpen,
      dropdownRef,
    };
  },
});
</script>
