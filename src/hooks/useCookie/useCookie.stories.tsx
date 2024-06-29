import type { Meta, StoryObj } from "@storybook/react";
import Demo from "./Demo";

const meta = {
  title: "cheemsHooks/useCookie",
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
 * 操作cookie的方法
 */
export const Primary: Story = {
  args: {},
  render: args => {
    return <Demo />;
  },
};
