import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonSize, ButtonType, ButtonProps } from "./button";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      description: "绑定点击事件",
      type: "function",
    },
    children: {
      description: "接收React.ReactNode",
      type: "string",
      control: { type: "text" },
    },
    size: {
      description: "按钮大小",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    btnType: {
      description: "按钮类型",
      options: ["primary", "default", "danger", "link"],
      control: { type: "radio" },
    },
    disabled: {
      description: "是否禁用",
    },
    href: {
      description: "跳转路径",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "按钮",
    btnType: ButtonType.Primary,
    className: "className",
    disabled: false,
    size: ButtonSize.Large,
    href: "",
  },
};
