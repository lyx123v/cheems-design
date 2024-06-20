import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 */
export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const cnames = classNames("viking-input-wrapper", {
    // 添加类名
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  const fixControlledValue = (value: any) => {
    // 兼容受控属性
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue; // 删除默认值
    restProps.value = fixControlledValue(props.value); // 兼容受控属性
  }
  return (
    <div className={cnames} style={style}>
      {
        // 前缀
      }
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {
        // 图标
      }
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        onChange={(e) => {
          disabled && props.onChange && props.onChange(e);
        }}
        {...restProps}
      />
      {
        // 后缀
      }
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
