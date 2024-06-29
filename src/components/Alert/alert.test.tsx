import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Alert, { AlertProps, AlertType } from "./alert";

const testAlertProp: AlertProps = {
  title: "testAlert",
  closable: true,
  customClose: "关闭",
  type: AlertType.primary,
};

const testSuccessAlertProp: AlertProps = {
  closable: true,
  customClose: "关闭",
  type: AlertType.success,
};
describe("测试Alert组件", () => {
  it("测试默认Alert行为", async () => {
    const wrapper = render(<Alert {...testAlertProp}>Nice</Alert>); // 渲染Alert组件
    const element = wrapper.getByText("Nice"); // 获取Alert组件的文本节点

    expect(element).toBeInTheDocument(); // 断言Alert组件是否在文档中
    expect(element.tagName).toEqual("P"); // 断言Alert组件的标签名
    expect(element).toHaveClass("alert-message"); // 断言Alert组件的className
    expect(element.parentNode).toHaveClass("alert alert-primary"); // 断言Alert组件的父节点的className

    const titleElement = wrapper.getByText("testAlert"); // 获取Alert组件的标题节点
    expect(titleElement).toBeInTheDocument(); // 断言Alert组件的标题节点是否在文档中
    expect(titleElement).toHaveClass("alert-title"); // 断言Alert组件的标题节点的className
    expect(titleElement.parentNode).toBe(element.parentNode); // 断言Alert组件的标题节点的父节点

    const iconElement = wrapper.getByText("关闭"); // 获取Alert组件的关闭按钮节点
    expect(iconElement).toBeInTheDocument(); // 断言Alert组件的关闭按钮节点是否在文档中
    fireEvent.click(iconElement); // 触发Alert组件的关闭按钮节点的点击事件

    await waitFor(
      () => {
        expect(element).not.toBeInTheDocument(); // 断言Alert组件的标题节点已卸载
      },
      { interval: 500 }
    );
  });

  it("应该根据不同的type呈现正确的组件", async () => {
    const wrapper = render(<Alert {...testSuccessAlertProp}>Nice</Alert>); // 渲染Alert组件
    const element = wrapper.getByText("Nice"); // 获取Alert组件的文本节点

    expect(element).toBeInTheDocument(); // 断言Alert组件是否在文档中
    expect(element.tagName).toEqual("P"); // 断言Alert组件的标签名
    expect(element).toHaveClass("alert-message"); // 断言Alert组件的className
    expect(element.parentNode).toHaveClass("alert alert-success"); // 断言Alert组件的父节点的className

    const iconElement = wrapper.getByText("关闭"); // 获取Alert组件的关闭按钮节点
    expect(iconElement).toBeInTheDocument(); // 断言Alert组件的关闭按钮节点是否在文档中
    fireEvent.click(iconElement); // 触发Alert组件的关闭按钮节点的点击事件
    await waitFor(
      () => {
        expect(element).not.toBeInTheDocument(); // 断言Alert组件的标题节点已卸载
      },
      { interval: 500 }
    );
  });
});
