import React, { ReactElement, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Space, { ConfigProvider } from "./index";
import { fn } from "@storybook/test";
import "./stories.css";

const meta = {
  title: "cheemsDesign/Space",
  component: Space,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    split: {
      description: "间隔",
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
  // argTypes: {},
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof Space>;
const renderCalendar = (args: any) => {
  return (
    <div>
      <ConfigProvider>
        <Space {...args}>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider>
    </div>
  );
};
/**
 * 默认
 */
export const Primary: Story = {
  args: {
    size: 20,
  },
  render: renderCalendar,
};
