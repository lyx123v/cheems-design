import type { Meta, StoryObj } from "@storybook/react";
import Calendar, { CalendarProps } from "./index";
import dayjs from "dayjs";
import { fn } from "@storybook/test";

const meta = {
  title: "cheemsDesign/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "date",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderCalendar = (args: CalendarProps) => {
  if (typeof args.value === "number") {
    return <Calendar {...args} value={dayjs(new Date(args.value))} />;
  }

  return <Calendar {...args} />;
};

export const Value: Story = {
  args: {
    value: dayjs("2023-11-08"),
  },
  render: renderCalendar,
};

export const DateRender: Story = {
  args: {
    value: dayjs("2023-11-08"),
    dateRender(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
  render: renderCalendar,
};

export const DateInnerContent: Story = {
  args: {
    value: dayjs("2023-11-08"),
    dateInnerContent(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
  render: renderCalendar,
};

export const Locale: Story = {
  args: {
    value: dayjs("2023-11-08"),
    locale: "en-US",
  },
  render: renderCalendar,
};
