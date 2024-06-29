import { CSSProperties, useState } from "react";
import * as React from "react";

import cs from "classnames";
import { ColorType } from "./interface";
import { Color } from "./color";
import Palette from "./Palette";
import "./style.scss";

export interface ColorPickerProps {
  className?: string;
  style?: CSSProperties;
  /**
   * 颜色值
   */
  value?: ColorType;
  /**
   * 颜色值变化回调
   */
  onChange?: (color: Color) => void;
}

function ColorPickerPanel(props: ColorPickerProps) {
  const { className, style, value, onChange } = props;

  const [colorValue, setColorValue] = useState<Color>(() => {
    if (value instanceof Color) {
      return value;
    }
    return new Color(value);
  });

  const classNames = cs("color-picker", className);

  function onPaletteColorChange(color: Color) {
    setColorValue(color);
    onChange?.(color);
  }

  return (
    <div className={classNames} style={style}>
      <Palette color={colorValue} onChange={onPaletteColorChange}></Palette>
      <div style={{ width: 20, height: 20, background: colorValue.toRgbString() }}></div>
    </div>
  );
}

export default ColorPickerPanel;
