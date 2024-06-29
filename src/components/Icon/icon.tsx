import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
// 使Icon支持字符串
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export enum ThemeProps {
  primary = "primary",
  secondary = "secondary",
  success = "success",
  info = "info",
  warning = "warning",
  danger = "danger",
  light = "light",
  dark = "dark",
}
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps; // 颜色
  className?: string; // 样式
}

/**
 * Icon组件
 * ### 引用方法
 *
 * ~~~js
 * import { Icon } from 'cheemsDesign'
 * ~~~
 */
const Icon: React.FC<IconProps> = props => {
  // icon-primary
  const { className, theme, ...restProps } = props;
  const classes = classNames("curry-icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
