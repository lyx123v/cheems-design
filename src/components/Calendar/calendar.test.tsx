import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import Calendar, { CalendarProps } from "./index";
import { Dayjs } from "dayjs";
/**
 * render：渲染组件，返回 container 容器 dom 和其他的查询 api
 * fireEvent：触发某个元素的某个事件
 * createEvent：创建某个事件（一般不用这样创建）
 * waitFor：等待异步操作完成再断言，可以指定 timeout
 * act：包裹的代码会更接近浏览器里运行的方式
 * renderHook：执行 hook，可以通过 result.current 拿到 hook 返回值
 */
// const defaultProps: CalendarProps = {
//   onChange: jest.fn(),
// };
describe("测试calendar组件", () => {
  it("支持传入null与undefined", () => {
    expect(() => {
      render(<Calendar value={null as any} />);
    }).not.toThrow();

    expect(() => {
      render(<Calendar value={undefined as any} />);
    }).not.toThrow();
  });
});
