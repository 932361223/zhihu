<template>
  <div class="validate-input-container pb-3">
    <!-- v-if="tag !== 'textarea'"
    -->
    <input v-if="tag !== 'textarea'"
           class="form-control"
           :class="{'is-invalid': inputRef.error}"
           @blur="validateInput"
           :value="inputRef.val"
           @input="updateValue"
           v-bind="$attrs">
    <textarea v-else
              class="form-control"
              :class="{'is-invalid': inputRef.error}"
              @blur="validateInput"
              v-model="inputRef.val"
              v-bind="$attrs">
    </textarea>
    <span v-if="inputRef.error"
          class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from "vue";
import { emitter } from "./ValidateForm.vue";
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
  type: "required" | "email" | "password";
  message: string;
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    // 双向绑定
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  //禁用默认传到根节点的attrs
  // inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      // 双向绑定
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    const validateInput = () => {
      if (props.rules) {
        // 全部遍历完返回bool
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      // emitter.emit("form-item-created", inputRef.val);
      emitter.emit("form-item-created", validateInput);
    });
    // 双向绑定
    const updateValue = (e: KeyboardEvent) => {
      const targetVal = (e.target as HTMLInputElement).value;
      inputRef.val = targetVal;
      context.emit("update:modelValue", targetVal);
    };
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>
