import type { Meta, StoryObj } from "@storybook/react";
import Popover from "./index";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onOpenChange: fn() },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;
/**
 * 默认
 */
export const Primary: Story = {
  args: {},
  render: args => {
    return (
      <Popover
        content={<div>popover</div>}
        placement="bottom"
        trigger="click"
        style={{ margin: "200px" }}
        {...args}
      >
        hover
      </Popover>
    );
  },
};
