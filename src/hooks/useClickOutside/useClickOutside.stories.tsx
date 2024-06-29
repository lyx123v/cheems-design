import type { Meta, StoryObj } from "@storybook/react";
import useClickOutside from "./index";
import { fn } from "@storybook/test";
import Demo from "./Demo";

const meta = {
  title: "cheemsHooks/useClickOutside",
  component: undefined,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof Demo>;
/**
 * 模拟失去焦点方法
 */
export const Primary: Story = {
  args: {},
  render: args => {
    return <Demo />;
  },
};
