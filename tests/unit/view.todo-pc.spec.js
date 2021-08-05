import { shallowMount } from "@vue/test-utils";
import todoPc from "@/views/todo_pc";
import Vue from 'vue'

describe("todoPc", () => {
  it("displays ChangeVal when custom event is emitted", () => {
    const wrapper = shallowMount(todoPc,{
      stubs:['svg-icon']  // 用 stubs 选项覆写全局或局部注册的组件，把组件解析为空的存根
    });
    // 
    wrapper.setData({
      longTodoList: [
        {
          content: "test content1",
          id: "_000_1577262540227_552",
          hasDone: false,
          hasDel: false,
          isEdit: false,
          isTop: true,
          createTime: 1577262540227,
          doneTime: -1,
          delTime: -1
        }
      ]
    });

    // 有动画效果，需要写在nextTick才能find到
    return Vue.nextTick().then(function() {
      expect(wrapper.find('.long-todo-list').isVisible()).toBe(true)
    })
    
  });
});
