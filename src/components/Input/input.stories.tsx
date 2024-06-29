import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputSize } from "./input";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "输入框值",
      type: "string",
    },
    defaultValue: {
      description: "输入框默认值",
      type: "string",
    },
    onChange: {
      description: "绑定change事件",
      type: "function",
    },
    size: {
      description: "输入框大小",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    prepend: {
      description: "输入框前置，接收ReactElement",
      type: "string",
    },
    append: {
      description: "输入框后置，ReactElement",
      type: "string",
    },
    icon: {
      description: "icon, 查询具体icon：https://fontawesome.com.cn/v5",
      type: "string",
    },
    disabled: {
      description: "是否禁用",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认
 */
export const Primary: Story = {
  args: {
    disabled: false,
    size: InputSize.Large,
  },
};
