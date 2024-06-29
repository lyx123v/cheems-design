import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Lazyload from "./LazyLoad";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Lazyload",
  component: Lazyload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Lazyload>;

export default meta;
type Story = StoryObj<typeof Lazyload>;

/**
 * 默认
 */
export const Primary: Story = {
  args: {},
  render: args => {
    return (
      <div>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <p>xxxxxx</p>
        <Lazyload
          placeholder={<div>loading...</div>}
          onContentVisible={() => {
            console.log("comp visible");
          }}
        >
          <img src="https://www.baidu.com/img/flexible/logo/pc/result@2.png" />
        </Lazyload>
      </div>
    );
  },
};
