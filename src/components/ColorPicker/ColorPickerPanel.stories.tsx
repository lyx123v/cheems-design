import type { Meta, StoryObj } from "@storybook/react";
import ColorPickerPanel, { ColorPickerProps } from "./ColorPickerPanel";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/ColorPickerPanel",
  component: ColorPickerPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<ColorPickerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 颜色选择器(未完工......)
 */
export const Primary: Story = {
  args: {},
};
