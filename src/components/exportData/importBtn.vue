<template>
  <div class="import-data-btn">
    <span class="btn" @click="importDataFromJson">从本地导入数据</span>
    <input style="display:none;" ref="importInput" type="file" @change="onFileChange" />
  </div>
</template>

<script>
import util from "@/utils/util";

export default {
  name: "import-data-btn",
  components: {},
  props: {},
  data() {
    return {};
  },

  created() {},
  mounted() {},
  methods: {
    importDataFromJson() {
      this.$refs.importInput.click();
    },
    onFileChange(e) {
      let vm = this;
      let file = e.target.files[0];
      // console.log("file: ", file);
      // console.log(": ", this.$refs.importInput.files);
      var reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function(evt) {
        let result = evt.target.result;

        vm.handleLoadRes(result);
      };
    },
    /**
     * 处理本地上传完成的数据
     */
    handleLoadRes(data) {
      data = data.split("hzferrari@qq.com***/")[1];
      // console.log("handleLoadRes: ", data);

      let dataJson = JSON.parse(data);
      // console.log("读取结果转为JSON：", dataJson);
      this.$emit("import-success", dataJson);
    }
  }
};
</script>

<style scoped lang="scss">
.import-data-btn {
  display: inline-block;
  .btn {
    cursor: pointer;
    &:hover {
      color: #abc;
    }
  }
}
</style>
