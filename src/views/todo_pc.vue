<template>
  <div class="CS-Todo">
    <div id="scroll-anchor"></div>
    <div class="header">
      <div class="width-wrapper">
        <span class="title">待办事项</span>
        <span class="todo-input">
          <input
            v-model="todoInputingValue"
            :maxlength="maxInputLen"
            type="text"
            placeholder="按下Enter，添加todo"
            autocomplete="off"
            @keydown="onTodoInputKeydown"
          />
        </span>
        <span class="todo-input-right-space">
          <setting-menus @import-success="onImportSuccess"></setting-menus>
        </span>
      </div>
    </div>
    <div class="width-wrapper">
      <div class="layouts layout-left">
        <div class="long-todo-list-box">
          <div class="title" v-if="longTodoList.length > 0">
            <span>长期事项</span>
            <span class="items-sum">{{ longTodoList.length }}</span>
            <span class="collection">
              <svg-icon
                class="icons"
                :class="{ rotate: !longTodoListVisible }"
                icon-class="down"
                @click="foldList('longTodoList')"
              />
            </span>
          </div>
          <transition name="list-anime3">
            <transition-group
              class="long-todo-list"
              v-if="longTodoList.length > 0"
              v-show="longTodoListVisible"
              name="list-anime1"
              tag="ul"
            >
              <li
                class="items todo-list-item"
                :class="{
                  'is-top-item': item.isTop,
                  'un-top-item': !item.isTop,
                  'is-fold': item.isFold,
                }"
                v-for="(item, index) in longTodoList"
                :key="item.id"
              >
                <div class="line-1">
                  <!-- check按钮 -->
                  <span class="check">
                    <cs-checkbox
                      class="inner"
                      v-model="item.hasDone"
                      @change="
                        onTodoListItemCheckChange(item, index, 'longTodoList')
                      "
                    ></cs-checkbox>
                  </span>

                  <!-- 编辑输入框 -->
                  <div class="content">
                    <cs-edit-input
                      class="editor"
                      v-model="item.content"
                      :id="item.id"
                      :isEdit="item.isEdit && !item.isFold"
                      @click="onItemClick(item)"
                      @blur="onItemInputBlur(item)"
                    ></cs-edit-input>
                  </div>

                  <!-- 右上角图标 -->
                  <span class="right-top-btn">
                    <svg-icon
                      v-show="!item.isFold"
                      class="icons"
                      icon-class="minus"
                      @click="foldItem(item)"
                    />
                    <svg-icon
                      v-show="item.isFold"
                      class="icons"
                      icon-class="plus"
                      @click="foldItem(item)"
                    />
                  </span>
                </div>

                <!-- 底部日期和按钮 -->
                <div class="collection">
                  <span class="time" title="创建日期">
                    {{
                      formatDate(new Date(item.createTime), "yyyy-MM-dd hh:mm")
                    }}
                  </span>
                  <span class="operations">
                    <span title="置顶" v-show="!item.isTop">
                      <svg-icon
                        class="icons"
                        icon-class="pin"
                        @click="toTop(item, index, 'longTodoList')"
                      />
                    </span>
                    <span title="取消置顶" v-show="item.isTop">
                      <svg-icon
                        class="icons is-top"
                        icon-class="pin"
                        @click="cancelTop(item, index, 'longTodoList')"
                      />
                    </span>
                    <span title="移至普通事项">
                      <svg-icon
                        class="icons long-time"
                        icon-class="wave"
                        @click="
                          moveItem(item, index, 'longTodoList', 'todoList')
                        "
                      />
                    </span>
                    <span title="删除">
                      <svg-icon
                        class="icons"
                        icon-class="cross"
                        @click="delItem(item, index, 'longTodoList', false)"
                      />
                    </span>
                  </span>
                </div>
              </li>
            </transition-group>
          </transition>
        </div>
      </div>
      <div class="layouts layout-middle">
        <div class="todo-list-box">
          <div class="title">
            <span>正在进行</span>
            <span class="items-sum">{{ todoList.length }}</span>

            <span class="collection">
              <svg-icon
                class="icons"
                :class="{ rotate: !todoListVisible }"
                icon-class="down"
                @click="foldList('todoList')"
              />
            </span>
          </div>
          <transition name="list-anime3">
            <transition-group
              class="todo-list"
              v-if="todoList.length > 0"
              v-show="todoListVisible"
              name="list-anime1"
              tag="ul"
            >
              <li
                class="items todo-list-item"
                :class="{
                  'is-top-item': item.isTop,
                  'un-top-item': !item.isTop,
                  'is-fold': item.isFold,
                }"
                v-for="(item, index) in todoList"
                :key="item.id"
              >
                <div class="line-1">
                  <!-- check按钮 -->
                  <span class="check">
                    <cs-checkbox
                      class="inner"
                      v-model="item.hasDone"
                      @change="
                        onTodoListItemCheckChange(item, index, 'todoList')
                      "
                    ></cs-checkbox>
                  </span>

                  <!-- 编辑输入框 -->
                  <div class="content">
                    <cs-edit-input
                      class="editor"
                      v-model="item.content"
                      :id="item.id"
                      :isEdit="item.isEdit && !item.isFold"
                      @click="onItemClick(item)"
                      @blur="onItemInputBlur(item)"
                    ></cs-edit-input>
                  </div>

                  <!-- 右上角图标 -->
                  <span class="right-top-btn">
                    <svg-icon
                      v-show="!item.isFold"
                      class="icons"
                      icon-class="minus"
                      @click="foldItem(item)"
                    />
                    <svg-icon
                      v-show="item.isFold"
                      class="icons"
                      icon-class="plus"
                      @click="foldItem(item)"
                    />
                  </span>
                </div>

                <!-- 底部日期和按钮 -->
                <div class="collection">
                  <span class="time" title="创建日期">
                    {{
                      formatDate(new Date(item.createTime), "yyyy-MM-dd hh:mm")
                    }}
                  </span>
                  <span class="operations">
                    <span title="置顶" v-show="!item.isTop">
                      <svg-icon
                        class="icons"
                        icon-class="pin"
                        @click="toTop(item, index, 'todoList')"
                      />
                    </span>
                    <span title="取消置顶" v-show="item.isTop">
                      <svg-icon
                        class="icons is-top"
                        icon-class="pin"
                        @click="cancelTop(item, index, 'todoList')"
                      />
                    </span>
                    <span title="长期事项">
                      <svg-icon
                        class="icons"
                        icon-class="wave"
                        @click="
                          moveItem(item, index, 'todoList', 'longTodoList')
                        "
                      />
                    </span>
                    <span title="删除">
                      <svg-icon
                        class="icons"
                        icon-class="cross"
                        @click="delItem(item, index, 'todoList', false)"
                      />
                    </span>
                  </span>
                </div>
              </li>
            </transition-group>
          </transition>
        </div>

        <div class="done-list-box">
          <div class="title">
            <span>已完成</span>
            <span class="items-sum">{{ doneList.length }}</span>
            <span class="collection">
              <span title="删除所有">
                <svg-icon
                  class="icons"
                  icon-class="delete"
                  @click="delAllDoneItem()"
                />
              </span>
              <svg-icon
                class="icons"
                :class="{ rotate: !doneListVisible }"
                icon-class="down"
                @click="foldList('doneList')"
              />
            </span>
          </div>
          <transition name="list-anime3">
            <transition-group
              class="done-list"
              v-if="doneList.length > 0"
              v-show="doneListVisible"
              name="list-anime2"
              tag="ul"
            >
              <li
                class="items done-list-item"
                v-for="(item, index) in doneList"
                :key="item.id"
              >
                <div class="line-1">
                  <span class="check">
                    <cs-checkbox
                      class="inner"
                      v-model="item.hasDone"
                      @change="onDoneListItemCheckChange(item, index)"
                    ></cs-checkbox>
                  </span>
                  <div class="content">
                    <cs-edit-input
                      class="editor"
                      v-model="item.content"
                      :id="item.id"
                      :isEdit="false"
                    ></cs-edit-input>
                  </div>
                </div>

                <div class="collection">
                  <span class="time" title="完成日期">
                    {{
                      formatDate(new Date(item.doneTime), "yyyy-MM-dd hh:mm")
                    }}
                  </span>
                  <span class="operations">
                    <span title="删除">
                      <svg-icon
                        class="icons"
                        icon-class="cross"
                        @click="delItem(item, index, 'doneList', false)"
                      />
                    </span>
                  </span>
                </div>
              </li>
            </transition-group>
          </transition>
        </div>

        <div class="del-list-box">
          <div class="title" v-if="delList.length > 0">
            <span title="事项删除30天后将被自动移除">已删除</span>
            <span class="items-sum">{{ delList.length }}</span>
            <span class="collection">
              <span title="彻底删除所有">
                <svg-icon
                  class="icons"
                  icon-class="delete"
                  @click="delAllDelItem()"
                />
              </span>
              <svg-icon
                class="icons"
                :class="{ rotate: !delListVisible }"
                icon-class="down"
                @click="foldList('delList')"
              />
            </span>
          </div>
          <transition name="list-anime3">
            <transition-group
              class="del-list"
              v-if="delList.length > 0"
              v-show="delListVisible"
              name="list-anime2"
              tag="ul"
            >
              <li
                class="items del-list-item"
                v-for="(item, index) in delList"
                :key="item.id"
              >
                <div class="line-1">
                  <span class="check">
                    <cs-checkbox
                      class="inner"
                      v-model="item.hasDone"
                    ></cs-checkbox>
                  </span>
                  <div class="content">
                    <cs-edit-input
                      class="editor"
                      v-model="item.content"
                      :id="item.id"
                      :isEdit="false"
                      del
                    ></cs-edit-input>
                  </div>
                </div>

                <div class="collection">
                  <span class="time" title="删除日期">
                    {{ formatDate(new Date(item.delTime), "yyyy-MM-dd hh:mm") }}
                  </span>
                  <span
                    class="auto-del-hints"
                    v-if="item.autoDelDay && item.autoDelDay <= 10"
                    >此条项目将在{{ item.autoDelDay }}天后自动删除</span
                  >
                  <span class="operations">
                    <span title="恢复项目">
                      <svg-icon
                        class="icons"
                        icon-class="return"
                        @click="returnItem(item, index)"
                      />
                    </span>
                    <span title="彻底删除">
                      <svg-icon
                        class="icons"
                        icon-class="cross"
                        @click="delItem(item, index, 'delList', false)"
                      />
                    </span>
                  </span>
                </div>
              </li>
            </transition-group>
          </transition>
        </div>
      </div>
      <div class="layouts layout-right"></div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import util from "@/utils/util";
import CsCheckbox from "@/components/CheckBox";
import CsEditInput from "@/components/CsEditInput";
import SettingMenus from "@/components/SettingMenus";

export default {
  name: "CS-Todo",
  components: {
    CsCheckbox,
    CsEditInput,
    SettingMenus,
  },
  data() {
    return {
      todoInputingValue: "",
      todoList: [],
      longTodoList: [],
      doneList: [],
      delList: [], // 已经删除的项
      longTodoListVisible: true,
      todoListVisible: true,
      doneListVisible: true,
      delListVisible: false,
      delListAutoDelDay: 30, // x天自动删除
      maxInputLen: 500, // 输入框文本限制长度
      showDropMenu: false,
    };
  },
  watch: {
    /**
     * list发生变化时也记录在本地(需要deep监听)
     */
    todoList: {
      handler: function (val, oldVal) {
        localStorage.setItem("todoList", JSON.stringify(val));
        this.initSortable();
      },
      deep: true,
    },
    doneList: {
      handler: function (val, oldVal) {
        localStorage.setItem("doneList", JSON.stringify(val));
      },
      deep: true,
    },
    longTodoList: {
      handler: function (val, oldVal) {
        localStorage.setItem("longTodoList", JSON.stringify(val));
        this.initSortable();
      },
      deep: true,
    },
    delList: {
      handler: function (val, oldVal) {
        localStorage.setItem("delList", JSON.stringify(val));
      },
      deep: true,
    },
  },
  created() {
    this.recoverData("todoList");
    this.recoverData("doneList");
    this.recoverData("longTodoList");
    this.recoverData("delList");

    this.recoverFoldState("todoList");
    this.recoverFoldState("doneList");
    this.recoverFoldState("longTodoList");
    this.recoverFoldState("delList");

    this.autoDel();
  },
  mounted() {
    this.initSortable();
  },
  methods: {
    formatDate(date, format) {
      return util.formatDate(date, format);
    },
    /**
     * 从本地恢复数据
     */
    recoverData(listName) {
      let list = JSON.parse(localStorage.getItem(listName));
      if (list && Object.prototype.toString.call(list) === "[object Array]") {
        this[listName] = [...list];
      } else {
        this[listName] = [];
      }
      // 编辑状态全部置为false
      this[listName].forEach((v) => {
        v.isEdit = false;
      });
    },
    /**
     * @event
     */
    onTodoInputKeydown(e) {
      if (e.keyCode === 13) {
        // 按下回车键
        this.add(e);
      }
    },
    /**
     *  初始化拖拽
     */
    initSortable() {
      let _this = this;

      const el = document.querySelectorAll(
        "#app > div > div.width-wrapper > div.layouts.layout-middle > div.todo-list-box > ul "
      )[0]; // todolist
      const el2 = document.querySelectorAll(
        "#app > div > div.width-wrapper > div.layouts.layout-left > div.long-todo-list-box > ul "
      )[0]; // longtodolist

      if (el) {
        setUntopItemSortable(el, "todoList");
        setTopItemSortable(el, "todoList");
      }
      if (el2) {
        setUntopItemSortable(el2, "longTodoList");
        setTopItemSortable(el2, "longTodoList");
      }

      function setUntopItemSortable(el, listName) {
        Sortable.create(el, {
          ghostClass: "list-item-sortable-ghost", // 拖拽时的class（可设置拖拽时的显示样式）
          draggable: ".un-top-item", // 允许拖拽的项
          sort: true,
          scroll: true,
          scrollSpeed: 5, // px
          animation: 150,
          scrollSensitivity: 30,
          onUpdate: (evt) => {
            // sortable改变了真实DOM的排序后,在回调函数里还原移动过的DOM（避免和Vue自带的DOM操作冲突）
            let newIndex = evt.newIndex;
            let oldIndex = evt.oldIndex;

            // 更新数组。若移动的位置在置顶项中，将其放在非置顶项第一位(设置了draggable参数则不需要自行处理这个！！)
            let topItemLen = _this[listName].length;
            for (let i = 0; i < _this[listName].length; i++) {
              if (!_this[listName][i].isTop) {
                topItemLen = i;
                break;
              }
            }
            if (newIndex < topItemLen) {
              newIndex = topItemLen;

              // 改变了newIndex的情况下，需要这样写DOM才会更新
              let tpm = _this[listName].splice(oldIndex, 1);
              _this.$nextTick(() => {
                _this[listName].splice(newIndex, 0, tpm[0]);
              });
            } else {
              let tpm = _this[listName].splice(oldIndex, 1);
              _this[listName].splice(newIndex, 0, tpm[0]);
            }
            // 删除移动过的节点，并还原其位置(产生移动动画效果)
            // let newChild = el.children[newIndex];
            // let oldChild = el.children[oldIndex];
            // el.removeChild(newChild);
            // if (newIndex > oldIndex) {
            //   el.insertBefore(newChild, oldChild);
            // } else {
            //   el.insertBefore(newChild, oldChild.nextSibling);
            // }
          },
        });
      }

      function setTopItemSortable(el, listName) {
        Sortable.create(el, {
          ghostClass: "list-item-sortable-ghost", // 拖拽时的class（可设置拖拽时的显示样式）
          draggable: ".is-top-item", // 允许拖拽的项
          sort: true,
          scroll: true,
          scrollSpeed: 5, // px
          animation: 150,
          scrollSensitivity: 30,
          onUpdate: (evt) => {
            // sortable改变了真实DOM的排序后,在回调函数里还原移动过的DOM（避免和Vue自带的DOM操作冲突）
            let newIndex = evt.newIndex;
            let oldIndex = evt.oldIndex;

            let tpm = _this[listName].splice(oldIndex, 1);
            _this[listName].splice(newIndex, 0, tpm[0]);
          },
        });
      }
    },
    /**
     * @function insertItemUnderTop 将item置于非置顶项的最上方
     * @param {Object} item 要插入的事项
     * @param {String} insertListName 要插入的列表名
     */
    insertItemUnderTop(item, insertListName) {
      if (this[insertListName].length === 0) {
        this[insertListName].push(item);
        return;
      }
      for (let i = 0; i < this[insertListName].length; i++) {
        if (!this[insertListName][i].isTop) {
          this[insertListName].splice(i, 0, item);
          break;
        } else if (i === this[insertListName].length - 1) {
          // 全部都是置顶的情况
          this[insertListName].push(item);
          break;
        }
      }
    },
    /**
     * 折叠/展开列表
     */
    foldList(listName) {
      this[listName + "Visible"] = !this[listName + "Visible"];
      localStorage.setItem(listName + "Visible", this[listName + "Visible"]);
    },
    /**
     * 折叠/展开一个项
     */
    foldItem(item) {
      if (item.isFold === undefined) {
        this.$set(item, "isFold", true);
      } else {
        item.isFold = !!!item.isFold;
      }
    },
    /**
     * 从local恢复列表折叠状态
     */
    recoverFoldState(listName) {
      let flag = localStorage.getItem(listName + "Visible");

      if (flag === "true") {
        this[listName + "Visible"] = true;
      } else if (flag === "false") {
        this[listName + "Visible"] = false;
      }
    },
    /**
     * 新增
     */
    add(evt) {
      if (evt.target.value && evt.target.value.trim() != "") {
        let o = {
          content: evt.target.value.trim(),
          id:
            "_000_" +
            new Date().getTime() +
            "_" +
            Math.round(Math.random() * 10000),
          hasDone: false, // 是否完成
          hasDel: false, // 是否删除
          isEdit: false, // 是否编辑状态
          isTop: false, // 是否置顶
          createTime: new Date().getTime(),
          doneTime: -1,
          delTime: -1,
        };

        document
          .querySelector("#scroll-anchor")
          .scrollIntoView({ behavior: "instant" });

        // 插入在非置顶项的第一个
        this.insertItemUnderTop(o, "todoList");

        this.todoInputingValue = "";
      }
    },
    /**
     * item点击时
     */
    onItemClick(item) {
      item.isEdit = true;
    },
    /**
     * 编辑项blur时
     */
    onItemInputBlur(item) {
      item.isEdit = false;
    },
    /**
     * todolist/longtodolist CheckBox变化时
     */
    onTodoListItemCheckChange(item, index, listName) {
      if (item.hasDone === false) return;

      item.doneTime = new Date().getTime();
      let tmp = this[listName].splice(index, 1)[0];
      this.doneList.unshift(tmp);
    },
    /**
     * donelist CheckBox变化时
     */
    onDoneListItemCheckChange(item, index) {
      if (item.hasDone === true) return;
      item.isTop = false;
      let tmp = this.doneList.splice(index, 1)[0];

      this.insertItemUnderTop(tmp, "todoList");
    },
    /**
     * 置顶。置于整个队列最上方
     * @param {String} listName 列表名
     */
    toTop(item, index, listName) {
      item.isTop = true;
      let tmp = this[listName].splice(index, 1)[0];
      this[listName].unshift(tmp);
    },
    /**
     * 取消置顶，置于非置顶队列的最上方
     */
    cancelTop(item, index, listName) {
      item.isTop = false;
      let tmp = this[listName].splice(index, 1)[0];

      this.insertItemUnderTop(tmp, listName);
    },
    /**
     * 项目移动
     * @param {String} fromList 从这个列表移出
     * @param {String} toList 移到这个列表
     */
    moveItem(item, index, fromList, toList) {
      item.isTop = false;
      let tmp = this[fromList].splice(index, 1)[0];

      this.insertItemUnderTop(tmp, toList);
    },
    /**
     * 删除
     * @param {String} listName 列表名
     * @param {Boolean} flag 是否需要弹窗确认
     */
    delItem(item, index, listName, flag) {
      let tmp;
      if (flag) {
        let cf = confirm(`确认要删除【${item.content}】吗？`);
        if (cf) {
          tmp = this[listName].splice(index, 1)[0];
        }
      } else {
        tmp = this[listName].splice(index, 1)[0];
      }

      if (listName !== "delList") {
        tmp.delTime = new Date().getTime();
        tmp.autoDelDay = this.delListAutoDelDay - this.calDIffDay(tmp.delTime);
        this.delList.unshift(tmp);
      }
    },
    /**
     * 从删除列表中恢复项目到todolist或doneList
     */
    returnItem(item, index) {
      let tmp = this.delList.splice(index, 1)[0];
      if (!item.hasDone) {
        this.insertItemUnderTop(tmp, "todoList");
      } else {
        this.insertItemUnderTop(tmp, "doneList");
      }
    },
    /**
     * 移除所有已完成项目到已删除
     */
    delAllDoneItem() {
      let cf = confirm(`确认要将所有【已完成】项移到【已删除】吗？`);
      if (cf) {
        this.doneList.forEach((v) => {
          v.delTime = new Date().getTime();
        });
        this.delList = Array.prototype.concat.apply(
          [],
          [this.doneList, this.delList]
        );
        this.doneList = [];
      }
    },
    /**
     * 彻底删除所有已删除项目
     */
    delAllDelItem() {
      let cf = confirm(`确认要将所有【已删除】项彻底删除吗？`);
      if (cf) {
        this.delList = [];
      }
    },
    /**
     * 检测自动删除项目
     * 超过delListAutoDelDay后自动删除（只看日期，不看具体小时分钟）
     */
    autoDel() {
      if (!this.delList || this.delList.length === 0) return;

      let today = new Date().getTime();
      let newList = [];
      this.delList.forEach((v) => {
        let diff = this.calDIffDay(v.delTime);
        // console.log("v.diff: ", diff);
        if (diff < this.delListAutoDelDay) {
          v.autoDelDay = this.delListAutoDelDay - diff;
          newList.push(v);
        }
      });
      this.delList = newList;
    },
    /**
     * // 计算日期到今天的相差天数，向下取整
     */
    calDIffDay(timeStamp) {
      return Math.floor(
        (new Date() - new Date(timeStamp)) / 60 / 60 / 24 / 1000
      );
    },
    /**
     * 成功导入本地数据后
     */
    onImportSuccess(data) {
      let _this = this;

      _insertDataF1(data, "todoList");
      _insertDataF2(data, "doneList");
      _insertDataF1(data, "longTodoList");
      _insertDataF2(data, "delList");

      // 合并有置顶项的列表
      function _insertDataF1(data, listName) {
        let oldListTopCount = 0;
        let importListTopCount = 0;

        if (!_this[listName]) _this[listName] = [];
        if (!data[listName]) data[listName] = [];

        for (let i = 0, len = _this[listName].length; i < len; i++) {
          // 记录原来的列表的置顶项长度
          if (_this[listName][i].isTop) {
            oldListTopCount++;
          }
          for (let j = 0, len2 = data[listName].length; j < len2; j++) {
            // 处理重复id
            if (_this[listName][i].id === data[listName][j].id) {
              data[listName][j].id +=
                "_copy_" + Math.round(Math.random() * 10000);
            }
            // 只在第一次遍历data[listName]时记录置顶项的长度
            if (i === 0 && data[listName][j].isTop) {
              importListTopCount++;
            }
          }
        }

        // 截取两个列表的top项并组合新数组，截取两个列表的非top项并组合新数组
        // 最后组合成完整列表
        let newTopList = Array.prototype.concat.apply(
          [],
          [
            _this[listName].slice(0, oldListTopCount),
            data[listName].slice(0, importListTopCount),
          ]
        );
        let newUnTopList = Array.prototype.concat.apply(
          [],
          [
            _this[listName].slice(oldListTopCount),
            data[listName].slice(importListTopCount),
          ]
        );

        _this[listName] = Array.prototype.concat.apply(
          [],
          [newTopList, newUnTopList]
        );
      }
      // 合并没有置顶项的列表，导入的项目直接往最后放
      function _insertDataF2(data, listName) {
        if (!_this[listName]) _this[listName] = [];
        if (!data[listName]) data[listName] = [];

        for (let i = 0, len = _this[listName].length; i < len; i++) {
          for (let j = 0, len2 = data[listName].length; j < len2; j++) {
            // 处理重复id
            if (_this[listName][i].id === data[listName][j].id) {
              data[listName][j].id +=
                "_copy_" + Math.round(Math.random() * 10000);
            }
          }
        }

        _this[listName] = Array.prototype.concat.apply(
          [],
          [_this[listName], data[listName]]
        );
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$content-width: 1200px;
$header-height: 50px;
$borderRadius: 6px;
$bgColor1: #abc;
$textColor: #000;
$textColor2: #555;

/**列表变化样式 */
.todo-list-item,
.done-list-item,
.del-list-item {
  transition: all 0.15s;
}
// 下面是add和del的动画
.list-anime1-enter-active,
.list-anime1-leave-active {
  transition: transform 0.15s;
}
.list-anime1-enter,
.list-anime1-leave-to {
  transform: translate3d(-700px, 0, 0);
}
.list-anime1-leave-to {
  position: absolute !important;
  width: 150px !important;
}

.list-anime2-enter-active,
.list-anime2-leave-active {
  transition: all 0.15s ease;
}
.list-anime2-enter,
.list-anime2-leave-to {
  transform: translate3d(700px, 0, 0);
  opacity: 0.3;
}

.list-anime3-enter-active,
.list-anime3-leave-active {
  transition: all 0.15s;
}
.list-anime3-enter,
.list-anime3-leave-to {
  transform: scale3d(0);
  opacity: 1;
}

/**拖动样式 */
.list-item-sortable-ghost {
  opacity: 0.3;
  color: #fff !important;
  background: $bgColor1 !important;
}

@mixin input-style {
  font-family: "Microsoft YaHei";
  letter-spacing: 0.6px;
}

.CS-Todo {
  font-family: "Microsoft YaHei";
  font-size: 12px;
  width: 100%;
  // overflow-x: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .width-wrapper {
    // width:$content-width;
    width: 100%;
    display: block;
    margin: 0 auto;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: $bgColor1;
    height: $header-height;
    line-height: $header-height;
    text-align: center;
    z-index: 100;
    .title,
    .todo-input,
    .todo-input-right-space {
      position: relative;
      display: inline-block;
      margin: 0;
      width: 33%;
      vertical-align: top;
    }
    .todo-input-right-space {
      text-align: left;
    }
    .title {
      position: relative;
      font-size: 30px;
      font-weight: 700;
      // color: #507f96;
      color: #fff;
      letter-spacing: 2px;
      text-shadow: 1px 2px 0px #8e8e8e;
    }
    .todo-input {
      margin: 0 auto;
      height: $header-height;
      line-height: $header-height;
      vertical-align: top;
      input {
        @include input-style;
        height: 30px;
        width: 96%;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: $borderRadius;
        font-size: 12px;
      }
    }
  }
  .layouts {
    display: inline-block;
    vertical-align: top;
    margin-top: $header-height;
    &.layout-left,
    &.layout-right {
      width: 30%;
    }
    &.layout-middle {
      width: 40%;
    }
  }
  .todo-list-box,
  .done-list-box,
  .del-list-box {
    width: 90%;
  }
  .long-todo-list-box {
    width: 80%;
  }

  .todo-list-box,
  .done-list-box,
  .long-todo-list-box,
  .del-list-box {
    margin: 20px auto;
    vertical-align: top;
    .title {
      margin-top: 10px;
      height: 17px;
      line-height: 17px;
      font-size: 15px;
      font-weight: 600;
      color: $textColor2;
      letter-spacing: 0.7px;
      .items-sum {
        position: relative;
        display: inline-block;
        padding: 2px;
        margin-left: 5px;
        // float: right;
        min-width: 16px;
        height: 12px;
        line-height: 12px;
        font-size: 10px;
        text-align: center;
        border-radius: $borderRadius;
        color: #fff;
        background: $bgColor1;
        vertical-align: middle;
      }
      .collection {
        position: relative;
        float: right;
        overflow: hidden;
        .icons {
          margin-left: 15px;
          font-size: 13px;
          line-height: 13px;
          color: $bgColor1;
          transition: all 0.2s;
          cursor: pointer;
          &.rotate {
            transform: rotate(180deg);
          }
        }
      }
    }

    .todo-list,
    .done-list,
    .long-todo-list,
    .del-list {
      .items {
        position: relative;
        margin: 10px auto;
        padding-top: 3px;
        width: 100%;
        min-height: 40px;
        line-height: 30px;
        font-size: 13px;
        background: #fff;
        color: $textColor;
        border-radius: $borderRadius;
        &:hover {
          .operations {
            opacity: 1 !important;
          }
        }
        &.is-fold {
          height: 35px;
          min-height: 0;
          overflow: hidden;
        }
        .check {
          margin-left: 2%;
          margin-right: 2%;
          .inner {
            display: block;
            margin: 0 auto;
            margin-top: 8%;
            width: 16px;
            height: 16px;
          }
        }
        .content {
          min-height: 20px;
          letter-spacing: 0.6px;
          word-break: break-all;
          vertical-align: top;
        }
        div.collection {
          display: inline-block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          span.time {
            display: inline-block;
            margin-left: 7%;
            font-size: 9px;
            color: #ccc;
          }
          .operations {
            float: right;
            margin-right: 0px;
            opacity: 0.15;
            transition: all 0.2s;
          }
          .icons {
            padding: 1px;
            margin-right: 15px;
            font-size: 14px;
            cursor: pointer;
            color: #000;
            border-radius: 20%;
            transition: all 0.2s;
            &.is-top {
              transform: rotate(-45deg);
              &:hover {
                transform: rotate(0) scale(1.5);
              }
            }
            &:hover {
              // font-size: 18px;
              transform: scale(1.5);
              color: #fff;
              background: $bgColor1;
            }
          }
        }
      }
    }

    .todo-list,
    .long-todo-list {
      .items {
        background: #fff;

        &:hover {
          cursor: move;
        }
        &.is-top-item {
          background: #f9ffbd;
          &:hover {
            cursor: default;
          }
        }

        .line-1 {
          display: flex;
          justify-content: space-between;
          .content {
            flex-grow: 2; // 空间不足时分配更多剩余空间
          }
          .editor {
          }
        }

        .content {
          cursor: pointer;
          .editor {
            @include input-style;
            // width: 80%;
            vertical-align: top;
          }
        }

        .right-top-btn {
          margin-right: 16px;
          margin-left: 10px;
          .icons {
            font-size: 12px;
            line-height: 12px;
            color: #000;
            opacity: 0.2;
            transition: all 0.2s;
            cursor: pointer;
          }
        }
      }
    }
    .long-todo-list {
      .items {
        .check {
          // width: 8%;
          // padding: 0 1% 0 2%;
          .inner {
            width: 15px;
          }
        }
        .content {
        }
        .editor {
        }
        .collection {
          span.time {
            margin-left: 11% !important;
          }
          .icons.long-time {
            &:hover {
              // transform: rotate(45deg) scale(1.5);
              transform: scale(1.5);
            }
          }
        }
      }
    }
    .done-list,
    .del-list {
      .items {
        background: #eaeaea;
        color: #848484;

        .line-1 {
          display: flex;
          justify-content: space-between;
          .content {
            flex-grow: 2; // 空间不足时分配更多剩余空间
          }
        }
        .collection {
          .auto-del-hints {
            margin-left: 10px;
            font-size: 8px;
            color: #f96e6e;
          }
        }
      }
    }
  }
}
</style>
