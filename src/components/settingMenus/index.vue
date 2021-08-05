<template>
  <div class="setting-menus">
    <div class="menus" @mouseover="showDropMenu = true" @mouseleave="showDropMenu = false">
      <svg-icon class="icon" icon-class="menu" />
    </div>
    <transition name="menu-anime">
      <div
        class="menu-drop-down"
        v-show="showDropMenu"
        @mouseover="showDropMenu = true"
        @mouseleave="showDropMenu = false"
      >
        <ul>
          <li class="items">
            <export-data-btn></export-data-btn>
          </li>
          <li class="items">
            <import-data-btn @import-success="onImportSuccess"></import-data-btn>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import exportDataBtn from "@/components/exportData/exportBtn";
import importDataBtn from "@/components/exportData/importBtn";

export default {
  name: "",
  components: {
    exportDataBtn,
    importDataBtn
  },
  props: {},
  computed: {},
  watch: {},
  data() {
    return {
      showDropMenu: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 中转
     */
    onImportSuccess(data) {
      this.$emit("import-success", data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/config";

//下拉菜单动画
.menu-anime-enter-active,
.menu-anime-leave-active {
  transition: all 0.15s;
}
.menu-anime-enter,
.menu-anime-leave-to {
  // transform: scaleY(0);
  opacity: 0;
}

.setting-menus {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menus {
    display: inline-block;
    margin-left: 50%;
    .icon {
      height: $header-height;
      line-height: $header-height;
      font-size: 30px;
      color: #fff;
      cursor: pointer;
    }
  }
  .menu-drop-down {
    position: absolute;
    top: $header-height - 3px;
    left: 0;
    margin-left: 45%;
    padding: 0 10px;
    height: auto;
    line-height: 30px;
    background: #fff;
    box-shadow: $bgColor1 0px 0px 5px 1px;
    border-radius: $borderRadius;
    &::before {
      content: "";
      position: absolute;
      top: -16px;
      left: 34px;
      width: 0;
      height: 0;
      border-width: 8px;
      border-style: solid;
      border-color: transparent #fff transparent transparent;
      transform: rotate(90deg);
    }
    .items {
      padding: 8px 5px;
      border-bottom: 1px solid #ccc;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
