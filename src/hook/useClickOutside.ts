import { ref, Ref, onMounted, onUnmounted } from 'vue'
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  // 是否点击外面
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value?.contains(e.target as HTMLElement)) {
      isClickOutside.value = false//点击里面
    } else {
      isClickOutside.value = true
    }

  }
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside

}
export default useClickOutside