import React from "react";
import { fn } from "@storybook/test";
import Portal from "./index";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProps } from "../Icon/icon";

const meta = {
  title: "cheemsDesign/Portal",
  component: Portal,
  parameters: {},
  argTypes: {
    attach: {
      description: "挂载位置",
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof Portal>;

const renderCalendar = (args: any) => {
  return (
    <Portal {...args}>
      <div className="btn">
        <button>按钮</button>
      </div>
    </Portal>
  );
};
/**
 * 默认
 */
export const Primary: Story = {
  args: {
    attach: document.body,
  },
  render: renderCalendar,
};
