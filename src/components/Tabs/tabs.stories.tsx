import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./index";
import TabsItem, { TabsItemProps } from "./tabsItem";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onSelect: {
      description: "绑定select事件",
      type: "function",
    },
    children: {
      description: "接收React.ReactNode",
      type: "string",
      control: { type: "text" },
    },
  },
  args: { onSelect: fn() },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 默认
 */
export const Primary: Story = {
  args: {
    defaultIndex: 0,
  },
  render(args, meta) {
    console.log(args, meta);

    return (
      <Tabs {...args}>
        <TabsItem label="card1">1111111111</TabsItem>
        <TabsItem label="card2">222222222</TabsItem>
        <TabsItem label="disabled">33333333333</TabsItem>
      </Tabs>
    );
  },
};
