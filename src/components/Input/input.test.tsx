import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Input, InputProps, InputSize } from "./input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};
describe("测试input组件", () => {
  it("输入是否正常", () => {
    const wrapper = render(<Input {...defaultProps} />); // 渲染组件
    // 获取组件
    const testNode = wrapper.getByPlaceholderText("test-input") as HTMLInputElement;
    expect(testNode).toBeInTheDocument(); // 已经渲染
    expect(testNode).toHaveClass("cheems-input-inner"); // Class类名包含cheems-input-inner
    fireEvent.change(testNode, { target: { value: "23" } }); // 设置change事件，并传入value
    expect(defaultProps.onChange).toHaveBeenCalled(); // 触发change事件
    expect(testNode.value).toEqual("23"); // 输入框内的值是23
  });
  it("禁用input", () => {
    const wrapper = render(<Input disabled placeholder="disabled" />); // 渲染组件
    // 获取组件
    const testNode = wrapper.getByPlaceholderText("disabled") as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy(); // 确认值是true的
    expect(defaultProps.onChange).not.toHaveBeenCalled(); // 无法触发change事件
  });
  it("测试不同size大小", () => {
    const wrapper = render(<Input placeholder="sizes" size={InputSize.Large} />); // 渲染组件
    // 获取组件
    const testContainer = wrapper.container.querySelector(".cheems-input-wrapper");
    expect(testContainer).toHaveClass("input-size-lg"); // 确认类名包含input-size-lg
  });
  it("显示prepend与append元素", () => {
    // 渲染组件
    const { queryByText, container } = render(
      <Input placeholder="pend" prepend="https://" append=".com" />
    );
    // 获取组件
    const testContainer = container.querySelector(".cheems-input-wrapper");
    // 确认类名包含input-group input-group-append input-group-prepend
    expect(testContainer).toHaveClass("input-group input-group-append input-group-prepend");
    // 确认组件内包含prepend与append元素
    expect(queryByText("https://")).toBeInTheDocument();
    expect(queryByText(".com")).toBeInTheDocument();
  });
});
