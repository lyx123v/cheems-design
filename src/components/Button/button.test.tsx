import React from "react";
// render作用是渲染dom，fireEvent作用是进行事件处理
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

/**
 * describe两个参数，第一个参数是一段描述，表示这个测试用例整体的含义。第二个参数是回调函数，在这个回调函数中进行测试用例编写
 *
 * it函数有两个参数，一个是对这个测试用例的描述，第二个是具体的测试代码
 *
 * expect函数是jest提供的断言函数，用来进行断言
 */

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "klass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};
describe("测试按钮组件", () => {
  it("展示正确的默认按钮", () => {
    const wrapper = render(<Button {...defaultProps}>按钮</Button>); // 渲染按钮组件
    const element = wrapper.getByText("按钮") as HTMLButtonElement; // 获取按钮元素
    expect(element).toBeInTheDocument(); // 断言按钮元素是否在文档中
    expect(element.tagName).toEqual("BUTTON"); // 断言按钮元素是button标签
    expect(element).toHaveClass("btn btn-default"); // 断言按钮元素有btn和btn-default两个class
    expect(element.disabled).toBeFalsy(); // 断言按钮元素没有disabled属性
    fireEvent.click(element); // 触发按钮元素的点击事件
    expect(defaultProps.onClick).toHaveBeenCalled(); // 断言onClick函数是否被调用
  });

  it("根据传入的props渲染对应的按钮", () => {
    const wrapper = render(<Button {...testProps}>按钮</Button>); // 渲染按钮组件
    const element = wrapper.getByText("按钮"); // 获取按钮元素
    expect(element).toBeInTheDocument(); // 断言按钮元素是否在文档中
    expect(element).toHaveClass("btn-primary btn-lg klass"); // 断言按钮元素有btn-primary和btn-lg和klass三个class
  });

  it("测试按钮类型是a标签", () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">
        Link
      </Button>
    ); // 渲染按钮组件
    const element = wrapper.getByText("Link"); // 获取按钮元素
    expect(element).toBeInTheDocument(); // 断言按钮元素是否在文档中
    expect(element.tagName).toEqual("A"); // 断言按钮元素是a标签
    expect(element).toHaveClass("btn btn-link"); // 断言按钮元素有btn和btn-link两个class
  });

  it("测试按钮的disabled属性", () => {
    const wrapper = render(<Button {...disabledProps}>按钮</Button>); // 渲染按钮组件
    const element = wrapper.getByText("按钮") as HTMLButtonElement; // 获取按钮元素
    expect(element).toBeInTheDocument(); // 断言按钮元素是否在文档中
    expect(element.disabled).toBeTruthy(); // 断言按钮元素有disabled属性
    fireEvent.click(element); // 触发按钮元素的点击事件
    expect(disabledProps.onClick).not.toHaveBeenCalled(); // 断言onClick函数没有被调用
  });
});
