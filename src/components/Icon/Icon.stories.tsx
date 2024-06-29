import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Icon, { ThemeProps } from "./icon";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      description: "颜色",
      options: Object.values(ThemeProps),
      control: { type: "select" },
    },
    icon: {
      description: "icon, 查询具体icon：https://fontawesome.com.cn/v5",
      options: ["edit", "search", "add"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 默认
 */
export const Primary = {
  args: {
    theme: ThemeProps.primary,
    icon: "edit",
  },
};
