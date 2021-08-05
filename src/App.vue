<template>
  <div id="app">
    <todoPC />
    <!-- <icons /> -->

    <div style="text-align:center;padding:50px 0 30px 0;font-size:12px;color:#555;">
      <p>
        <span class="version"
          ><svg-icon
            style="cursor:pointer;font-size:20px;"
            class="icons"
            icon-class="github"
            @click="gotoGithub"
          />
          beta 0.5.0
        </span>
      </p>
      <p>Copyright © 2019 <span style="font-style:italic">hzferrari@qq.com </span></p>
    </div>
  </div>
</template>

<script>
import todoPC from "@/views/todo_pc.vue";
import icons from "./components/Icon";

export default {
  name: "app",
  components: {
    todoPC,
    icons
  },
  methods: {
    gotoGithub() {
      window.open("https://github.com/hzferrari/hzferrari.github.io", "_blank");
    }
  }
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: #efefef;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
