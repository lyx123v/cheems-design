import React, { PropsWithChildren, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageProps } from "./index";
import Demo from "./Demo";
const RenderingControls = ({ children }: PropsWithChildren<any>) => {
  return children;
};
const DemoWithControls = (props: any) => {
  return (
    <RenderingControls>
      <Demo {...props} />
    </RenderingControls>
  );
};

/**
 * Message组件
 * ### 引用方法
 *
 * ~~~js
 * import { ConfigProvider, useMessage } from 'cheemsDesign'
 * ~~~
 */
const meta = {
  title: "cheemsDesign/Message",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      description: "位置",
      options: ["top", "bottom"],
      control: { type: "radio" },
    },
    duration: {
      description: "延迟时间(毫秒)",
      control: { type: "number" },
    },
    content: {
      description: "接收React.ReactNode",
      type: "string",
      control: { type: "text" },
    },
  },
} satisfies Meta<MessageProps>;

export default meta;
/**
 * 默认
 */
export const Primary: any = DemoWithControls.bind({});
