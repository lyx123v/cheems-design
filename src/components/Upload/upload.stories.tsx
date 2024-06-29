import type { Meta, StoryObj } from "@storybook/react";
import upload from "./upload";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/upload",
  component: upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof upload>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认
 */
export const Primary: Story = {
  args: {
    children: "上传",
    action: "",
  },
};
