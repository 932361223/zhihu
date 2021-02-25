<template>
  <div class="">
    <validate-form @form-submit="onFromSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"
                        v-model="emailVal"
                        type="text"
                        placeholder="请输入邮箱地址" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input :rules="passwordRules"
                        v-model="passwordVal"
                        type="text"
                        ref="inputRef" />
      </div>
      <!-- # = v-slot -->
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
      <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { useStore } from "vuex";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "@/components/createMessage";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    //双向绑定
    const emailVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱" },
    ];
    const passwordVal = ref("");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    // const onFromSubmit = (e: boolean) => {
    const onFromSubmit = (result: boolean) => {
      //这样有个坏处，子组件里面可能会有插槽，插槽里的可能会有别的validateInput()就获取不到,得
      // 在子元素this.$parent.emit('',...)发射给父
      // 父 const arr=[] this.$on('',(fun)=>{arr.push(fun)})添加去promise
      // console.log("result" + inputRef.value.validateInput());
      if (result) {
        // router.push({ name: "column", params: { id: 1 } });
        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
          icode: "A6B3299F3F2AABD5",
        };
        // store.dispatch("login", payload).then((data) => { //换成组合dispatch
        store
          .dispatch("loginAndFetch", payload)
          .then((data) => {
            createMessage("登录成功 2秒跳转首页", "success");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          })
          .catch((e) => {
            //防止App.vue 抛出红色报错
            console.log(e);
          });
        // router.push("/");
        // store.commit("login");
      }
    };
    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFromSubmit,
      router,
    };
  },
});
</script>
