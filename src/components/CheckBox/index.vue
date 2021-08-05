<template>
  <div class="cs-checkbox" @click="toggle">
    <span class="box-wrapper" ref="csCheckbox">
      <span class="inner-box" :class="{ 'cs-checkbox-checked': isChecked }" :value="value"> </span>
    </span>
  </div>
</template>
<script>
export default {
  name: "csCheckbox",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isChecked: this.value
    };
  },
  computed: {},
  mounted() {
    //     console.log(': ', this.$refs.csCheckbox.style);
    // this.$refs.csCheckbox.style.width = '10px'
  },
  watch: {
    value(val) {
      this.isChecked = val;
    }
  },
  methods: {
    toggle() {
      this.isChecked = !this.isChecked;

      // 手动点击按钮才需要通知父组件
      this.$emit("change", this.isChecked);
    }
  }
};
</script>
<style lang="scss" scoped>
$borderColor: #507f96;
$color: #507f96;
$borderRadius: 50%;

.cs-checkbox {
  width: 100%;
  display: inline-block;
  .box-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    box-sizing: border-box;
    cursor: pointer;
    // text-align: left;
    &::after {
      content: "";
      display: block;
      margin-top: 100%;
    }
    .inner-box {
      position: absolute;
      display: inline-block;
      margin: 15.5%;
      width: 70%;
      height: 70%;
      border-radius: $borderRadius;
      background: transparent;
      box-sizing: border-box;
      // background: #abc;
      &.cs-checkbox-checked {
        background: $color;
      }
    }
  }
}
</style>
