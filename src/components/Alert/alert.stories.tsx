import type { Meta, StoryObj } from "@storybook/react";
import Alert, { AlertType } from "./alert";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["default", "success", "danger", "warning"],
      control: {
        type: "select",
      },
    },
    children: {
      type: "string",
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认
 */
export const Primary: Story = {
  args: {
    type: AlertType.danger,
  },
};
