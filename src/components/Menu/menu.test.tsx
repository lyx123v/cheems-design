import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
jest.mock("../Icon/icon", () => {
  return () => {
    return <i className="fa" />;
  };
});
jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props: any) => {
      return props.children;
    },
  };
});
const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
  defaultOpenSubMenus: ["4"],
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile: string = `
    .curry-submenu {
      display: none;
    }
    .curry-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.innerHTML = cssFile;
  return style;
};
let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("默认测试", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps)); // 渲染组件
    wrapper.container.append(createStyleFile()); // 添加样式，方便测试后续是否可以显示隐藏
    // 获取元素
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("测试默认props", () => {
    expect(menuElement).toBeInTheDocument(); // 测试是否渲染
    expect(menuElement).toHaveClass("curry-menu menu-horizontal"); // 测试class
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5); // 测试是否添加了li，并且长度为5
    expect(activeElement).toHaveClass("menu-item is-active"); // 测试class
    expect(disabledElement).toHaveClass("menu-item is-disabled"); // 测试class
  });
  it("测试点击事件", () => {
    const thirdItem = wrapper.getByText("xyz"); // 获取元素
    fireEvent.click(thirdItem); // 触发点击事件
    expect(thirdItem).toHaveClass("is-active"); // 测试点击class
    expect(activeElement).not.toHaveClass("is-active"); // 测试没点击的class
    expect(testProps.onSelect).toHaveBeenCalledWith("2"); // 是否调用onSelect，并且内部值为2
    fireEvent.click(disabledElement); // 触发禁用的点击事件
    expect(disabledElement).not.toHaveClass("is-active"); // 测试禁用的class
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1"); // 是否调用onSelect，并且内部值不为1
  });
  it("鼠标悬浮到SubMenu测试", async () => {
    expect(wrapper.queryByText("drop1")).not.toBeVisible(); // 现在drop1不可见
    const dropdownElement = wrapper.getByText("dropdown"); // 获取元素
    fireEvent.mouseEnter(dropdownElement); // 鼠标移入
    await waitFor(() => {
      // 测试是否显示
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1")); // 触发点击事件
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0"); // 是否调用onSelect，并且内部值为3-0
    fireEvent.mouseLeave(dropdownElement); // 触发鼠标离开事件
    // 测试是否没有显示
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).not.toBeVisible();
    });
  });
});
describe("vertical模式测试", () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps)); // 渲染组件
    wrapper2.container.append(createStyleFile()); // 添加样式，方便测试后续是否可以显示隐藏
  });
  it("观察元素是否已渲染", () => {
    const menuElement = wrapper2.getByTestId("test-menu"); // 获取元素
    expect(menuElement).toHaveClass("menu-vertical"); // 测试class
  });
  it("点击事件触发是否可见", () => {
    const dropDownItem = wrapper2.queryByText("drop1"); // 获取元素
    expect(dropDownItem).not.toBeVisible(); // 不可见
    fireEvent.click(wrapper2.getByText("dropdown")); // 触发点击事件
    expect(dropDownItem).toBeVisible(); // 可见
  });
  it("defaultOpenSubMenus包含当前位置时是否可见", () => {
    expect(wrapper2.queryByText("opened1")).toBeVisible(); // 可见
  });
});
