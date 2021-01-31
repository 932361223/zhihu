<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area"
         @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit"
                class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
type ValidateFunc = () => boolean;
import mitt from "mitt";
export const emitter = mitt();
export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit("form-submit", result);
    };
    // const callback = (test: string | undefined) => {
    //   console.log(test);
    // };
    const callback = (func: ValidateFunc) => {
      // console.log(test);
      funcArr.push(func);
    };
    emitter.on("form-item-created", callback as ValidateFunc);
    onUnmounted(() => {
      emitter.off("form-item-created", callback as ValidateFunc);
      funcArr = [];
    });
    return {
      submitForm,
      funcArr,
    };
  },
});
</script>
