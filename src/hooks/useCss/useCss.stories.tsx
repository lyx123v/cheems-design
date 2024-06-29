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
  title: "cheemsHooks/useCss",
  component: Demo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<any>;

export default meta;

/**
 * useCss, 快捷使用css-in-js
 */
export const Primary: any = DemoWithControls.bind({});
