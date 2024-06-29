import dayjs, { Dayjs } from "dayjs";
import MonthCalendar from "./MonthCalendar";
import "./style.scss";
import Header from "./Header";
import * as React from "react";

import react, { CSSProperties, ReactNode, useState } from "react";
import cs from "classnames";
import LocaleContext from "./LocaleContext";

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

/**
 * 日期组件
 * ### 引用方法
 *
 * ~~~js
 * import { Calendar } from 'cheemsDesign'
 * ~~~
 */
function Calendar(props: CalendarProps) {
  const { value, style, className, locale, onChange } = props;

  const [curValue, setCurValue] = useState<Dayjs>(value || dayjs(Date.now()));

  const [curMonth, setCurMonth] = useState<Dayjs>(value || dayjs(Date.now()));

  const classNames = cs("calendar", className);

  function selectHandler(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, "month"));
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, "month"));
  }

  function todayHandler() {
    const date = dayjs(Date.now());

    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        ></Header>
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
