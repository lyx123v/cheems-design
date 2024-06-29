import React from "react";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import Tabs, { TabProps } from "./tabs";
import TabsItem, { TabsItemProps } from "./tabsItem";

const testProps: TabProps = {
  defaultIndex: 0,
  styleType: "underline",
  onSelect: jest.fn(),
};

const generateTabs = (props: TabProps) => {
  return (
    <Tabs {...props}>
      <TabsItem label="card1">this is card one</TabsItem>
      <TabsItem label="card2">this is content two</TabsItem>
      <TabsItem label="disabled" disabled={true}>
        this is content three
      </TabsItem>
    </Tabs>
  );
};

const createStyleFile = () => {
  const css = `
  .tabs-content {
    display: none;
  }
  .tabs-content.tabs-content-active{
    display: block;
  }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  return style;
};

let wrapper: RenderResult, activeLabel: HTMLElement, activeContent: HTMLElement;

describe("测试Tabs和TabsItem组件", () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps)); // 渲染组件
    wrapper.container.appendChild(createStyleFile()); // 添加样式
    activeLabel = wrapper.getByText("card1"); // 获取第一个标签
    activeContent = wrapper.getByText("this is card one"); // 获取第一个内容
  });

  it("默认传入测试", () => {
    expect(activeLabel).toHaveClass("tabs-label tabs-label-active"); // 测试第一个标签是否被选中
    expect(activeContent).toBeVisible(); // 测试第一个内容是否被显示
    const label2 = wrapper.getByText("card2"); // 获取第二个标签
    fireEvent.click(label2); // 点击第二个标签
    const content2 = wrapper.getByText("this is content two"); // 获取第二个内容
    expect(activeContent).not.toBeVisible(); // 测试第一个内容是否被隐藏
    expect(content2).toBeVisible(); // 测试第二个内容是否被显示
    const label3 = wrapper.getByText("disabled"); // 获取第三个标签
    fireEvent.click(label3); // 点击第三个标签
    const content3 = wrapper.getByText("this is content three"); // 获取第三个内容
    expect(content3).not.toBeVisible(); // 测试第三个内容是否被隐藏
  });
});
