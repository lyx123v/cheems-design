import type { Meta, StoryObj } from "@storybook/react";
import Demo from "./Demo";
import { PropsWithChildren } from "react";

const RenderingControls = ({ children }: PropsWithChildren<any>) => {
  return children;
};
const DemoWithControls = (props: any) => (
  <RenderingControls>
    <Demo {...props} />
  </RenderingControls>
);

const meta = {
  title: "cheemsHooks/useScrolling",
  component: Demo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<any>;

export default meta;

/**
 * useScrolling, 滚动状态监听hooks
 */
export const Primary: any = DemoWithControls.bind({});
