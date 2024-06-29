import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Watermark from "./Watermark";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Watermark",
  component: Watermark,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Watermark>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 默认
 */
export const Primary: Story = {
  args: { content: ["测试水印", "cheems"], gap: [10, 10], fontStyle: { color: "green" } },
  render: args => {
    return (
      <Watermark {...args}>
        <div style={{ height: 500 }}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
        </div>
      </Watermark>
    );
  },
};
