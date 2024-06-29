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
  title: "cheemsHooks/useCreation",
  component: Demo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<any>;

export default meta;

/**
 * useCreation 是 useMemo 或 useRef 的替代品。因为 useMemo 不能保证被 memo 的值一定不会被重计算，而 useCreation 可以保证这一点。
 */
export const Primary: any = DemoWithControls.bind({});
