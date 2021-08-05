import { shallowMount } from "@vue/test-utils";
import Parent from "@/views/todo_pc";

import CsEditInput from "@/components/CsEditInput";

describe("CsEditInput.vue", () => {
  it("DIV has Class 'editing' when editing", () => {
    // 通过 shallowMount 方法只挂载一个组件而不渲染其子组件 (即保留它们的存根)：
    const wrapper = shallowMount(CsEditInput, {
      propsData: {
        id: "testid",
        isEdit: true
      }
    });
    expect(wrapper.contains(".editing")).toBe(true);
  });

  it("DIV hasn't Class 'editing' if not editing", () => {
    const wrapper = shallowMount(CsEditInput, {
      propsData: {
        id: "testid",
        isEdit: false
      }
    });
    // console.log('wrapper2: ', wrapper.vm);
    expect(wrapper.contains(".editing")).toBe(false);
  });
});

describe("Parent", () => {
  it("displays ChangeVal when custom event is emitted", () => {
    const wrapper = shallowMount(Parent,{
      stubs:['svg-icon']  // 用 stubs 选项覆写全局或局部注册的组件，把组件解析为空的存根
    });
    // 此例需要先设置数据，才能找到CsEditInput
    wrapper.setData({
      todoList: [
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
    let changeVal = "text";
    wrapper.find(CsEditInput).vm.$emit("change", changeVal);
    expect(wrapper.html()).toContain(changeVal);
  });
});
