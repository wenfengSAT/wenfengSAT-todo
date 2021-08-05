<template>
  <div class="cs-edit-input">
    <!-- <div
      :contenteditable="isEdit"
      :ref="'input' + id"
      class="edit-content"
      :class="{ editing: isEdit }"
      type="text"
      @input="onInputing"
      @paste="onPaste"
      @keydown="enterPressBlur"
      @click="onClick"
      @blur="onBlur"
    >
      {{ content }}
    </div>-->

    <!-- 可换行 -->
    <div
      v-html="content"
      :contenteditable="isEdit"
      :ref="'input' + id"
      class="edit-content"
      :class="{ editing: isEdit, del: del }"
      type="text"
      @input="onInputing"
      @paste="onPaste"
      @click="onClick"
      @blur="onBlur"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CS-Edit-Input",
  components: {},
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      required: true,
      default: ""
    },
    isEdit: {
      type: Boolean,
      required: true,
      default: false
    },
    del: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: this.value,
      maxInputLen: 10 // 输入框文本限制长度
    };
  },
  watch: {
    content(val) {
      this.$emit("change", val); // 用于绑定v-model
    }
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * @event
     * 输入框按回车时，自动blur
     */
    enterPressBlur(e) {
      if (e.keyCode === 13) {
        // 按下回车键
        e.target.blur();
      }
    },
    /**
     * input输入事件
     */
    onInputing(e) {
      return;
      let innerText = e.target.innerText;

      console.log("1: ", innerText);
      // 限制输入字数
      if (innerText.length > this.maxInputLen) {
        this.content = innerText.substring(0, this.maxInputLen);
      } else {
        // this.content = innerText;
      }
      // this.cursorToEnd();
    },
    /**
     * @event paste 粘贴事件
     * 过滤html格式
     */
    onPaste(e) {
      e.stopPropagation();
      e.preventDefault();
      var text = "",
        event = e.originalEvent || e;
      if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData("text/plain");
      } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData("Text");
      }

      // 将换行符替换为空格，否则有bug
      text = text.replace(/\r\n/g, " ");

      document.execCommand("insertText", false, text);
    },
    /**
     * 点击时，自动focus并移动光标到尾部
     */
    onClick() {
      if (this.isEdit) {
        return;
      }

      this.$emit("click");

      this.$nextTick(() => {
        this.$refs["input" + this.id].focus();
        this.cursorToEnd();
      });
    },
    /**
     * blur时
     */
    onBlur(item) {
      // this.content = this.$refs["input" + this.id].innerText;
      this.content = this.$refs["input" + this.id].innerHTML;

      this.$emit("blur");
    },
    /**
     * 光标移动文字最后
     */
    cursorToEnd() {
      var textbox = this.$refs["input" + this.id];
      var sel = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(textbox);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
};
</script>

<style scoped lang="scss">
.cs-edit-input {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: 13px;
  cursor: pointer;
  .edit-content {
    padding: 3px 0;
    line-height: 26px;
    min-height: 26px; // 若不设置，没有内容时无法点击
    word-break: break-all;
    &:focus {
      outline: none;
    }
    &.editing {
      box-shadow: inset 0px -0.5px 0px #ddd; // 用box-shadow，高度变化时文字不会产生移动
      cursor: auto;
    }
    &.del {
      text-decoration: line-through;
    }
  }
}
</style>
