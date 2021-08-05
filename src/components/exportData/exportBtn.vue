<template>
  <div class="export-data-btn">
    <span class="btn" @click="saveDataAsJson">下载数据到本地</span>
  </div>
</template>

<script>
import util from "@/utils/util";

export default {
  name: "export-data-btn",
  components: {},
  props: {},
  data() {
    return {};
  },

  created() {},
  mounted() {},
  methods: {
    saveDataAsJson() {
      let data = {
        todoList: this.getLocalData("todoList"),
        doneList: this.getLocalData("doneList"),
        longTodoList: this.getLocalData("longTodoList"),
        delList: this.getLocalData("delList")
      };

      if (typeof data === "object") {
        data = JSON.stringify(data);
      }

      data =
        "/***todolist:https://hzferrari.github.io and Copyright © 2019 hzferrari@qq.com***/" + data;

      let blob = new Blob([data], { type: "text/json" });
      let a = document.createElement("a");

      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容IE下载
        navigator.msSaveBlob(
          blob,
          "cs_todolist_savedata_" + util.formatDate(new Date(), "yyyyMMddhhmm") + ".json"
        );
      } else {
        // 设置文件名
        a.download =
          "cs_todolist_savedata_" + util.formatDate(new Date(), "yyyyMMddhhmm") + ".json";

        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        // console.log("a: ", a);
        a.click();
      }
    },
    /**
     * 从本地恢复数据
     */
    getLocalData(listName) {
      return JSON.parse(localStorage.getItem(listName));
    }
  }
};
</script>

<style scoped lang="scss">
.export-data-btn {
  display: inline-block;
  .btn {
    cursor: pointer;
    &:hover {
      color: #abc;
    }
  }
}
</style>
