<template>
  <div class="file-upload">
    <div class="file-upload-container"
         @click.prevent="triggerUpload"
         v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'"
            name="loading">
        <button class="btn btn-primary"
                disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'"
            name="uploaded"
            :uploadedData="uploadedData">
        <!-- 插槽传值 -->
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else
            name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input type="file"
           class="file-input d-none"
           ref="fileInput"
           @change="handleFileChange">
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import axios from "axios";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  props: {
    //接口
    action: {
      type: String,
      required: true,
    },
    //传入方法
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
    // uploaded: {
    //   type: Object,
    // },
  },
  inheritAttrs: false, //不让自定义类传到组件的根上 想要加的地方v-bind="$attrs"
  //定义发射事件
  emits: ["file-uploaded", "file-uploaded-error"],
  setup(props, context) {
    // dom节点
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    // console.log(props.uploaded);
    // const fileStatus = ref<UploadStatus>(props.uploaded ? "success" : "ready");
    // const uploadedData = ref(props.uploaded);
    const uploadedData = ref();
    // watch(
    //   () => props.uploaded,
    //   (newValue) => {
    //     if (newValue) {
    //       fileStatus.value = "success";
    //       uploadedData.value = newValue;
    //     }
    //   }
    // );
    const triggerUpload = () => {
      // 有这个DOM就点击
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        fileStatus.value = "loading";
        const files = Array.from(currentTarget.files);
        //如果有自定义方法检查 // CreatePost检查方法传给uploader;uploader再传到helper
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if (!result) {
            // 不满足;
            fileStatus.value = "ready";
            return;
          }
        }
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("icode", "3D9E304DF0D03DF9");
        axios
          .post(props.action, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            // 上传完设置状态
            fileStatus.value = "success";
            console.log(resp);
            //成功赋值给插槽使用 v-bind
            uploadedData.value = resp.data;
            context.emit("file-uploaded", resp.data);
          })
          .catch((error) => {
            // 错误
            fileStatus.value = "error";
            context.emit("file-uploaded-error", { error });
          })
          .finally(() => {
            // 恢复到空值
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      uploadedData,
      handleFileChange,
    };
  },
});
</script>
