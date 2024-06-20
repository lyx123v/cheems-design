import "@testing-library/jest-dom/extend-expect";
import React from "react";
import axios from "axios";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  createEvent,
} from "@testing-library/react";

import { Upload, UploadProps } from "./upload";

jest.mock("../Icon/icon", () => {
  return ({ icon, onClick }: any) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>; // 模拟axios

const testProps: UploadProps = {
  action: "fakeurl.com", // 模拟上传地址
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true, // 测试拖拽上传
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });
describe("测试上传组件", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>); // 渲染组件
    fileInput = wrapper.container.querySelector(".viking-file-input")!; // 获取上传组件
    uploadArea = wrapper.queryByText("Click to upload")!; // 获取上传区域
  });
  it("上传测试", async () => {
    const { queryByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: "cool" }); // 模拟post请求
    expect(uploadArea).toBeInTheDocument(); // 上传区域在文档中
    expect(fileInput).not.toBeVisible(); // 上传组件看不到
    fireEvent.change(fileInput, { target: { files: [testFile] } }); // 模拟change事件内容
    expect(queryByText("spinner")).toBeInTheDocument(); // 组件显示spinner
    await waitFor(() => {
      expect(queryByText("test.png")).toBeInTheDocument(); // 组件显示test.png
    });
    expect(queryByText("check-circle")).toBeInTheDocument(); // 组件显示check-circle (成功)
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile); // 测试上传组件是否调用onSuccess
    expect(testProps.onChange).toHaveBeenCalledWith(testFile); // 测试上传组件是否调用onChange

    // 去除上传文件
    expect(queryByText("times")).toBeInTheDocument(); // 组件显示times
    fireEvent.click(queryByText("times")!); // 模拟点击remove
    expect(queryByText("test.png")).not.toBeInTheDocument(); // 测试上传组件是否移除上传文件
    expect(testProps.onRemove).toHaveBeenCalledWith(
      // 测试上传组件是否调用onRemove
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });
  // 拖拽上传事件测试不完善
  // it("拖放文件功能测试", async () => {
  //   fireEvent.dragOver(uploadArea); // 模拟拖拽事件
  //   expect(uploadArea).toHaveClass("is-dragover"); // 测试上传区域是否添加is-dragover类名
  //   fireEvent.dragLeave(uploadArea); // 模拟离开事件
  //   expect(uploadArea).not.toHaveClass("is-dragover"); // 测试上传区域是否移除is-dragover类名
  //   // 模拟drop事件
  //   const mockDropEvent = createEvent.drop(uploadArea);
  //   Object.defineProperty(mockDropEvent, "dataTransfer", {
  //     value: {
  //       files: [testFile],
  //     },
  //   });
  //   fireEvent(uploadArea, mockDropEvent); // 模拟drop事件

  //   await waitFor(() => {
  //     expect(wrapper.queryByText("test.png")).toBeInTheDocument(); // 测试上传组件是否显示
  //   });
  //   expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile); // 测试上传组件是否调用onSuccess
  // });
});
