import React from "react";
import { fn } from "@storybook/test";
import Progress from "./progress";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProps } from "../Icon/icon";

const meta = {
  title: "cheemsDesign/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    theme: {
      description: "颜色",
      options: Object.values(ThemeProps),
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认
 */
export const Primary: Story = {
  args: {
    percent: 50,
    styles: {
      width: "100px",
    },
  },
};
