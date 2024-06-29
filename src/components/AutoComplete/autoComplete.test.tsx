import React from "react";
import { config } from "react-transition-group";
import { render, RenderResult, fireEvent, waitFor } from "@testing-library/react";
import { AutoComplete, AutoCompleteProps } from "./autoComplete";

config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];
const testProps: AutoCompleteProps = {
  fetchSuggestions: query => {
    return testArray.filter(item => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("AutoComplete组件测试", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />); // 渲染组件
    // 获取input节点(获取placeholder文字)
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
  });
  it("默认操作测试", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } }); // 设置change事件，并触发
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument(); // ab已经在DOM中渲染
    });
    // 根据长度判断应该有2个匹配
    expect(wrapper.container.querySelectorAll(".suggestion-item").length).toEqual(2);
    // 点击其中一个匹配
    fireEvent.click(wrapper.getByText("ab"));
    // 测试onSelect内的值是否正确
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: "ab", number: 11 });
    // 测试下拉选单匹配是否被删除
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    // 测试input的值是否正确
    expect(inputNode.value).toBe("ab");
  });
  it("键盘行为测试", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } }); // 设置change事件，并触发
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument(); // ab已经在DOM中渲染
    });
    const firstResult = wrapper.queryByText("ab"); // 获取第一个匹配
    const secondResult = wrapper.queryByText("abc"); // 获取第二个匹配

    fireEvent.keyDown(inputNode, { keyCode: 40 }); // 键盘下操作
    expect(firstResult).toHaveClass("is-active"); // 第一个匹配是否高亮
    fireEvent.keyDown(inputNode, { keyCode: 40 }); // 键盘下操作
    expect(secondResult).toHaveClass("is-active"); // 第二个匹配是否高亮
    fireEvent.keyDown(inputNode, { keyCode: 38 }); // 键盘上操作
    expect(firstResult).toHaveClass("is-active"); // 第一个匹配是否高亮
    fireEvent.keyDown(inputNode, { keyCode: 13 }); // 键盘enter操作
    // 测试onSelect内的值是否正确
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: "ab", number: 11 });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument(); // 测试下拉选单匹配是否被删除
  });
  it("点击外部(失去焦点)，隐藏下拉选单", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } }); // 设置change事件，并触发
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument(); // ab已经在DOM中渲染
    });
    fireEvent.click(document); // 点击document
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument(); // 测试下拉选单匹配是否被删除
  });
});
